
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import PokeCardList from './pokeCardList.component';
import { Grid, Input, Button, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

const INITIAL_LIMIT = 40;
const INCREASE_LIMIT = 20;

const Pokelist = (pokemonDetail) => {
    const [allPokemons, setAllPokemons] = useState([]);
    const [pokemonName, setPokemonName] = useState("");
    const [evolvefrom, setEvolvefrom] = useState("")
    const pokemonsByName = allPokemons.filter((pokemon) =>
        pokemon.name.includes(pokemonName)
    );
    const [limit, setLimit] = useState(INITIAL_LIMIT);
    const [loading, setLoading] = useState(false)
    const targetObserver = useRef(null);
    const entry = useIntersectionObserver(targetObserver, {});
    const isVisible = !!entry?.isIntersecting;
    const handleChangePokemonName = (e) =>
        setPokemonName(e.target.value.toLowerCase());

    useEffect(() => {
        console.log(pokemonDetail)
        axios.get('http://localhost:3000/api/v1/pokelist')
            .then(response => {
                // console.log(response.data);
                setAllPokemons(response.data.results)
            })
            .catch(error => console.error('Error fetching data:', error));

    }, []);
    useEffect(() => {
        const maxPokemons = pokemonsByName.length;
        if (isVisible && maxPokemons !== 0) {
            const newLimit = limit + INCREASE_LIMIT;
            newLimit > maxPokemons ? setLimit(maxPokemons) : setLimit(newLimit);
            newLimit > maxPokemons ? setLoading(false) : setLoading(true);
        }
    }, [isVisible, pokemonsByName, limit]);

    useEffect(() => {
        setLimit(INITIAL_LIMIT);
    }, [pokemonName]);


    useEffect(() => {
        const fetchData = async (pokemon) => {
            try {
                const { data } = await axios.get(pokemon.url);
                // setPokemon(data);
                pokemon.types = data.types
                console.log(pokemon)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
            try {
                axios
                    .get(pokemon.url)
                    .then(({ data }) => {
                        axios.get(data.species?.url)
                            .then((specie) => {
                                axios.get(specie.data.evolution_chain.url)
                                    .then((evolution_chain) => {
                                        if (evolution_chain.data.chain.species?.name !== data.name) {
                                            if (evolution_chain.data.chain.evolves_to[0]?.species?.name === data.name) {
                                                pokemon.evolvefrom=evolution_chain.data.chain?.species?.name
                                            } else {
                                                pokemon.evolvefrom=evolution_chain.data.chain.evolves_to[0]?.species?.name
                                            }

                                        }
                                    })
                            }
                            )
                            .catch((err) => console.log(err));
                    })
                    .catch((err) => console.log(err));
            } catch (error) {
                console.error('Error fetching data:', error);
            }

        };

        // Iterar sobre la lista de pokémons y llamar a fetchData para cada uno
        pokemonsByName.slice(0, limit).forEach((pokemon, index) => {
            fetchData(pokemon);
        });
    }, [pokemonsByName, limit]);




    return (
        <>
            <Grid container style={{ paddingBottom: '10px' }}>
                <form>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <TextField
                            className="flex-1"
                            type="text"
                            autoComplete="off"
                            placeholder="Search your Pokemon"
                            name="pokemonName"
                            value={pokemonName}
                            onChange={handleChangePokemonName}
                            sx={{
                                width: '90%',
                                fontSize: '1.25rem',
                                borderRadius: '10px',
                                marginBottom: '15px',
                                '& .MuiInputBase-root': {
                                    backgroundColor: '#FFFFFF',
                                    border: '1px solid #FFFFFF',
                                    borderRadius: '10px',
                                },
                                '& .Mui-focused': {
                                    backgroundColor: '#FFFFFF',
                                    border: '1px solid #FFFFFF',
                                    borderRadius: '10px',
                                },
                            }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <Button
                                            type="button"
                                            className='search-button'

                                        >
                                            <SearchIcon sx={{ fontSize: 20 }} />
                                        </Button>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </div>
                </form>
            </Grid>
            <Grid spacing={2} xs={12} sm={6} md={4} lg={3} className=" pokemon-list" style={{ display: '', justifyContent: 'center' }}>

                {pokemonsByName.slice(0, limit).map((item, index) => (
                    <Grid item key={index} className='justify-center items-center pokemon-card'>
                        <PokeCardList item={item} />
                    </Grid>
                ))}
                <span ref={targetObserver}></span>
                {loading && (
                    <div className='text-contrast-50 spin-slow' style={{ padding: '5px' }} >
                        <img
                            height={50}
                            src='/pokeball-icon.png'
                            alt="Pokeball"
                            style={{ filter: 'brightness(0.5)' }}
                        />
                    </div>


                )}
            </Grid>

        </>
    );
};

export default Pokelist;
