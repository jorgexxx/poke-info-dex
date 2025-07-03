import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import type { Pokemon, PokemonDetails } from "~/app/_components/pokemon-types";

type PokeApiListResponse = {
  results: { name: string; url: string }[];
};

type PokeApiType = { type: { name: string } };
type PokeApiStat = {
  base_stat: number;
  stat: { name: string };
};
type PokeApiPokemon = {
  id: number;
  name: string;
  species: { url: string };
  types: PokeApiType[];
  sprites: { front_default: string | null };
  stats: PokeApiStat[];
};
type PokeApiSpecies = {
  generation?: { name: string };
  evolution_chain: { url: string };
};

type EvolutionChain = {
  chain: EvolutionNode;
};

type EvolutionNode = {
  species: { name: string };
  evolves_to: EvolutionNode[];
};

let cachedPokemonList: Pokemon[] | null = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

async function fetchPokemonList(): Promise<Pokemon[]> {
  const now = Date.now();
  
  if (cachedPokemonList && (now - cacheTimestamp) < CACHE_DURATION) {
    return cachedPokemonList;
  }

  const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=500");
  const data = (await res.json()) as PokeApiListResponse;
  const results = data.results;

  const detailed = await Promise.all(
    results.map(async (p) => {
      const pokeRes = await fetch(p.url, { cache: "force-cache" });
      if (!pokeRes.ok) throw new Error("Failed to fetch Pokémon data");
      const pokeData = await pokeRes.json() as PokeApiPokemon;
      if (!pokeData.species?.url) throw new Error("Missing species URL");
      let speciesRes = await fetch(pokeData.species.url, { cache: "force-cache" });
      if (!speciesRes.ok) {
        await new Promise((r) => setTimeout(r, 300));
        speciesRes = await fetch(pokeData.species.url, { cache: "force-cache" });
      }
      if (!speciesRes.ok) throw new Error("Failed to fetch species data");
      const speciesData = await speciesRes.json() as PokeApiSpecies;
      const gen = speciesData.generation?.name ?? "unknown";
      const types = pokeData.types.map((t) => t.type.name);
      return {
        id: pokeData.id,
        name: pokeData.name,
        generation: gen,
        types,
      } as Pokemon;
    })
  );
  
  const sortedList = detailed.sort((a, b) => a.id - b.id);
  cachedPokemonList = sortedList;
  cacheTimestamp = Date.now();
  
  return sortedList;
}

export const pokemonRouter = createTRPCRouter({
  list: publicProcedure.query(async () => {
    return await fetchPokemonList();
  }),
  
  details: publicProcedure
    .input(z.object({ name: z.string() }))
    .query(async ({ input }) => {
      return await fetchPokemonDetails(input.name);
    }),
});

async function fetchPokemonDetails(name: string): Promise<PokemonDetails | null> {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
    if (!res.ok) return null;
    
    const pokemon = await res.json() as PokeApiPokemon;
    const speciesRes = await fetch(pokemon.species.url);
    const species = await speciesRes.json() as PokeApiSpecies;
    
    const evolutionChainRes = await fetch(species.evolution_chain.url);
    const evolutionChain = await evolutionChainRes.json() as EvolutionChain;
    
    const evolutions = await getEvolutionChain(evolutionChain.chain);
    
    return {
      id: pokemon.id,
      name: pokemon.name,
      sprite: pokemon.sprites.front_default ?? "",
      generation: species.generation?.name ?? "unknown",
      types: pokemon.types.map(t => t.type.name),
      stats: pokemon.stats.map(s => ({
        name: s.stat.name,
        value: s.base_stat
      })),
      evolutions
    };
  } catch {
    return null;
  }
}

async function getEvolutionChain(chain: EvolutionNode): Promise<{ id: number; name: string; sprite: string }[]> {
  const evolutions: { id: number; name: string; sprite: string }[] = [];
  
  const addEvolution = async (evo: EvolutionNode) => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${evo.species.name}`);
    const pokemon = await res.json() as PokeApiPokemon;
    evolutions.push({
      id: pokemon.id,
      name: pokemon.name,
      sprite: pokemon.sprites.front_default ?? ""
    });
    
    for (const nextEvo of evo.evolves_to) {
      await addEvolution(nextEvo);
    }
  };
  
  await addEvolution(chain);
  return evolutions;
}