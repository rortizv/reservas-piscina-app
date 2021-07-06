const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const apiRouter = require('./routes/api');

const app = express();

app.use(cors());

app.get('/reservas/:id_reserva', function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for all origins!'})
})

require('./db');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', apiRouter);

app.listen(3000, () => {
    console.log('Servidor corriendo en puerto 3000');
});