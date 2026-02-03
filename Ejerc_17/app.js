const express = require('express');
const path = require('path');
const morgan = require('morgan');
const fs = require('fs');

const app = express();

// Morgan a archivo
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, 'access.log'),
  { flags: 'a' }
);
app.use(morgan('combined', { stream: accessLogStream }));

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Motor de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Rutas
app.get('/', (req, res) => {
  res.render('index');
});

app.use('/albumes', require('./album/album.routes'));
app.use('/artistas', require('./artista/artista.routes'));

// Servidor
app.listen(3000, () => {
  console.log('Servidor en http://localhost:3000');
});
