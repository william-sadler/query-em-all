import { useQuery } from '@tanstack/react-query'
import { fetchPokemonByName } from '../apis/pokemon.ts'
import LoadingSpinner from './LoadingSpinner.tsx'
import { Link } from 'react-router-dom'

interface Prop {
  pokemon: string
}

export default function ThumbnailList(props: Prop) {
  const { isPending, isError, data, error } = useQuery({
    queryKey: [props.pokemon],
    queryFn: () =>
      fetchPokemonByName(
        typeof props.pokemon === 'undefined'
          ? '1'
          : props.pokemon.toLocaleLowerCase(),
      ),
  })
  if (isPending) {
    return <LoadingSpinner />
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  return (
    <>
      <Link className="pokemon" to={`/pokemon/${data.name}`}>
        {data.name}
        <img
          src={data.sprites.front_default}
          alt={`Front Default Sprite for ${data.name}`}
        />
      </Link>
    </>
  )
}
