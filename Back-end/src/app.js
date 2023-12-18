const express = require('express');
const mongoose = require('mongoose');
const User = require('./app/models/user');
const app = express();
const port = 3000;
const cors = require('cors');
app.use(express.json());
// Configurar dotenv para cargar variables de entorno
require('dotenv').config();

app.use(cors());
console.log = function() {};
console.error = function() {};
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.once('open', () => {
  db.useDb('Pokeapi'); // Cambia a la base de datos "Pokeapi"
  console.log(`Conexión exitosa a la base de datos: ${db.name}`);
  // Resto de tu código
});


// Rutas y lógica de tu aplicación
app.get('/', (req, res) => {
  res.send('¡Hola, mundo!');
});
app.use('/api/v1/pokelist', require('./app/route/pokelist.route'));

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
