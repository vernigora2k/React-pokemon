import React, { Fragment, useContext } from 'react'
import { Context } from '../App'

export const Details = () => {
    const { selectedPokemon } = useContext(Context)

    console.log(selectedPokemon)
    if (!selectedPokemon) return null

    return (
        <Fragment>
            <h1>Details page</h1>
            <p>{selectedPokemon}</p>
        </Fragment>
    )
}