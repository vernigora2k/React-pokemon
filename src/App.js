import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Home } from './pages/Home'
import { Details } from './pages/Details'
import { Navbar } from './components/Navbar';
import { getAllPokemons, getPokemon } from './js/controller';
import { urlPokemonsList } from './js/config';

export const Context = React.createContext()

function App() {
  const [state, setState] = useState({
    pokemonsList: [],
    selectedPokemon: 'pikachu',
    nextPage: null,
    previousPage: null,
    loading: true,
  })


  useEffect(() => {
    async function fetchData() {
      // let response = await getAllPokemons(initialUrl)
      const {next, previous, results} = await getAllPokemons(urlPokemonsList)
      await setState(prev => {
        return {
          ...prev,
          nextPage: next,
          previousPage: previous,
          pokemonsList: results,
        }
      })
      await loadPokemon(results)
    }
    fetchData()
  }, [])

  console.log(state)

  const loadPokemon = async (data) => {
    const pokemonsList = await Promise.all(data.map(async pokemon => {
      return await getPokemon(pokemon.url)
    }))
    setState(prev => {
      return {
        ...state,
        pokemonsList
      }
    })
  }


  return (
    <Context.Provider value={state}>
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
