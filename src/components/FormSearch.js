import React from 'react'

export const FormSearch = () => {
    return (
        <form>
            <div className="form-group d-flex">
                <input
                    className="form-control"
                    type="text"
                    placeholder="Enter pokemon name for search"
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