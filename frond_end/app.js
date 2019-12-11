'use strict'
const path = require('path');
const express=require('express')
// const bodyParser=require('body-parser')
//const hbs =require('express-handlebars')
const app=express()
const api=require('./rutas/index')
const cors = require('cors');




// app.use(bodyParser.urlencoded({extended:false}))//parsear
// app.use(bodyParser.json())

app.set('views', path.join(__dirname, 'views'));
///////app.set('ejs', engine);
app.set('view engine', 'ejs');

app.use(express.static("public"));
app.use(express.static("node_modules"));
app.use(express.urlencoded({extended:false}))


app.use(cors());
//------------------------------------
// app.engine('.hbs',hbs ({
//     defaultLayout:'default',
//     extname:'.hbs'
// }))
// app.set('view engine','.hbs')
//------------------------------------
/**
app.get('/login',(req,res)=>{
   res.render('login')
})/** */

app.use('/',api)
// app.get('/',(req,res)=>{
//     res.render('product')
// })
module.exports=app