import React, { useContext, useState } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { pokemonType } from '../aditianal/pokemonTypeOptions';
import { Context } from '../App';

const animatedComponents = makeAnimated();

export default function SelectorMultiple() {   
    const { selectTypes } = useContext(Context) 
        
    return (
        <Select
            closeMenuOnSelect={false}
            components={animatedComponents}
            isMulti
            options={pokemonType}
            isSearchable
            onChange={(types) => selectTypes(types)}
        />
    );
}
