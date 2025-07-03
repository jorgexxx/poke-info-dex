export type Pokemon = {
  id: number;
  name: string;
  generation: string;
  types: string[];
};

export type PokemonDetails = {
  id: number;
  name: string;
  sprite: string;
  generation: string;
  types: string[];
  stats: { name: string; value: number }[];
  evolutions: { id: number; name: string; sprite: string }[];
};