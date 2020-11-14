import React from 'react'

export default function Loader() {
    return (
        <div className="d-flex justify-content-center">
            <div 
                className="spinner-border text-primary" 
                style={{width: '4rem', height: '4rem'}}
                role="status"
            >
            <span className="sr-only">...loading</span>
            </div>
        </div>
        
    )
}