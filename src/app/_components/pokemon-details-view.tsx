"use client";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import type { PokemonDetails } from "./pokemon-types";

type Props = { details: PokemonDetails };

export function PokemonDetailsView({ details }: Props) {
  const searchParams = useSearchParams();
  const returnUrl = searchParams.get('returnUrl') ?? '/';
  return (
    <div className="p-6 flex flex-col gap-6">
      <div className="flex items-center gap-6">
        <Image 
          src={details.sprite} 
          alt={details.name} 
          width={128} 
          height={128} 
          className="w-32 h-32 bg-gray-100 rounded-xl shadow" 
        />
        <div>
          <h2 className="text-3xl font-bold capitalize">{details.name}</h2>
          <div className="text-gray-600 capitalize">
            Generation: {details.generation.replace("generation-", "")}
          </div>
          <div className="flex gap-2 mt-2">
            {details.types.map(t => (
              <span 
                key={t} 
                className="bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-xs font-semibold"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-bold text-lg mb-2">Stats</h3>
        <div className="flex flex-col gap-1">
          {details.stats.map(stat => (
            <div key={stat.name} className="flex items-center gap-2">
              <span className="capitalize w-24 text-sm">{stat.name}</span>
              <div className="flex-1 bg-gray-200 rounded h-3">
                <div 
                  className="bg-blue-500 h-3 rounded" 
                  style={{ width: `${Math.min((stat.value / 200) * 100, 100)}%` }} 
                />
              </div>
              <span className="font-mono text-sm w-8">{stat.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-bold text-lg mb-2">Evolutions</h3>
        <div className="flex gap-4 flex-wrap">
          {details.evolutions.map(evo => (
            <Link
              key={evo.id}
              href={`/pokemon/${evo.name}?returnUrl=${encodeURIComponent(returnUrl)}`}
              className={`flex flex-col items-center gap-1 px-2 py-1 rounded-lg border transition ${
                evo.name === details.name
                  ? "border-blue-500 bg-blue-50"
                  : "border-transparent hover:border-blue-300"
              }`}
            >
              <Image 
                src={evo.sprite} 
                alt={evo.name} 
                width={64} 
                height={64} 
                className="w-16 h-16" 
              />
              <span className={`capitalize text-sm font-semibold ${
                evo.name === details.name ? "text-blue-700" : ""
              }`}>
                {evo.name}
              </span>
            </Link>
          ))}
        </div>
      </div>

      <Link href={returnUrl} className="mt-4 text-blue-600 hover:underline text-sm">
        ← Back to list
      </Link>
    </div>
  );
}