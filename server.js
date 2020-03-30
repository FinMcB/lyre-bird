const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const path = require('path');
const logger = require('morgan');

const multer  = require('multer') //use multer to upload blob data
const upload = multer(); // set multer to be the upload variable (just like express, see above ( include it, then use it/set it up))
const fs = require('fs'); //use the file system so we can save files


const users = require("./routes/api/users");

const app = express();

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true , useUnifiedTopology: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));


// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes
app.use("/api/users", users);


//////////////////////////sound stuff
app.post('/api/users', upload.single('soundBlob'), function (req, res, next) {
  // console.log(req.file); // see what got uploaded

  let uploadLocation = __dirname + '/audio/audioFiles/' + req.file.originalname // where to save the file to. make sure the incoming name has a .wav extension

  fs.writeFileSync(uploadLocation, Buffer.from(new Uint8Array(req.file.buffer))); // write the blob to the server as a file
  res.sendStatus(200); //send back that everything went ok

})

//serve out any static files in our public HTML folder
// app.use(express.static('/api/users'))




const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server up and running on port ${port} !`));
