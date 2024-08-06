import { useQuery } from '@tanstack/react-query'
import { fetchPokemonSpicies } from '../apis/pokemon.ts'
import LoadingSpinner from './LoadingSpinner.tsx'

interface Prop {
  pokeid: number
}

export default function Species(props: Prop) {
  const { isPending, isError, data, error } = useQuery({
    queryKey: [props.pokeid],
    queryFn: () => fetchPokemonSpicies(props.pokeid),
  })
  if (isPending) {
    return <LoadingSpinner />
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }
  return (
    <>
      <p>
        Species:{' '}
        {data.genera.map((genera, indx) => (indx === 7 ? genera.genus : null))}
      </p>
    </>
  )
}
