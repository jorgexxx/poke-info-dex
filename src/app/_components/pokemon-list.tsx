"use client";
import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { PokemonSearchBox } from "./pokemon-search-box";
import { filterPokemonsByTypeAndGeneration, getPokemonsByNameOrEvolution } from "./pokemon-search-utils";

import type { Pokemon } from "./pokemon-types";

type Props = {
  pokemons: Pokemon[];
};

export function PokemonList({ pokemons }: Props) {
  const searchParams = useSearchParams();

  const [selectedType, setSelectedType] = useState<string>("");
  const [selectedGeneration, setSelectedGeneration] = useState<string>("");
  const [search, setSearch] = useState<string>("");

  // Initialize state from URL params
  useEffect(() => {
    setSelectedType(searchParams.get('type') ?? '');
    setSelectedGeneration(searchParams.get('generation') ?? '');
    setSearch(searchParams.get('search') ?? '');
  }, [searchParams]);

  // Update URL when filters change (debounced)
  const updateURL = (newType: string, newGeneration: string, newSearch: string) => {
    const params = new URLSearchParams();
    if (newType) params.set('type', newType);
    if (newGeneration) params.set('generation', newGeneration);
    if (newSearch) params.set('search', newSearch);

    const queryString = params.toString();
    const newURL = queryString ? `/?${queryString}` : '/';

    // Use pushState directly to avoid re-renders
    window.history.replaceState(null, '', newURL);
  };

  const handleTypeChange = (newType: string) => {
    setSelectedType(newType);
    updateURL(newType, selectedGeneration, search);
  };

  const handleGenerationChange = (newGeneration: string) => {
    setSelectedGeneration(newGeneration);
    updateURL(selectedType, newGeneration, search);
  };

  const handleSearchChange = (newSearch: string) => {
    setSearch(newSearch);
    updateURL(selectedType, selectedGeneration, newSearch);
  };

  // Extract unique types and generations for filter options
  const availableTypes = useMemo(() => {
    const types = new Set<string>();
    pokemons.forEach(pokemon =>
      pokemon.types.forEach(type => types.add(type))
    );
    return Array.from(types).sort();
  }, [pokemons]);

  const availableGenerations = useMemo(() => {
    const generations = new Set<string>();
    pokemons.forEach(pokemon => generations.add(pokemon.generation));
    return Array.from(generations).sort();
  }, [pokemons]);

  // Filter pokemons based on selected filters and search
  const filteredPokemons = useMemo<Pokemon[]>(() => {
    const filtered = filterPokemonsByTypeAndGeneration(
      pokemons,
      selectedType,
      selectedGeneration
    );
    if (search.trim() === "") return filtered;

    return getPokemonsByNameOrEvolution(pokemons, search.trim(), filtered);
  }, [pokemons, selectedType, selectedGeneration, search]);

  return (
    <div className="h-full flex flex-col">
      {/* Filter Section */}
      <div className="mb-4 p-4 bg-white rounded-lg shadow">
        <div className="flex gap-4 items-center">
          <PokemonSearchBox value={search} onChange={handleSearchChange} />
          <div className="flex-1">
            <label htmlFor="typeFilter" className="block text-sm font-medium text-gray-700 mb-1">
              Type
            </label>
            <select
              id="typeFilter"
              value={selectedType}
              onChange={(e) => handleTypeChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All types</option>
              {availableTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <label htmlFor="genFilter" className="block text-sm font-medium text-gray-700 mb-1">
              Generation
            </label>
            <select
              id="genFilter"
              value={selectedGeneration}
              onChange={(e) => handleGenerationChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All generations</option>
              {availableGenerations.map(gen => (
                <option key={gen} value={gen}>{gen}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Pokemon Table */}
      <div className="pokemon-scroll-area overflow-x-auto">
        <table className="min-w-full border-separate rounded-xl shadow bg-white">
          <thead className="sticky top-0 z-10 bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-gray-700 rounded-tl-xl text-lg font-semibold border-b bg-gray-100">ID</th>
              <th className="px-4 py-3 text-gray-700 text-lg font-semibold border-b bg-gray-100">Name</th>
              <th className="px-4 py-3 text-gray-700 text-lg font-semibold border-b bg-gray-100">Generation</th>
              <th className="px-4 py-3 text-gray-700 rounded-tr-xl text-lg font-semibold border-b bg-gray-100">Types</th>
            </tr>
          </thead>
          <tbody>
            {filteredPokemons.map((p, i) => (
              <tr
                key={p.id}
                className={`transition hover:bg-blue-50 cursor-pointer ${i % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                onClick={() => {
                  const currentParams = new URLSearchParams();
                  if (selectedType) currentParams.set('type', selectedType);
                  if (selectedGeneration) currentParams.set('generation', selectedGeneration);
                  if (search) currentParams.set('search', search);

                  const returnUrl = currentParams.toString() ? `/?${currentParams.toString()}` : '/';
                  window.location.href = `/pokemon/${p.name}?returnUrl=${encodeURIComponent(returnUrl)}`;
                }}
              >
                <td className="px-4 py-3 font-mono font-bold text-indigo-700">{p.id}</td>
                <td className="px-4 py-3 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 flex items-center justify-center text-white font-bold text-lg shadow">
                    {p.name[0] ? p.name[0].toUpperCase() : ''}
                  </div>
                  <span className="capitalize font-semibold text-gray-800 text-base">{p.name}</span>
                </td>
                <td className="px-4 py-3 capitalize text-gray-700 font-medium">{p.generation.replace("generation-", "")}</td>
                <td className="px-4 py-3">
                  {p.types.map((t) => (
                    <span
                      key={t}
                      className={`type-${t} rounded-full px-3 py-1 mr-2 text-xs font-semibold shadow type-badge`}
                    >
                      {t}
                    </span>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}