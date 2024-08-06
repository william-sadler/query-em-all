import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { fetchAllPokemonNames } from '../apis/pokemon.ts'
import LoadingSpinner from './LoadingSpinner.tsx'
import { useState } from 'react'

export default function SearchBar() {
  const navigate = useNavigate()
  const [newItem, setNewItem] = useState('')
  const [pokeNames, setAutoComplete] = useState<string[]>([])
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['names'],
    queryFn: () => fetchAllPokemonNames(),
  })

  if (isPending) {
    return <LoadingSpinner />
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }
  const searchResults = data

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    navigate(
      '/pokemon/' +
        (typeof pokeNames[0] === 'undefined'
          ? Number(newItem) > 920
            ? '920'
            : newItem
          : pokeNames[0].toLocaleLowerCase()) ==
        '/pokemon/'
        ? '/pokemon/1'
        : '/pokemon/' +
            (typeof pokeNames[0] === 'undefined'
              ? Number(newItem) > 920
                ? '920'
                : newItem
              : pokeNames[0].toLocaleLowerCase()),
    )
    setNewItem('')
    setAutoComplete([])
  }

  const handleClick = (pokename: string) => {
    navigate('/pokemon/' + pokename)
    setNewItem('')
    setAutoComplete([])
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewItem(event.target.value)
    if (event.target.value == '' || !isNaN(Number(event.target.value))) {
      return []
    }
    const reg = new RegExp(event.target.value)
    return searchResults.results.filter((term) => {
      if (term.name.match(reg)) {
        setAutoComplete([term.name])
      }
    })
  }
  return (
    <div className="searchbar">
      <form autoComplete="off" onSubmit={handleSubmit}>
        <label htmlFor="newItem">Pokemon: </label>
        <div className="autocomplete" style={{ width: `300px` }}>
          <input
            type="text"
            name="myPokemon"
            id="myInput"
            value={newItem}
            placeholder="Pokemon"
            onChange={handleChange}
          />
          <div id="myInputautocomplete-list" className="autocomplete-items">
            {pokeNames.map((name) => (
              <button onClick={() => handleClick(name)} key={name}>
                {name}
              </button>
            ))}
          </div>
        </div>
        <button type="submit">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="25"
            height="25"
            viewBox="0 0 24 24"
          >
            <path d="M 9 2 C 5.1458514 2 2 5.1458514 2 9 C 2 12.854149 5.1458514 16 9 16 C 10.747998 16 12.345009 15.348024 13.574219 14.28125 L 14 14.707031 L 14 16 L 20 22 L 22 20 L 16 14 L 14.707031 14 L 14.28125 13.574219 C 15.348024 12.345009 16 10.747998 16 9 C 16 5.1458514 12.854149 2 9 2 z M 9 4 C 11.773268 4 14 6.2267316 14 9 C 14 11.773268 11.773268 14 9 14 C 6.2267316 14 4 11.773268 4 9 C 4 6.2267316 6.2267316 4 9 4 z"></path>
          </svg>
        </button>
      </form>
      <button
        className="feelinglucky"
        onClick={() => navigate('/pokemon/' + Math.floor(Math.random() * 921))}
      >
        Feeling lucky?
      </button>
    </div>
  )
}

// export default function RegionSelect() {
//   return (
//     <>
//       <ul className="pokeselect">
//         {SearchResults.results.map((p) => (
//           <li className="regions" key={p.url}>
//             <ThumbnailSelect generation={`${p.name}`} />
//           </li>
//         ))}
//       </ul>
//     </>
//   )
// }
