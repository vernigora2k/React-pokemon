import React, { useEffect, useState } from 'react';
import { BrowserRouter, Redirect, Route, Switch, useHistory, withRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history'
import { Home } from './pages/Home'
import { Details } from './pages/Details'
import { Navbar } from './components/Navbar';
import { getPokemon } from './js/controller';
import { urlPokemonsList, urlPokemonType, urlSearchPokemon } from './js/config';

// export const intersection = required('array-intersection')
export const Context = React.createContext()

function App() {
  const [nextPage, setNextPage] = useState(null)
  const [prevPage, setPrevPage] = useState(null)
  const [loading, setLoading] = useState(true)
  const [pokemonsList, setPokemonsList] = useState([])
  const [selectedPokemon, setSelectedPokemon] = useState(null)
  const [allSelectedPokemon, setAllSelectedPokemon] = useState()
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [selectedTypes, setSelectedTypes] = useState([])

  const intersection = require('array-intersection')
  const _ = require('lodash')

  async function fetchData(url=urlPokemonsList + itemsPerPage) {
    const {next, previous, results} = await getPokemon(url)
    setNextPage(next)
    setPrevPage(previous)
    console.log(results)
    await loadPokemon(results)
    setLoading(false)
  }

  async function fetchDataMultiple(url=urlPokemonType) {
    console.log('fetchDataMultiple')
    console.log(selectedTypes)
    setAllSelectedPokemon(
      await Promise.all (selectedTypes.map(async type => {
        console.log(type)
        return await getPokemon(type.url)
      }))
    )
    // const allSelectedPokemon = await Promise.all (selectedTypes.map(async type => {
    //   console.log(type)
    //   return await getPokemon(type.url)
    // }))

    // console.log(allSelectedPokemon)
  }

  async function fetchDataMultipleIntersected() {
    if (!allSelectedPokemon) return
    console.log(allSelectedPokemon)
    let newArray = allSelectedPokemon.map(item => item.pokemon)
    console.log(newArray)
    let newLodashedArray = _.intersectionBy(...newArray, 'pokemon.name')
    console.log(newLodashedArray)
    let finalArray = newLodashedArray.map(item => item.pokemon)
    console.log(finalArray)
    await loadPokemon(finalArray)


    // console.log(intersection(['a', 'b', 'c'], ['b', 'c', 'e'], ['b', 'c', 'e']))
    // let spredArray = allSelectedPokemon.map(el =>{
    //     console.log(el)
    //     el.pokemon.forEach(element => {
    //       console.log(element.pokemon)

    //       console.log(Object.values(element))
    //       return element.pokemon
          // const entries = new Map([
          //   Object.values(element.pokemon)
          // ])
          // console.log(Object.fromEntries(entries))
          
      // })
      
    // })
    // await console.log(spredArray)
  }

  const loadPokemon = async (data) => {
    const pokemonsList = await Promise.all(data.map(async pokemon => {
      return await getPokemon(pokemon.url)
    }))
    setPokemonsList(pokemonsList)
  }
  
  const getNext = async (nextPage) => {
    setLoading(true)
    fetchData(nextPage)
  }

  const getPrev = async (prevPage) => {
    setLoading(true)
    fetchData(prevPage)
  }

  const goToDetails = (pokemon) => {
    setSelectedPokemon(pokemon)
  }

  const setItemPerPage = (item) => {
    setItemsPerPage(item)
  }

  const searchPokemon = (pokemon) => {
    if (!pokemon) {
      fetchData()
      return null
    }
    getPokemon(urlSearchPokemon + pokemon)
    .then(res => {
        console.log(res)
        if (res === undefined) throw new Error('some wrong!!!')
        setPokemonsList([res])
      })
    .catch(err => console.log(err))
  }

  const selectTypes = (types) => {
    console.log(types)
    setSelectedTypes(types)
  }
  
  useEffect(fetchData, [])

  useEffect(fetchData, [itemsPerPage])

  useEffect(() => fetchDataMultiple(selectedTypes), [selectedTypes])

  useEffect(fetchDataMultipleIntersected, [allSelectedPokemon])

  return (
    <Context.Provider value={{getNext, nextPage, getPrev, prevPage, pokemonsList, loading, goToDetails, selectedPokemon, setItemPerPage, itemsPerPage, searchPokemon, selectTypes }}>
      <BrowserRouter>
        <Navbar />
        <div className="container pt-4">
          <Switch>
            <Route path={'/'} exact component={Home} />
            <Route path={'/details'} component={Details} />
          </Switch>
        </div>
      </BrowserRouter>
    </Context.Provider>
  );
}

export default App;
