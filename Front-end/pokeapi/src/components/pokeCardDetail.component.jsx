import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { colorByType } from "../constants/pokemon";
import { useLocation } from 'react-router-dom';
// ...

const PokeCardDetail = () => {
    const { state } = useLocation();
    const pokeInfo = state?.item;
    const poketypes = state?.pokemonTypes;
    const backgroundColors = state?.backgroundColors;
    let gradientDefinition = '';

    // Verificar si backgroundColors está definido y tiene al menos dos colores
    if (backgroundColors && backgroundColors.length >= 2) {
      gradientDefinition = `linear-gradient(110deg, ${backgroundColors[0]} 60%, ${backgroundColors[1]} 60%)`;
    } else if (backgroundColors && backgroundColors.length === 1) {
      // Si hay solo un color, usarlo sin el segundo color
      gradientDefinition = `linear-gradient(110deg, ${backgroundColors[0]} 60%, #ffffff 60%)`;
    } else {
      // Si backgroundColors no está definido o es un array vacío, configurar un gradiente predeterminado
      gradientDefinition = `linear-gradient(110deg, #ffffff 60%, #ffffff 60%)`;
    }

    // setBackgroundColors(gradientDefinition);
    console.log(backgroundColors)
    // Lógica para mostrar detalles del Pokémon con el ID específico

    return (
        <>
            <Card className='grid-item' style={{ height: '100%', borderRadius: '16px', background: gradientDefinition }}>
                <CardContent className='text-center' >
                    <img

                        src={pokeInfo.image}
                        alt={pokeInfo.name}
                        style={{ width: '20%', marginBottom: '10px', margin: 'auto', display: 'flex', }}
                    />
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


                </CardContent>
            </Card>
        </>
        // Contenido para el Pokémon individual
    );
};
export default PokeCardDetail;
