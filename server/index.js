// Incluir las librerias necesarias
const path = require('path');
const express = require('express');
const http = require('http');
const SocketIo = require('socket.io');
const app = express();
const SerialPort = require('serialport');
const server = http.createServer(app);
const io = SocketIo.listen(server);

// Rutas existentes
app.get('/', (req, res) => {
  res.sendFile(__dirname +'/index.html');
});

app.get('/graf', (req, res) => {
  res.sendFile(__dirname +'/grafica.html');
});

// static files
app.use(express.static(path.join(__dirname, 'public')));

// Crear e inicializar el dispositivo serial
const Readline = SerialPort.parsers.Readline;
const mySerial = new SerialPort('COM3', {
  baudRate: 9600,
});

// Asegurar que se lea cada linea completa hasta el fin de linea
const parser = new Readline();
mySerial.pipe(parser);

// Verificar comunicacion con el dispositivo
mySerial.on('open', function () {
  console.log('Opened Port.');
});

// Hacer cada vez que llegue un dato serial
parser.on('data', function (data) {
  console.log(data.toString());
  io.emit('arduino:data', {
    value: data.toString()
  });
});

// Mostar mensaje de error si hay problemas con la conexion
mySerial.on('err', function (data) {
  console.log(err.message);
});

server.listen(8000, () => {
  console.log('Server on port 8000');
});
