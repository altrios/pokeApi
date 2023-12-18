const express = require('express');
const mongoose = require('mongoose');
const User = require('./app/models/user');
const app = express();
const port = 3000;
const cors = require('cors');
app.use(express.json());
require('dotenv').config();

app.use(cors());
console.log = function() {};
console.error = function() {};
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.once('open', () => {
  db.useDb('Pokeapi'); 
  console.log(`Conexión exitosa a la base de datos: ${db.name}`);
});


app.get('/', (req, res) => {
  res.send('¡Hola, mundo!');
});
app.use('/api/v1/pokelist', require('./app/route/pokelist.route'));

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
