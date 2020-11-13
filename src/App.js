import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Home } from './pages/Home'
import { Details } from './pages/Details'
import { Navbar } from './components/Navbar';
import { getAllPokemons } from './js/controller';

export const Context = React.createContext()

function App() {
  const [state, setState] = useState({
    pokemonsList: [],
    activePokemons: 'pikachu',
  })

  const initialUrl = 'https://pokeapi.co/api/pokemon'

  useEffect(() => {
    console.log('sdfsdfsdfsdf')
    async function fetchData() {
      let response = await getAllPokemons(initialUrl)
      console.log('useEffect []')
      await console.log(response)
    }
    fetchData()
  }, [])


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
