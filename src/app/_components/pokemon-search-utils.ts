import type { Pokemon } from "./pokemon-types";

// Dummy evolution data for demo. Replace with real evolution info if available.
const EVOLUTION_CHAINS: Record<string, string[]> = {
  pikachu: ["pichu", "pikachu", "raichu"],
  bulbasaur: ["bulbasaur", "ivysaur", "venusaur"],
  charmander: ["charmander", "charmeleon", "charizard"],
  squirtle: ["squirtle", "wartortle", "blastoise"],
  eevee: ["eevee", "vaporeon", "jolteon", "flareon", "espeon", "umbreon", "leafeon", "glaceon", "sylveon"],
  // Add more as needed
};

function getChainForName(name: string): string[] | undefined {
  const lower = name.toLowerCase();
  for (const chain of Object.values(EVOLUTION_CHAINS)) {
    if (chain.includes(lower)) return chain;
  }
  return undefined;
}

/**
 * Returns all pokemons matching the search string by name or by being in the same evolution chain as a match.
 * @param allPokemons All available pokemons.
 * @param search Search string.
 * @param filtered Optional: restrict results to this filtered list.
 */
export function getPokemonsByNameOrEvolution(
  allPokemons: Pokemon[],
  search: string,
  filtered?: Pokemon[]
): Pokemon[] {
  const s = search.trim().toLowerCase();
  if (!s) return filtered ?? allPokemons;
  // Find direct matches
  const direct = allPokemons.filter(p =>
    p.name.toLowerCase().includes(s)
  );
  // Find evolutions if any direct match belongs to a known chain
  const evolutionNames = new Set<string>();
  for (const p of direct) {
    const chain = getChainForName(p.name);
    if (chain) chain.forEach(n => evolutionNames.add(n));
  }
  let result = allPokemons.filter(p => evolutionNames.has(p.name.toLowerCase()));
  if (result.length === 0) {
    result = allPokemons.filter(p => p.name.toLowerCase().includes(s));
  }
  if (filtered) {
    const filteredIds = new Set(filtered.map(f => f.id));
    result = result.filter(p => filteredIds.has(p.id));
  }
  return result;
}

export function filterPokemonsByTypeAndGeneration(
  pokemons: Pokemon[],
  type: string,
  generation: string
): Pokemon[] {
  return pokemons.filter(pokemon => {
    const matchesType = !type || pokemon.types.includes(type);
    const matchesGeneration = !generation || pokemon.generation === generation;
    return matchesType && matchesGeneration;
  });
}