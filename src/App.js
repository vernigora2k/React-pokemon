import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
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
  const [selectedPokemon, setSelectedPokemon] = useState('pikachu')


  async function fetchData(url=urlPokemonsList) {
    const {next, previous, results} = await getAllPokemons(url)
    setNextPage(next)
    setPrevPage(previous)
    await loadPokemon(results)
  }

  const loadPokemon = async (data) => {
    const pokemonsList = await Promise.all(data.map(async pokemon => {
      return await getPokemon(pokemon.url)
    }))
    setPokemonsList(pokemonsList)
  }
  
  const getNext = async (nextPage) => {
    fetchData(nextPage)
  }

  const getPrev = async (prevPage) => {
    fetchData(prevPage)
  }

  
  useEffect(fetchData, [])
  
  useEffect(() => console.log(pokemonsList), )
  

  return (
    <Context.Provider value={{getNext, nextPage, getPrev, prevPage, pokemonsList}}>
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
