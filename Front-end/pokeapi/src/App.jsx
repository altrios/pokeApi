import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import Pokelist from './components/pokelist.component';
import usePokemonContext from "./hooks/usePokemonContext";

function App() {
  const { pokemonDetail, isLoading } = usePokemonContext() || {};

  return (
    <Router>
      <section className="section-container justify-center items-center">
        <main>
          <nav>
            <ul>
              <li>
                <Link to="/">Ver Lista de Pokémon</Link>
              </li>
            </ul>
          </nav>
          <div className='content justify-center items-center'>
            <Routes>
              <Route path="/" element={<Pokelist  />} />
            </Routes>
          </div>
        </main>
      </section>
    </Router>
  );
}

export default App;
