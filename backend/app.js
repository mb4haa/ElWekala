const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const http = require ('http');



const postRoutes = require('./routes/post');
const userRoutes = require('./routes/user');

const app = express();


// const io = socket(app);

// console.log("hena");
// io.on('connection', (socket) => {
//   console.log("Connected to Socket!!"+ socket.id);
//   // Receiving Todos from client
//   });


mongoose.connect("mongodb://admin:uqGqJcxGQ8AQbcg@ds347467.mlab.com:47467/el-wekala")
.then( () => {
  console.log("Connected to database");
})
.catch( (err) => {
  console.log(err);
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req,res,next) => {
  res.setHeader("Access-Control-Allow-Origin","http://localhost:4200"); // http://localhost:4200  http://distant-office-hours.s3-website.us-east-2.amazonaws.com
  res.header("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Headers","Origin,X-Request-With,Content-Type,Accept, authorization");
  res.setHeader("Access-Control-Allow-Methods","GET,POST,PATCH,DELETE,OPTIONS,PUT")
  next();
});
// --------------------------ROUTES-----------------------------------------------------------------
app.use('/api/posts',postRoutes);
app.use('/api/user',userRoutes);
// app.use('/api/user',signalRoutes);
// --------------------------SIGNALING--------------------------------------------------------------


module.exports = app;
