import React, { Fragment, useContext } from 'react'
import { Context } from '../App'

export const Details = () => {
    const {activePokemons} = useContext(Context)

    console.log(activePokemons)
    if (!activePokemons) return null

    return (
        <Fragment>
            <h1>Details page</h1>
            <p>{activePokemons}</p>
        </Fragment>
    )
}