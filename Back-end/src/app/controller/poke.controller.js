const axios = require('axios');
const User = require('../models/user');
const jwt= require('jsonwebtoken')

exports.list = async function (req, res) {
    try {

        let respuesta = '';


        respuesta = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`);
        const resultados = respuesta.data.results;
        for (const result of resultados) {

            const pokemonNumber = result.url.split('/').filter(Boolean).pop();

            const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonNumber}.png`;

            result.image = imageUrl;
            result.number = pokemonNumber
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
        const { pokeID } = req.query
        const detailsResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokeID}`);
        const types = detailsResponse.data.types.map(type => type.type);
        console.log(types)
        res.status(200).send(types)
    } catch (e) {
        console.log(e)
        res.status(404).send(e)
    }
}


exports.login = async function (req, res) {
    try {
        const { username, password } = req.body;

        const users = await User.find({ 'username': username }).lean();
        console.log('Usuarios:', users);

        if (!users || users.length === 0) {
            console.error('Credenciales incorrectas');
            return res.status(401).send({ status: false, message: 'Credenciales incorrectas' });
        }

        const user = users.find(user => user.username === username && user.password === password);

        if (!user) {
            console.error('Credenciales incorrectas');
            return res.status(401).send({ status: false, message: 'Credenciales incorrectas' });
        }

        var privateKey = 'adalab';
        var token = jwt.sign({ user: user.username }, privateKey);
        res.status(200).send({ status: true, message: 'Inicio de sesión exitoso', user: user.username, token: token });
    } catch (e) {
        console.error(e);
        res.status(500).send({ status: false, message: 'Error interno del servidor' });
    }
}



exports.register = async function (req, res) {
    try {
        const { username, password } = req.body;

        const existingUser = await User.findOne({ 'username': username });

        if (existingUser) {
            console.error('El usuario ya existe');
            return res.status(400).send({ status: false, message: 'El usuario ya existe' });
        }

        const newUser = new User({
            username: username,
            password: password,
        });

        await newUser.save();

        res.status(200).send({ status: true, message: 'Registro exitoso', user: username });
    } catch (e) {
        console.error(e);
        res.status(500).send({ status: false, message: 'Error interno del servidor' });
    }
}

