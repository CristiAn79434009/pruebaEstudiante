'use strict'

const express=require('express')
const Estudiantecrtl=require('../controladores/estudiante')//exportando el controlador
const api=express.Router()


////rutas////////////////////////////////direcciones para estudiantes
//estudiante 
api.get('/estudiante',Estudiantecrtl.getEstudiantes)
//busqueda de estudiante por id
///estudiante
api.get('/estudiante/:estudianteId',Estudiantecrtl.getEstudiante)
//registrar estudiante
api.post('/estudiante',Estudiantecrtl.saveEstudiante)

//editar estudiante
api.put('/estudiante/:estudianteId',Estudiantecrtl.updateEstudiante)
//funcion para eliminar estudinate por el id
api.delete('/estudiante/:estudianteId',Estudiantecrtl.deletEstudiante)
//////////////////////////////////////////////////



module.exports=api