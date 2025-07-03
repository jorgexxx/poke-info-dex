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

export function getEvolutionMatches(
  filtered: Pokemon[],
  allPokemons: Pokemon[],
  search: string
): Pokemon[] {
  const s = search.trim().toLowerCase();
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
  // If any evolution matches, show all in chain
  if (evolutionNames.size > 0) {
    return allPokemons.filter(p => evolutionNames.has(p.name.toLowerCase()))
      .filter(p => filtered.some(f => f.id === p.id));
  }
  // Otherwise, fallback to normal search
  return filtered.filter(p => p.name.toLowerCase().includes(s));
}