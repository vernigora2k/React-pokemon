import React, { useContext, useState } from 'react'
import { Context } from '../App'

export const FormSearch = () => {
    const { searchPokemon } = useContext(Context)
    const [ value, setValue ] = useState('')

    const handleChange = event => {
        setValue(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        searchPokemon(value)
    }

    return (
        <form className="ml-2 mr-2" onSubmit={handleSubmit}>
            <div className="form-group d-flex">
                <input
                    className="form-control"
                    type="text"
                    placeholder="Enter pokemon name for search"
                    value={value}
                    onChange={handleChange}
                >
                </input>
                <button 
                    className="form-success btn btn-success ml-1 pl-4 pr-4"
                    type="success"
                >
                    <strong>search</strong>
                </button>
            </div>
        </form>
    )
}