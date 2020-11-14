import React, { Fragment, useContext } from 'react'
import { Context } from '../App'
import Card from './Card'

export default function PokemonsList() {
    const { pokemonsList } = useContext(Context)

    return (
        <div className="cards d-flex flex-wrap justify-content-between">
            {pokemonsList.map((pokemon, i) => {
                return <Card pokemon={pokemon} key={i} />
            })}
        </div>
    )
}