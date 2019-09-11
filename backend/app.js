'use strict'
// const path = require('path');
const express=require('express')
const bodyParser=require('body-parser')
const morgan=require('morgan')
const cors = require('cors')

const app=express()
// var xlsxtojson = require("xlsx-to-json");
// var xlstojson = require("xls-to-json");


app.use(function(req, res, next) { //allow cross origin requests
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header("Access-Control-Max-Age", "3600");
    res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    next();
});
app.use(cors());
const api=require('./rutas/index')

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use(morgan('dev'))

app.use('/api',api)//la inical en todo
module.exports=app
