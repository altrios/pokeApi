const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;
const cors = require('cors');
app.use(express.json());
// Configurar dotenv para cargar variables de entorno
require('dotenv').config();

app.use(cors());

// Conectar a la base de datos MongoDB utilizando la variable de entorno
mongoose.connect(process.env.MONGODB_URI);

// Verificar la conexión a la base de datos
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
db.once('open', () => {
  console.log('Conexión exitosa a MongoDB');
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
