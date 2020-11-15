import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import typeColors from '../aditianal/pokemonTypeColors'
import { Context } from '../App'
import './card.scss'

export default function Card(data) {
    const { goToDetails} = useContext(Context)
    const { pokemon } = data
    // console.log(data)
    // console.log(pokemon)

    return (
        <Link
            to="/details"
            className="card mb-4 ml-2 mr-2 flex-grow-1 animated" 
            onClick={() => {goToDetails(data)}}
        >
            <img className="card-img-top mw-50" src={pokemon.sprites.front_default} alt="pokemon img" />
            <div className="card-body">
                <h5 className="card-title">{pokemon.name}</h5>
                <div className="card-text d-flex justify-content-around">
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
                </div>
                <div className="card-text d-flex">
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
                </div>
                <p className="card-text">
                    <small>base experience: {pokemon.base_experience}</small>
                </p>
                <div className="hide-hover">
                    click for details...
                </div>
            </div>
        </Link>
    )
}