import React, { Fragment, useContext } from 'react'
import { Link } from 'react-router-dom'
import typeColors from '../aditianal/pokemonTypeColors'
import { Context } from '../App'

export const Details = () => {
    const { selectedPokemon } = useContext(Context)

    console.log(selectedPokemon)
    if (!selectedPokemon) return (
        <div className="alert alert-warning" role="alert">
            Firstly you have to select Pokemon!
        </div>
    )

    return (
        <Fragment>
            <div className="d-flex justify-content-between">
                <h1>Details page</h1>
                <Link className="h2" to="/">go Back</Link>
            </div>
            <div className="card mt-3 d-flex" >
                <img className="card-img-top align-self-center" style={{width: "300px"}} src={selectedPokemon.pokemon.sprites.back_shiny} alt="Card image cap" />
                <div className="card-body">
                    <h5 className="card-title">{selectedPokemon.pokemon.name}</h5>
                    <div className="card-text">
                        {
                            selectedPokemon.pokemon.types.map((type,i) => {
                                return (
                                    <div 
                                        className="pokemon__type mb-1"
                                        style={{backgroundColor: typeColors[type.type.name]}} 
                                        key={i}
                                    >
                                        {type.type.name}
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <ul className="list-group list-group-flush">
                    {
                        selectedPokemon.pokemon.abilities.map((type,i) => {
                            return (
                                <li className="list-group-item" key={i}>
                                    {type.ability.name}
                                </li>
                            )
                        })
                    }
                </ul>
                <div className="card-body">
                    <p className="card-text d-flex justify-content-between">
                        <strong>base_experience:</strong>
                        {selectedPokemon.pokemon.base_experience}
                    </p>
                    <p className="card-text d-flex justify-content-between">
                        <strong>weight:</strong>
                        {selectedPokemon.pokemon.weight}
                    </p>
                    <p className="card-text d-flex justify-content-between">
                        <strong>height:</strong>
                        {selectedPokemon.pokemon.height}
                    </p>
                    <p className="card-text d-flex justify-content-between">
                        <strong>id:</strong>
                        {selectedPokemon.pokemon.id}
                    </p>
                </div>
            </div>
        </Fragment>
    )
}