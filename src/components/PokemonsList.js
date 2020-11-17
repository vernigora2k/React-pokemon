import React, { useContext } from 'react'
import { Context } from '../App'
import Card from './Card'
import Loader from './Loader'

export default function PokemonsList() {
    const { pokemonsList, loading } = useContext(Context)

    if (loading) return <Loader />

    return (
        <div className="cards d-flex flex-wrap justify-content-between">
            {pokemonsList.map((pokemon, i) => {
                return <Card pokemon={pokemon} key={i} />
            })}
        </div>
    )
}