//Import express
const express = require('express');
const multer = require('multer');

//IMport mongose
const mongoose = require('mongoose');

//Import Controller
const SessionController = require('./controllers/SessionController');
const SpotController = require('./controllers/SpotController');
const DashBoardController = require('./controllers/DashBoardController');
const BookingController = require('./controllers/BookingController');

const uploadConfig = require('./config/upload');

//Gets router instance
const routes = express.Router();
const upload = multer(uploadConfig);

//Connect to mongoose
mongoose.connect("mongodb+srv://paszinski:banjiro19@omnistack-ntfwp.mongodb.net/sessions?retryWrites=true&w=majority",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
});

//Post on user path
routes.post('/sessions',SessionController.store);

//Post on user path
routes.post('/spots', upload.single('thumbnail'), SpotController.store);
routes.get('/spots', SpotController.index);
routes.get('/dashboard', DashBoardController.show);
routes.post('/spots/:spot_id/bookings', BookingController.store);

module.exports = routes;