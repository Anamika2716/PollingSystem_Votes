var express = require('express');
var path = require('path');
var mongoose=require('mongoose');

var optionsRouter = require('./routes/options');
var questionRouter = require('./routes/questions');

var app = express();

//connect db
const db=require('./config/mongoose');
const port=8000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//set router

app.use('/options', optionsRouter);
app.use('/questions', questionRouter);

//listen to port
app.listen(port, function (err) {
    if(err)
    {
        console.log(`Error in running the serve: ${port}`);
    }
    console.log(`Server is running on port: ${port}`);
});
module.exports = app;
