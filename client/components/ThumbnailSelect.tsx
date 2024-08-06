import { PokemonGeneration } from '../../models/pokemon.ts'
import { useQuery } from '@tanstack/react-query'
import { fetchPokemonGeneration } from '../apis/pokemon.ts'
import LoadingSpinner from './LoadingSpinner.tsx'
import { Link } from 'react-router-dom'

interface Prop {
  generation: string
}

export default function ThumbnailSelect(props: Prop) {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['generationid', props.generation],
    queryFn: () =>
      fetchPokemonGeneration(
        typeof props.generation === 'undefined' ? '1' : props.generation,
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
      <Link className="region" to={`/generation/${props.generation}`}>
        {pokemonGeneration.main_region.name.charAt(0).toUpperCase() +
          pokemonGeneration.main_region.name.slice(1)}
      </Link>
    </>
  )
}
