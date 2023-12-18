import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link
} from 'react-router-dom';
import Pokelist from './components/pokelist.component';
import usePokemonContext from "./hooks/usePokemonContext";
import PokeCardDetail from './components/pokeCardDetail.component';
import Login from './components/login.component';
import Register from './components/register.component';

function App() {
  const { pokemonDetail, isLoading } = usePokemonContext() || {};
  const [login, setLogin] = useState(false)
  const [userbar, setUsebar] = useState(false)

  // Check if "token" is present in session storage
  const logout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('username');
    setUsebar(false)
  }

  useEffect(() => {
    const hasToken = !!sessionStorage.getItem('token');
    if (hasToken) {
      setUsebar(true)

    }

  }, [])
  // console.log = function() {};
  // console.error = function() {};
  return (  
    <Router>
      {userbar &&
        <nav>
          <ul>
          <li>
              <Link to="/" > Pokemon List</Link>
            </li>
            <li style={{float:'right'}}>
              <Link to="/login" onClick={logout}>Logout</Link>
            </li>
            
          </ul>
        </nav>
      }
      <section className="section-container justify-center items-center">
        <main>
          <div className='content justify-center items-center'>
            <Routes>
              <Route path="/" element={<Pokelist />} />
              <Route path="/poke/:id" element={<PokeCardDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </div>
        </main>
      </section>
    </Router>
  );
}

export default App;
