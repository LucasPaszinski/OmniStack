//Part of Node.JS stack, express is like a mini stack.
const express = require('express');

//Allows and deny user to acess backend
const cors = require('cors');

//Helps to path
const path = require('path');

//Routes import the path file routes config 
const routes = require('./routes');

//Instance express app
const app = express();

app.use(cors());

//Use json
app.use(express.json());

//files 
app.use('/files', express.static(path.resolve(__dirname,'..','uploads')));


//Use the importes routes
app.use(routes);

//Set port
app.listen(3333);