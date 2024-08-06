import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { fetchPokemonByName } from '../apis/pokemon.ts'
import LoadingSpinner from './LoadingSpinner.tsx'
import Species from './Species.tsx'

export default function PokemonDetail() {
  const { name } = useParams()
  const {
    isPending,
    isError,
    data: pokemon,
    error,
  } = useQuery({
    queryKey: [name],
    queryFn: () =>
      fetchPokemonByName(
        typeof name === 'undefined' ? '1' : name.toLocaleLowerCase(),
      ),
  })
  if (isPending) {
    return <LoadingSpinner />
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  return (
    <div className="pokecard">
      <div className="title">
        <h1>
          {pokemon.name.charAt(0).toUpperCase() +
            (pokemon.name.slice(1).split(/-/g).length < 3
              ? pokemon.name.slice(1).split(/-/g).join(' ')
              : pokemon.name.slice(1).split(/-/g)[0])}
        </h1>
        <div className="PokeId">
          <h4>
            #
            {pokemon.id < 100
              ? pokemon.id < 10
                ? `00${pokemon.id}`
                : `0${pokemon.id}`
              : pokemon.id}
          </h4>
        </div>
      </div>
      <ul>
        {pokemon.types.map((type) => (
          <li key={`${type.type.name} ${type.slot}`} id={type.type.name}>
            {type.type.name}
          </li>
        ))}
      </ul>
      <img
        id="thumbnail"
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${pokemon.id}.gif`}
        alt={pokemon.name}
      ></img>
      <img
        id="pokeimage"
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
        alt={pokemon.name}
      ></img>
      <div className="about">
        <h2>About</h2>
        <section>
          <Species pokeid={pokemon.id} />
          <p>Height: {pokemon.height * 10} cm</p>
          <p>Weight: {pokemon.weight / 10} kg</p>
        </section>
        <section className="stats">
          Abilities:{' '}
          {pokemon.abilities.map(({ ability, slot }) => (
            <p key={slot}>{ability.name}</p>
          ))}
        </section>
        <section>
          Moves:{' '}
          {pokemon.moves.map(({ move }, index) =>
            index < 4 ? <p key={move.name}>{move.name}</p> : null,
          )}
        </section>
      </div>
    </div>
  )
}

/*
const pokemon: Pokemon = {
  id: 1,
  name: 'bulbasaur',
  sprites: {
    front_default:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
    back_default:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png',
  },
  abilities: [
    {
      ability: {
        name: 'overgrow',
        url: 'https://pokeapi.co/api/v2/ability/65/',
      },
      is_hidden: false,
      slot: 1,
    },
    {
      ability: {
        name: 'chlorophyll',
        url: 'https://pokeapi.co/api/v2/ability/34/',
      },
      is_hidden: true,
      slot: 3,
    },
  ],
  moves: [
    {
      move: {
        name: 'razor-wind',
        url: 'https://pokeapi.co/api/v2/move/13/',
      },
    },
    {
      move: {
        name: 'swords-dance',
        url: 'https://pokeapi.co/api/v2/move/14/',
      },
    },
  ],
  types: [
    {
      slot: 0,
      type: {
        name: 'grass',
        url: 'https://pokeapi.co/api/v2/type/12/',
      },
    },
    {
      slot: 1,
      type: {
        name: 'poison',
        url: 'https://pokeapi.co/api/v2/type/4/',
      },
    },
  ],
}
*/
