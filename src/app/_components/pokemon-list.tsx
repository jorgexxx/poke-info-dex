"use client";
"use client";

import { useState, useMemo } from "react";

type Pokemon = {
  id: number;
  name: string;
  generation: string;
  types: string[];
};

type Props = {
  pokemons: Pokemon[];
};

export function PokemonList({ pokemons }: Props) {
  const [selectedType, setSelectedType] = useState<string>("");
  const [selectedGeneration, setSelectedGeneration] = useState<string>("");

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

  // Filter pokemons based on selected filters
  const filteredPokemons = useMemo(() => {
    return pokemons.filter(pokemon => {
      const matchesType = !selectedType || pokemon.types.includes(selectedType);
      const matchesGeneration = !selectedGeneration || pokemon.generation === selectedGeneration;
      return matchesType && matchesGeneration;
    });
  }, [pokemons, selectedType, selectedGeneration]);
  return (
    <div className="h-full flex flex-col">
      {/* Filter Section */}
      <div className="mb-4 p-4 bg-white rounded-lg shadow">
        <div className="flex gap-4 items-center">
          <div className="flex-1">
            <label htmlFor="typeFilter" className="block text-sm font-medium text-gray-700 mb-1">
              Type
            </label>
            <select
              id="typeFilter"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
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
              onChange={(e) => setSelectedGeneration(e.target.value)}
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
              className={`transition hover:bg-blue-50 ${i % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
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