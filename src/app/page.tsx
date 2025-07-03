import { api, HydrateClient } from "~/trpc/server";
import { PokemonList } from "./_components/pokemon-list";

export default async function Home() {
  const pokemons = await api.pokemon.list();

  return (
    <HydrateClient>
      <main className="min-h-screen bg-gradient-to-b from-[#f6f8fc] to-[#e0e7ef] text-gray-900 flex flex-col items-center py-10">
        <div className="w-full max-w-3xl bg-white rounded-xl p-0 shadow-lg flex flex-col" style={{height: "90vh"}}>
          <header className="sticky top-0 z-10 bg-white rounded-t-xl p-6 pb-2 shadow-sm">
            <h1 className="text-4xl font-bold">Pokémon List</h1>
          </header>
          <div className="flex-1 min-h-0">
            <PokemonList pokemons={pokemons} />
          </div>
        </div>
      </main>
    </HydrateClient>
  );
}
