'use strict'
const express=require('express')
const bodyParser=require('body-parser')//parsear_datos_que se nos envie
const app=express()
const api=require('./rutas/index')
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())//tenerlos en json
app.use('/',api)
module.exports=app