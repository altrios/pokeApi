import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Box, ListItem } from '@mui/material';
import axios from 'axios';
import { colorByType } from "../constants/pokemon";

const PokeCardList = ({ item }) => {
    const [pokemon, setPokemon] = useState([]);
    const [evolvefrom, setEvolvefrom] = useState("")

    useEffect(() => {

        const fetchData = async () => {
            try {
                axios
                    .get(item.url)
                    .then(({ data }) => {
                        setPokemon(data)
                        axios.get(data.species.url)
                            .then((specie) => {
                                axios.get(specie.data.evolution_chain.url)
                                    .then((evolution_chain) => {
                                        if (evolution_chain.data.chain.species.name !== item.name) {
                                            if (evolution_chain.data.chain.evolves_to[0].species?.name === item.name) {
                                                setEvolvefrom(evolution_chain.data.chain.species.name)
                                                // console
                                            } else {
                                                // console.log(evolution_chain.data.chain.evolves_to)
                                                setEvolvefrom(evolution_chain.data.chain.evolves_to[0].species?.name)
                                            }

                                        }
                                    })
                                // console.log(specie.data)
                            }
                            )
                            .catch((err) => console.log(err));
                        // console.log(data)
                    })
                    .catch((err) => console.log(err));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <Card className='grid-item' style={{height:'100%'}}>
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
                <Box display="flex"  justifyContent="center">
                    {evolvefrom && (
                        <Typography>
                            Evolves from: <span>{evolvefrom}</span>
                        </Typography>
                    )}
                </Box>

            </CardContent>
        </Card>


    );
};

export default PokeCardList;
