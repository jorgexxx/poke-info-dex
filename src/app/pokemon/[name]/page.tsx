import { notFound } from "next/navigation";
import { api, HydrateClient } from "~/trpc/server";
import { PokemonDetailsView } from "~/app/_components/pokemon-details-view";

type Props = { params: Promise<{ name: string }> };

export default async function PokemonPage(props: Props) {
  const params = await props.params;
  const { name } = params;
  const details = await api.pokemon.details({ name });
  if (!details) notFound();

  return (
    <HydrateClient>
      <main className="min-h-screen bg-gradient-to-b from-[#f6f8fc] to-[#e0e7ef] text-gray-900 flex flex-col items-center py-10">
        <div className="w-full max-w-xl bg-white rounded-xl p-0 shadow-lg flex flex-col">
          <PokemonDetailsView details={details} />
        </div>
      </main>
    </HydrateClient>
  );
}