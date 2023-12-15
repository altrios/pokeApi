const axios = require('axios');

exports.list = async function (req, res) {
    try {

        let respuesta = '';


        respuesta = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`);
        const resultados = respuesta.data.results;
        for (const result of resultados) {

            const pokemonNumber = result.url.split('/').filter(Boolean).pop();

            const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonNumber}.png`;

            result.image = imageUrl;
            result.number=pokemonNumber
        }
        

        const datos = respuesta.data;
        res.status(200).send(datos);
    } catch (e) {
        console.error(e);
        res.status(400).send(e);
    }
};

exports.pokeData = async function (req, res) {
    try {
        const {pokeID}=req.query
        const detailsResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokeID}`);
        const types = detailsResponse.data.types.map(type => type.type);
        console.log(types)
        res.status(200).send(types)
    } catch (e) {
        console.log(e)
        res.status(404).send(e)
    }
}