import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

type PokemonListItem = {
  id: number;
  name: string;
  generation: string;
  types: string[];
};

type PokeApiListResponse = {
  results: { name: string; url: string }[];
};

type PokeApiType = { type: { name: string } };
type PokeApiPokemon = {
  id: number;
  name: string;
  species: { url: string };
  types: PokeApiType[];
};
type PokeApiSpecies = {
  generation?: { name: string };
};

async function fetchPokemonList(): Promise<PokemonListItem[]> {
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
      };
    })
  );
  return detailed.sort((a, b) => a.id - b.id);
}

export const pokemonRouter = createTRPCRouter({
  list: publicProcedure.query(async () => {
    return await fetchPokemonList();
  }),
});