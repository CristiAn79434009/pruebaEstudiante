//aterias que tendran laboratorio
'use strict'

const mongoose=require('mongoose')
const Schema=mongoose.Schema

const MateriasSchema=Schema({
    nombre:{type:String,required:true},
    sigla:{type:String,required:true},
    grupo:{type:Number,required:true},
    gestion:{type:String,default:'no tiene gestion'}
})
module.exports= mongoose.model('materias',MateriasSchema)