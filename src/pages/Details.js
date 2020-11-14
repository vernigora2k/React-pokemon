import React, { Fragment, useContext } from 'react'
import { Context } from '../App'

export const Details = () => {
    const { selectedPokemon } = useContext(Context)

    console.log(selectedPokemon)
    if (!selectedPokemon) return null

    return (
        <Fragment>
            <h1>Details page</h1>
            <div className="card" style={{width: '18rem'}}>
                <img className="card-img-top" src="..." alt="Card image cap" />
                <div className="card-body">
                    <h5 className="card-title">{selectedPokemon.pokemon.name}</h5>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the </p>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">Cras justo odio</li>
                    <li className="list-group-item">Dapibus ac facilisis in</li>
                    <li className="list-group-item">Vestibulum at eros</li>
                </ul>
                <div className="card-body">
                    <a href="#" className="card-link">Ссылка карты</a>
                    <a href="#" className="card-link">Другая ссылка</a>
                </div>
            </div>
        </Fragment>
    )
}