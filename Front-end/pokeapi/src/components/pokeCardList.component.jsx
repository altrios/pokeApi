import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { colorByType } from "../constants/pokemon";

const PokeCardList = ({ item }) => {
    const evolvefrom = item.evolvefrom

    useEffect(() => {
        const hasToken = !!sessionStorage.getItem('token');
        if (!hasToken) {
            navigate('/login')
        }
        console.log(hasToken)

    }, []);

    const navigate = useNavigate();
    const handleCardClick = () => {
        navigate(`/poke/${item.name}`, {
            state: {
                item,
                pokemonTypes: item.types,
                backgroundColors: item.types?.map((item) => colorByType[item.type.name]),
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
                            {item.types?.map((item, index) => (
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
