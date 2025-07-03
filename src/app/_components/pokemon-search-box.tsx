"use client";
import type { ChangeEvent } from "react";

type Props = {
  value: string;
  onChange: (v: string) => void;
};

export function PokemonSearchBox({ value, onChange }: Props) {
  return (
    <div className="flex-1">
      <label htmlFor="searchBox" className="block text-sm font-medium text-gray-700 mb-1">
        Search by name or evolution
      </label>
      <input
        id="searchBox"
        type="text"
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
        placeholder="e.g. Pikachu"
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        autoComplete="off"
      />
    </div>
  );
}