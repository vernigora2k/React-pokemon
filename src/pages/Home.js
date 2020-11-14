import React, { Fragment, useContext } from 'react'
import { Context } from '../App'
import { FormSearch } from '../components/FormSearch'
import PokemonsList from '../components/PokemonsList'

export const Home = () => {
    const { getNext, nextPage, getPrev, prevPage, pokemonsList } = useContext(Context)

    return (
        <Fragment>
            <div className="d-flex justify-content-around mb-3">
                <h1>Main page</h1>
                <div className="d-flex">
                    {prevPage && <button onClick={() => getPrev(prevPage)} className="btn btn-primary">prev</button>}
                    {nextPage && <button onClick={() => getNext(nextPage)} className="btn btn-success ml-2">next</button>}
                </div>
            </div>
            <FormSearch />
            <PokemonsList />
        </Fragment>
    )
}