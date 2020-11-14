import React from 'react'
import typeColors from '../aditianal/pokemonTypeColors'
import './card.scss'

export default function Card(data) {
    const {pokemon} = data
    console.log(data)
    console.log(pokemon)

    return (
        <div className="card mb-4 ml-2 mr-2 flex-grow-1 animated">
            <img className="card-img-top mw-50" src={pokemon.sprites.front_default} alt="pokemon img" />
            <div className="card-body">
                <h5 className="card-title">{pokemon.name}</h5>
                <p className="card-text d-flex justify-content-around">
                {
                    pokemon.types.map((type,i) => {
                        return (
                            <div 
                                className="pokemon__type"
                                style={{backgroundColor: typeColors[type.type.name]}} 
                                key={i}
                            >
                                {type.type.name}
                            </div>
                        )
                    })
                }
                </p>
                <p className="card-text d-flex">
                    <strong>abilities:</strong>
                     {
                        pokemon.abilities.map((type,i) => {
                            return (
                                <div className="ml-1" key={i}>
                                    {type.ability.name}
                                </div>
                            )
                        })
                    }
                </p>
                <p className="card-text">
                    <small>base experience: {pokemon.base_experience}</small>
                </p>
            </div>
        </div>
    )
}