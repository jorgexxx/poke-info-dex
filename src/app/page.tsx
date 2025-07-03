import { Suspense } from "react";
import { HydrateClient } from "~/trpc/server";
import { PokemonListContainer } from "./_components/pokemon-list-container";

export default function Home() {
  return (
    <HydrateClient>
      <main className="min-h-screen bg-gradient-to-b from-[#f6f8fc] to-[#e0e7ef] text-gray-900 flex flex-col items-center py-10">
        <div className="w-full max-w-3xl bg-white rounded-xl p-0 shadow-lg flex flex-col" style={{height: "90vh"}}>
          <header className="sticky top-0 z-10 bg-white rounded-t-xl p-6 pb-2 shadow-sm">
            <h1 className="text-4xl font-bold">Pokémon List</h1>
          </header>
          <div className="flex-1 min-h-0">
            <Suspense fallback={<div className="p-4">Loading...</div>}>
              <PokemonListContainer />
            </Suspense>
          </div>
        </div>
      </main>
    </HydrateClient>
  );
}
