import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { colorByType } from "../constants/pokemon";

const PokeCardList = ({ item }) => {
    const [pokemon, setPokemon] = useState([]);
    const [evolvefrom, setEvolvefrom] = useState("")
    // const [evolutionChain, setEvolutionChain] = useState({})

    useEffect(() => {

        const fetchData = async () => {
            try {
                axios
                    .get(item.url)
                    .then(({ data }) => {
                        setPokemon(data)
                        axios.get(data.species?.url)
                            .then((specie) => {
                                axios.get(specie.data.evolution_chain.url)
                                    .then((evolution_chain) => {
                                        // setEvolutionChain({
                                        //     'evolutionset': evolution_chain.data.chain,
                                        //     'first': evolution_chain.data.chain.species,
                                        //     'second': {
                                        //         'name': evolution_chain.data.chain.evolves_to[0]?.species?.name,
                                        //         'evoLVL': evolution_chain.data.chain.evolves_to[0]?.evolution_details?.min_level
                                        //     },
                                        //     'thirth': {
                                        //         'name': evolution_chain.data.chain.evolves_to[0]?.evolves_to[0]?.species.name,
                                        //         'evoLVL': evolution_chain.data.chain.evolves_to[0]?.evolves_to[0]?.evolution_details?.min_level
                                        //     }
                                        // })


                                        if (evolution_chain.data.chain.species?.name !== item.name) {
                                            if (evolution_chain.data.chain.evolves_to[0]?.species?.name === item.name) {
                                                setEvolvefrom(evolution_chain.data.chain?.species?.name)
                                            } else {
                                                setEvolvefrom(evolution_chain.data.chain.evolves_to[0]?.species?.name)
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

        fetchData();
    }, []);

    const navigate = useNavigate();
    const handleCardClick = () => {
        navigate(`/${item.name}`, {
            state: {
                item,
                pokemonTypes: pokemon.types,
                backgroundColors: pokemon.types?.map((item) => colorByType[item.type.name]),
                // pokeEvo: evolutionChain
            }
        });
    };
    return (
        <Box
            xs={12} sm={6} md={4} lg={3}
            sx={{
                cursor: 'pointer',
                height: '100%',
            }}
            onClick={handleCardClick}
        >
            <Card className='grid-item' style={{ height: '100%', borderRadius: '16px' }} >
                <CardContent className='text-center'>
                    <img
                        src={item.image}
                        alt={item.name}
                        style={{ width: '50%', marginBottom: '10px', margin: 'auto', display: 'flex' }}
                    />
                    <Box display="flex" gap={2} justifyContent="center">
                        <Typography variant="h6" color="textSecondary">
                            N° {item.number}
                        </Typography>
                    </Box>

                    <Box display="flex" gap={2} justifyContent="center">
                        <Typography variant="h6">{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</Typography>
                    </Box>

                    <Box display="flex" gap={2} justifyContent="center">
                        <Typography variant="h6">
                            {pokemon.types?.map((item, index) => (
                                <span
                                    key={index}
                                    style={{ backgroundColor: colorByType[item.type.name] }}
                                    className='list-type-box'
                                >
                                    {item.type.name.charAt(0).toUpperCase() + item.type.name.slice(1)}
                                </span>
                            ))}
                        </Typography>

                    </Box>
                    <Box display="flex" justifyContent="center" >
                        {evolvefrom && (
                            <Typography>
                                Evolves from: <span>{evolvefrom}</span>
                            </Typography>
                        )}
                    </Box>

                </CardContent>
            </Card>
        </Box>


    );
};

export default PokeCardList;
