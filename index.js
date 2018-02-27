const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
//const routes = require('./routes/api');

//setup express app
const app = express();

//connect to mongodb
mongoose.connect('mongodb://localhost/ninjago');
//mongoose.connect('mongodb://test:test@ds247078.mlab.com:47078/ninjago');
mongoose.Promise = global.Promise;

app.use(express.static('public'));

app.use(bodyParser.json());

//initialize routes
app.use('/api',require('./routes/api'));

//error handling middle ware
app.use(function(err,req,res,next){
  console.log(err);
  res.status(422).send({error: err.message});
});

app.get('/api',function(req,res){
  console.log('GET requets');
  res.send({name: 'yoshi'});
});

//listen for requests
app.listen(process.env.port || 4000,function(){
  console.log('now listening for requests');
});
