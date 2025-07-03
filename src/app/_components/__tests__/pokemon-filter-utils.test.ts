import { filterPokemonsByTypeAndGeneration, getPokemonsByNameOrEvolution } from "../pokemon-search-utils";
import type { Pokemon } from "../pokemon-types";

const pokemons: Pokemon[] = [
  { id: 1, name: "pichu", types: ["electric"], generation: "2" },
  { id: 2, name: "pikachu", types: ["electric"], generation: "1" },
  { id: 3, name: "raichu", types: ["electric"], generation: "1" },
  { id: 4, name: "bulbasaur", types: ["grass", "poison"], generation: "1" },
  { id: 5, name: "ivysaur", types: ["grass", "poison"], generation: "1" },
  { id: 6, name: "venusaur", types: ["grass", "poison"], generation: "1" },
  { id: 7, name: "eevee", types: ["normal"], generation: "1" },
  { id: 8, name: "vaporeon", types: ["water"], generation: "1" },
  { id: 9, name: "jolteon", types: ["electric"], generation: "1" },
];

const pokemonsforGeneration: Pokemon[] = [
  { id: 1, name: "bulbasaur", types: ["grass", "poison"], generation: "generation-i" },
  { id: 4, name: "charmander", types: ["fire"], generation: "generation-i" },
  { id: 152, name: "chikorita", types: ["grass"], generation: "generation-ii" },
];

describe("filterPokemonsByTypeAndGeneration", () => {
  it("filters by type", () => {
    const result = filterPokemonsByTypeAndGeneration(pokemonsforGeneration, "grass", "");
    expect(result.map(p => p.name)).toEqual(["bulbasaur", "chikorita"]);
  });

  it("filters by generation", () => {
    const result = filterPokemonsByTypeAndGeneration(pokemonsforGeneration, "", "generation-i");
    expect(result.map(p => p.name)).toEqual(["bulbasaur", "charmander"]);
  });

  it("filters by both type and generation", () => {
    const result = filterPokemonsByTypeAndGeneration(pokemonsforGeneration, "grass", "generation-i");
    expect(result.map(p => p.name)).toEqual(["bulbasaur"]);
  });

  it("returns all if no filter", () => {
    const result = filterPokemonsByTypeAndGeneration(pokemonsforGeneration, "", "");
    expect(result.length).toBe(3);
  });
});

describe("getPokemonsByNameOrEvolution", () => {
  it("returns all pokemons in the evolution chain if search matches a chain member", () => {
    const result = getPokemonsByNameOrEvolution(pokemons, "pikachu");
    const names = result.map(p => p.name).sort();
    expect(names).toEqual(["pichu", "pikachu", "raichu"].sort());
  });

  it("returns all pokemons in the evolution chain if search matches another chain member", () => {
    const result = getPokemonsByNameOrEvolution(pokemons, "raichu");
    const names = result.map(p => p.name).sort();
    expect(names).toEqual(["pichu", "pikachu", "raichu"].sort());
  });

  it("returns all pokemons in the evolution chain for bulbasaur", () => {
    const result = getPokemonsByNameOrEvolution(pokemons, "bulbasaur");
    const names = result.map(p => p.name).sort();
    expect(names).toEqual(["bulbasaur", "ivysaur", "venusaur"].sort());
  });

  it("returns only matching pokemon if not in any evolution chain", () => {
    const result = getPokemonsByNameOrEvolution(pokemons, "eevee");
    const names = result.map(p => p.name).sort();
    expect(names).toEqual(["eevee", "vaporeon", "jolteon"].sort());
  });

  it("returns empty array if no match", () => {
    const result = getPokemonsByNameOrEvolution(pokemons, "notapokemon");
    expect(result).toEqual([]);
  });

  it("returns filtered results if filtered is provided", () => {
    const filtered = pokemons.filter(p => p.generation === "1");
    const result = getPokemonsByNameOrEvolution(pokemons, "pikachu", filtered);
    const names = result.map(p => p.name).sort();
    expect(names).toEqual(["pikachu", "raichu"].sort());
  });

  it("returns all pokemons if search is empty", () => {
    const result = getPokemonsByNameOrEvolution(pokemons, "");
    expect(result.length).toBe(pokemons.length);
  });
});