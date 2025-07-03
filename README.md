# poke-info-dex

A real-time web app to explore Pokémon info from the [PokéAPI](https://pokeapi.co/): search, filter by type/generation, view stats and evolutions.

## Features

- List all Pokémon (name, generation, types)
- Filter by type and generation
- Real-time search (includes evolutions)
- Pokémon detail page (image, stats, evolutions, etc.)
- State preserved on navigation

## Requirements

- Node.js 18+
- npm (or pnpm/yarn)

## Setup

```bash
git clone https://github.com/your-username/poke-info-dex.git
cd poke-info-dex
npm install
```

## Run Locally

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Notes

- Uses Next.js, TypeScript, tRPC, React Query
- No API keys needed (uses public PokéAPI)
- See `requirements.md` for full feature spec

---