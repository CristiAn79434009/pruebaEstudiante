'use strict'

const mongoose=require('mongoose')
const Schema=mongoose.Schema

const EstudianteSchema=Schema({
    ru: Number,
    materia_1:{type:String, default:0},
    materia_2:{type:String, default:0},
    materia_3:{type:String, default:0},
    materia_4:{type:String, default:0},
    materia_5:{type:String, default:0},
    materia_6:{type:String, default:0},
    materia_7:{type:String, default:0},
})
module.exports= mongoose.model('estudiante',EstudianteSchema)
