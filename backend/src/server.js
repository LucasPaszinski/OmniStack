//Part of Node.JS stack, express is like a mini stack.
const express = require('express');

//Allows and deny user to acess backend
const cors = require('cors');

//Helps to path
const path = require('path');

//Routes import the path file routes config 
const routes = require('./routes');

//Communication Protocol Socket.io
const socket = require('socket.io');

//Comunication protocol Http
const http = require('http');

//Instance express app
const app = express();

// Define server dividind it from express
const server = http.Server(app);
// Allow server to listen web socket.io 
const io = socket(server);

const connectedUser = {};

io.on('connection', socket => {


    const { user_id } = socket.handshake.query
    connectedUser[user_id] = socket.id;

    console.log(`Usuario ${user_id} conectado usando o socket id: ${socket.id} `);


    // //Sendind data
    // socket.emit('Hello','is it me you looking for');      

    // //Receiving data
    // socket.on('World', data => {
    //     console.log(data);
    // })

});

// Isso adiciona o io em todas as requisições do node
app.use((req, res, next) => { 
    req.io = io;
    req.connectedUser = connectedUser;

    return next();

});


app.use(cors());

//Use json
app.use(express.json());

//files 
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));


//Use the importes routes
app.use(routes);

//Set port now with server http and websocket
server.listen(3333);