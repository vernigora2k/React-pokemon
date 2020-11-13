import React, { Fragment, useContext } from 'react'
import { Context } from '../App'
import { FormSearch } from '../components/FormSearch'

export const Home = () => {
    const { getNext, nextPage, getPrev, prevPage } = useContext(Context)

    return (
        <Fragment>
            <div className="d-flex justify-content-around mb-3">
                <h1>Main page</h1>
                <div className="d-flex">
                    <button onClick={() => getPrev(prevPage)} className="btn btn-primary">prev</button>
                    <button onClick={() => getNext(nextPage)} className="btn btn-success ml-2">next</button>
                </div>
            </div>
            <FormSearch />
        </Fragment>
    )
}