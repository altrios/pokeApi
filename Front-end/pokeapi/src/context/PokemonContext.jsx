import { createContext, useState } from "react";
import {
  formatAbilities,
  formatStats,
  formatTypes,
  getEvolutions,
  getImageByPokemon,
  getPokemonDescription,
} from "../helpers/pokemon";
import axios from "axios";

const PokemonContext = createContext();

const PokemonProvider = ({ children }) => {
  const [pokemonDetail, setPokemonDetail] = useState(null);
  // const [showDetailPokemon, setShowDetailPokemon] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const showPokemon = async (pokemonInfo) => {
    setIsLoading(true);
   
    const { id, name, height, weight, stats, types, abilities } = pokemonInfo;

    setPokemonDetail({
      id,
      name,
      height,
      weight,
      stats: formatStats(stats),
      types: formatTypes(types),
      abilities: formatAbilities(abilities),
      image: getImageByPokemon(pokemonInfo.sprites),
    });
    // setShowDetailPokemon(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  // const closePokemonDetail = () => {
  //   setShowDetailPokemon(false);
  // };

  return (
    <PokemonContext.Provider
      value={{
        // showDetailPokemon,
        showPokemon,
        // closePokemonDetail,
        pokemonDetail,
        isLoading,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};

export { PokemonContext, PokemonProvider };
