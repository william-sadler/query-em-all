import { useQuery } from '@tanstack/react-query'
import { fetchPokemonGeneration } from '../apis/pokemon.ts'
import LoadingSpinner from './LoadingSpinner.tsx'
import { SearchResults } from '../../models/pokemon.ts'
import ThumbnailSelect from './ThumbnailSelect.tsx'

export default function RegionSelect() {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['generations'],
    queryFn: () => fetchPokemonGeneration(''),
  })

  if (isPending) {
    return <LoadingSpinner />
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  const SearchResults = data as SearchResults

  return (
    <>
      <ul className="pokeselect">
        {SearchResults.results.map((p) => (
          <li className="regions" key={p.url}>
            <ThumbnailSelect generation={`${p.name}`} />
          </li>
        ))}
      </ul>
    </>
  )
}
