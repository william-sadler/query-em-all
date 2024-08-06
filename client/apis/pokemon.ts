import request from 'superagent'
import type {
  Pokemon,
  PokemonGeneration,
  PokemonSpecies,
  SearchResults,
} from '../../models/pokemon.ts'

export async function fetchPokemonGeneration(generation: number | string) {
  const res = await request.get(
    `https://pokeapi.co/api/v2/generation/${generation}`,
  )

  return res.body as PokemonGeneration | SearchResults
}

export async function fetchPokemonByName(name: string) {
  const res = await request.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
  return res.body as Pokemon
}
//
export async function fetchPokemonSpicies(id: number) {
  const res = await request.get(
    `https://pokeapi.co/api/v2/pokemon-species/${id}`,
  )
  return res.body as PokemonSpecies
}

export async function fetchAllPokemonNames() {
  const res = await request.get(
    `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=920`,
  )
  return res.body as PokemonGeneration
}
