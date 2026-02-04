const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

const app = express();

// logs
const logStream = fs.createWriteStream(
  path.join(__dirname, 'logs/access.log'),
  { flags: 'a' }
);

app.use(morgan('combined', { stream: logStream }));
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.set('view engine', 'ejs');

app.use('/', require('./routes/libros'));
app.use('/', require('./routes/prestamos'));

app.listen(3000, () => {
  console.log('Servidor en http://localhost:3000');
});
