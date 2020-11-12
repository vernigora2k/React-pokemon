import React from 'react'

export const FormSearch = () => {
    return (
        <form>
            <div className="form-group">
                <input
                    className="form-control"
                    type="text"
                    placeholder="Enter pokemon name for search"
                >
                </input>
            </div>
        </form>
    )
}