//Part of Node.JS stack, express is like a mini stack.
const express = require('express');

//Routes import the path file routes config 
const routes = require('./routes');

//Instance express app
const app = express();

//Use json
app.use(express.json());

//Use the importes routes
app.use(routes);

//Set port
app.listen(3333);
