import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Home } from './pages/Home'
import { Details } from './pages/Details'
import { Navbar } from './components/Navbar';
import { getPokemon } from './js/controller';
import { urlPokemonsList, urlPokemonType, urlSearchPokemon } from './js/config';

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
    await loadPokemon(results)
    setLoading(false)
  }

  async function fetchDataMultiple(url=urlPokemonType) {
    setAllSelectedPokemon(
      await Promise.all (selectedTypes.map(async type => {
        return await getPokemon(type.url)
      }))
    )
  }

  async function fetchDataMultipleIntersected() {
    setLoading(true)
    if (!allSelectedPokemon) {
      fetchData()
      return 
    }
    let dataArray = allSelectedPokemon.map(item => item.pokemon)
    let dataIntersectedArray = _.intersectionBy(...dataArray, 'pokemon.name')
    let resultArray = dataIntersectedArray.map(item => item.pokemon)
    await loadPokemon(resultArray)
    setLoading(false)
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
    setLoading(true)
    setItemsPerPage(item)
  }

  const searchPokemon = (pokemon) => {
    if (!pokemon) {
      fetchData()
      return null
    }
    getPokemon(urlSearchPokemon + pokemon)
    .then(res => {
        if (res === undefined) throw new Error('some wrong!!!')
        setPokemonsList([res])
      })
    .catch(err => console.log(err))
  }

  const selectTypes = (types) => {
    if (!types.length) fetchData()
    setSelectedTypes(types)
  }
  
  useEffect(fetchData, [])

  useEffect(fetchData, [itemsPerPage])

  useEffect(() => fetchDataMultiple(selectedTypes), [selectedTypes])

  useEffect(fetchDataMultipleIntersected, [allSelectedPokemon])

  return (
    <Context.Provider value={{getNext, nextPage, getPrev, prevPage, pokemonsList, loading, goToDetails, selectedPokemon, setItemPerPage, itemsPerPage, searchPokemon, selectTypes, selectedTypes }}>
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
