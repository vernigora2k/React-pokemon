import React, { Fragment, useContext } from 'react'
import { Context } from '../App'
import { FormSearch } from '../components/FormSearch'
import PokemonsList from '../components/PokemonsList'

export const Home = () => {
    const { getNext, nextPage, getPrev, prevPage, pokemonsList, itemsPerPage, setItemPerPage } = useContext(Context)

    return (
        <Fragment>
            <div className="d-flex justify-content-around mb-3">
                <h1>Main page</h1>
                <div className="d-flex align-items-center">
                    {prevPage && <button onClick={() => getPrev(prevPage)} className="btn btn-primary">prev</button>}
                    {nextPage && <button onClick={() => getNext(nextPage)} className="btn btn-success ml-2">next</button>}
                    <div className="d-flex ml-3">
                        <div onClick={() => setItemPerPage(10)}>{itemsPerPage==10 ? <h2>10</h2> : <h3>10</h3>}</div>
                        <div className="ml-1" onClick={() => setItemPerPage(20)}>{itemsPerPage==20 ? <h2>20</h2> : <h3>20</h3>}</div>
                        <div className="ml-1" onClick={() => setItemPerPage(50)}>{itemsPerPage==50 ? <h2>50</h2> : <h3>50</h3>}</div>
                    </div>
                </div>
            </div>
            <FormSearch />
            <PokemonsList />
        </Fragment>
    )
}