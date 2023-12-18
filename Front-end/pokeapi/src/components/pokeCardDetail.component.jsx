import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Box, Grid } from '@mui/material';
import { useLocation } from 'react-router-dom';
import {  useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTheme } from '@mui/system';
import { colorByType, colorByStat } from '../constants/pokemon';
import EvolutionChain from './evolutionChain.component';

const PokeCardDetail = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const pokeInfo = state?.item;
    const poketypes = state?.pokemonTypes;
    const backgroundColors = state?.backgroundColors;
    const pokeEvo = state?.pokeEvo;
    const [pokeData, setPokedata] = useState([]);
    const [flavorText, setFlavorText] = useState("");
    let gradientDefinition = '';

    useEffect(() => {
        const hasToken = !!sessionStorage.getItem('token');
        if(!hasToken){
            navigate('/login')
        }
        axios
            .get(pokeInfo.url)
            .then((info) => {
                console.log(info.data);
                axios.get(info.data.species.url)
                    .then((data) => {
                        console.log(data.data.flavor_text_entries[0].flavor_text)
                        setFlavorText(data.data.flavor_text_entries[0].flavor_text.replace(/\n/g, ' ').replace(/\f/g, ' ').replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;'))
                    })
                    .catch((e) => { console.log(e) })
                setPokedata(info.data);
            })
            .catch((err) => console.log(err));
    }, []);

    if (backgroundColors && backgroundColors.length >= 2) {
        gradientDefinition = `linear-gradient(110deg, ${backgroundColors[0]} 60%, ${backgroundColors[1]} 60%)`;
    } else if (backgroundColors && backgroundColors.length === 1) {
        gradientDefinition = `linear-gradient(110deg, ${backgroundColors[0]} 60%, #ffffff 60%)`;
    } else {
        gradientDefinition = `linear-gradient(110deg, #ffffff 60%, #ffffff 60%)`;
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
                <Card className="grid-item" style={{ minHeight: '300px', borderRadius: '16px', background: gradientDefinition }}>
                    <CardContent className="text-center">
                        <img src={pokeInfo.image} alt={pokeInfo.name} style={{ width: '100%', marginBottom: '10px', display: 'flex' }} />
                        <Box display="flex" gap={2} justifyContent="center">
                            <Typography variant="h6" color="textSecondary">
                                N° {pokeInfo.number}
                            </Typography>
                        </Box>
                        <Box display="flex" gap={2} justifyContent="center">
                            <Typography variant="h6">{pokeInfo.name.charAt(0).toUpperCase() + pokeInfo.name.slice(1)}</Typography>
                        </Box>
                        <Box display="flex" gap={2} justifyContent="center">
                            <Typography variant="h6">
                                {poketypes?.map((item, index) => (
                                    <span key={index} style={{ backgroundColor: colorByType[item.type.name] }} className="list-type-box">
                                        {item.type.name.charAt(0).toUpperCase() + item.type.name.slice(1)}
                                    </span>
                                ))}
                            </Typography>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} md={6} style={{ textAlign: 'center' }}>
                <Card className="grid-item" style={{ borderRadius: '16px', marginTop: '10px' }}>
                    <CardContent className="text-center">
                        <Typography variant="h4" fontWeight="bold" textTransform="capitalize" style={{ marginBottom: '20px' }}>
                            Pokedex Entry
                        </Typography>
                        <Typography variant="h6" textTransform="capitalize" style={{ marginBottom: '20px' }}
                        dangerouslySetInnerHTML={{ __html: flavorText}}>
                          
                        </Typography>
                        <Typography variant="h6" fontWeight="bold" textTransform="capitalize" style={{ marginBottom: '10px' }}>
                            Abilities
                        </Typography>
                        <Box>
                            <Typography style={{ textAlign: 'center' }}>
                                {pokeData.abilities &&
                                    pokeData.abilities.map((ability, index) => (
                                        <li
                                            key={index}
                                            style={{ backgroundColor: '#e4e4e4', borderRadius: '8px', margin: '5px', padding: '5px' }}
                                        >
                                            {ability.ability.name}
                                        </li>
                                    ))}
                            </Typography>
                        </Box>
                        <Box>
                            <Grid gap={2}>
                                <Typography variant="h6" fontWeight="bold" textTransform="capitalize" margin={2}>
                                    Stats
                                </Typography>
                                <Grid container justifyContent="center" spacing={2}>
                                    {pokeData?.stats?.map((stat) => (
                                        <Grid item key={stat.stat.name} style={{ minWidth: '110px' }}>
                                            <Box
                                                style={{ backgroundColor: `${colorByStat[stat.stat.name]}`, borderRadius: '18px' }}
                                                sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    alignItems: 'center',
                                                    textAlign: 'center',
                                                }}
                                            >
                                                <Box
                                                    className="bg-green-500 rounded-full w-[26px] aspect-square"
                                                    sx={{
                                                        display: 'grid',
                                                        placeItems: 'center',
                                                        '& span': {
                                                            fontSize: '10px',
                                                            color: 'white',
                                                            fontWeight: 'bold',
                                                        },
                                                    }}
                                                >
                                                    <span>{stat.stat.name}</span>
                                                </Box>
                                                <Typography variant="body1" fontWeight="bold" fontSize="xs">
                                                    {stat.base_stat}
                                                </Typography>
                                            </Box>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Grid>
                            {/* <Grid>
                                <Typography variant="h6" fontWeight="bold" textTransform="capitalize" margin={2}>
                                    Evolution Chain
                                </Typography>
                                <Grid container justifyContent="center" spacing={2}>
                                    <EvolutionChain pokeEvoData={pokeEvo} />
                                </Grid>
                            </Grid> */}
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default PokeCardDetail;
