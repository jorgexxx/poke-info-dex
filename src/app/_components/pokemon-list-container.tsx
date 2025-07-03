"use client";
import { api } from "~/trpc/react";
import { PokemonList } from "./pokemon-list";

export function PokemonListContainer() {
  const { data: pokemons, isLoading, error } = api.pokemon.list.useQuery(
    undefined,
    {
      staleTime: 30 * 60 * 1000, // 30 minutes
      gcTime: 60 * 60 * 1000, // 1 hour
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    }
  );

  if (isLoading) {
    return <div className="p-4 text-center">Loading Pokémon...</div>;
  }

  if (error) {
    return <div className="p-4 text-center text-red-600">Error loading Pokémon</div>;
  }

  if (!pokemons) {
    return <div className="p-4 text-center">No Pokémon found</div>;
  }

  return <PokemonList pokemons={pokemons} />;
}