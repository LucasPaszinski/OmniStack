//Import express
const express = require("express");
const multer = require("multer");

//IMport mongose
const mongoose = require("mongoose");

//Import Controller
const SessionController = require("./controllers/SessionController");
const SpotController = require("./controllers/SpotController");
const DashBoardController = require("./controllers/DashBoardController");
const BookingController = require("./controllers/BookingController");
const ApprovalController = require("./controllers/ApprovalController");
const RejectionController = require("./controllers/RejectionController");

const uploadConfig = require("./config/upload");

//Gets router instance
const routes = express.Router();
const upload = multer(uploadConfig);



if (false) {
  const password = require("./senhas.json");
  const { server_password } = password;
  //Connect to mongoose
  mongoose.connect(
    `mongodb+srv://paszinski:${server_password}@omnistack-ntfwp.mongodb.net/sessions?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  );
} else {
  //Connect to mongoose
  mongoose.connect(`mongodb://localhost:27017/aircnc`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
}

//Post on user path
routes.post("/sessions", SessionController.store);
routes.get("/sessions/", SessionController.index);

//Post on user path
routes.post("/spots", upload.single("thumbnail"), SpotController.store);
routes.get("/spots", SpotController.index);
routes.get("/dashboard", DashBoardController.show);
routes.post("/spots/:spot_id/bookings", BookingController.store);
routes.post("/booking/:booking_id/approvals", ApprovalController.store);
routes.post("/booking/:booking_id/rejections", RejectionController.store);

module.exports = routes;
