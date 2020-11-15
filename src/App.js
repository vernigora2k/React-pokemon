import React, { useEffect, useState } from 'react';
import { BrowserRouter, Redirect, Route, Switch, useHistory, withRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history'
import { Home } from './pages/Home'
import { Details } from './pages/Details'
import { Navbar } from './components/Navbar';
import { getAllPokemons, getPokemon } from './js/controller';
import { urlPokemonsList } from './js/config';

export const Context = React.createContext()

function App() {
  const [nextPage, setNextPage] = useState(null)
  const [prevPage, setPrevPage] = useState(null)
  const [loading, setLoading] = useState(true)
  const [pokemonsList, setPokemonsList] = useState([])
  const [selectedPokemon, setSelectedPokemon] = useState(null)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  async function fetchData(url=urlPokemonsList + itemsPerPage) {
    const {next, previous, results} = await getAllPokemons(url)
    setNextPage(next)
    setPrevPage(previous)
    await loadPokemon(results)
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
    setItemsPerPage(item)
  }
  
  useEffect(fetchData, [])

  useEffect(fetchData, [itemsPerPage])

  return (
    <Context.Provider value={{getNext, nextPage, getPrev, prevPage, pokemonsList, loading, goToDetails, selectedPokemon, setItemPerPage, itemsPerPage }}>
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
