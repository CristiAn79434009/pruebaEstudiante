'use strict'

const mongoose=require('mongoose')
const Schema=mongoose.Schema

const GestionSchema=Schema({
    nombre:{type:String,required:true,unique:true},
    // anio:{type:Number,required:true},
})
module.exports= mongoose.model('gestion',GestionSchema)