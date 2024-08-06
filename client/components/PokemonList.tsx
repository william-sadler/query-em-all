import { PokemonGeneration } from '../../models/pokemon.ts'
import { useQuery } from '@tanstack/react-query'
import { fetchPokemonGeneration } from '../apis/pokemon.ts'
import LoadingSpinner from './LoadingSpinner.tsx'
import { useParams } from 'react-router-dom'
import ThumbnailList from './ThumbnailList.tsx'

export default function PokemonList() {
  const { generationId } = useParams()
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['generationid', generationId],
    queryFn: () =>
      fetchPokemonGeneration(
        typeof generationId === 'undefined' ? '1' : generationId,
      ),
  })

  if (isPending) {
    return <LoadingSpinner />
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  const pokemonGeneration = data as PokemonGeneration

  return (
    <>
      <h2>
        Pokémon in{' '}
        {pokemonGeneration.main_region.name.charAt(0).toUpperCase() +
          pokemonGeneration.main_region.name.slice(1)}{' '}
        {pokemonGeneration.main_region.name === 'kanto'
          ? '🗼'
          : pokemonGeneration.main_region.name === 'johto'
            ? '⛩️'
            : pokemonGeneration.main_region.name === 'hoenn'
              ? '♨️'
              : pokemonGeneration.main_region.name === 'sinnoh'
                ? '🌨️'
                : pokemonGeneration.main_region.name === 'unova'
                  ? '🗽'
                  : pokemonGeneration.main_region.name === 'kalos'
                    ? '🥐'
                    : pokemonGeneration.main_region.name === 'alola'
                      ? '🏝️'
                      : pokemonGeneration.main_region.name === 'galar'
                        ? '👑'
                        : pokemonGeneration.main_region.name === 'paldea'
                          ? '☀️'
                          : '⚡'}
      </h2>
      <ul className="regionalpokemon">
        {pokemonGeneration.pokemon_species.map((p) => (
          <li className="pokelist" key={p.url}>
            <ThumbnailList pokemon={p.name} />
          </li>
        ))}
      </ul>
    </>
  )
}

// const generation = {
//   id: 1,
//   main_region: { name: 'Kanto', url: 'https://pokeapi.co/api/v2/region/1/' },
//   name: 'generation-i',
//   pokemon_species: [
//     { url: 'https://pokeapi.co/api/v2/pokemon/bulbasaur', name: 'Bulbasaur' },
//   ],
// } as PokemonGeneration
