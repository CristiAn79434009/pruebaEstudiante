'use strict'

const express=require('express')
const Estudiantecrtl=require('../controladores/estudiante')//exportando el controlador
// const usercrtl=require('../controladores/user')
const AdmcrtlGes=require('../controladores/admiGes')
const AdmcrtlMat=require('../controladores/adminMat')
const AdmcrtlUs=require('../controladores/adminUser')

const Userscrtl=require('../controladores/user')

// const fetch = require('node-fetch')
const api=express.Router()


///rutas////////////////////////////////direcciones para estudiantes
//estudiante 
api.get('/login',Estudiantecrtl.inicio)
////////////////7
api.post('/ingreso',Estudiantecrtl.ingreso)
//////
api.get('/ver',Estudiantecrtl.authestudiante1)
//////GESTION
api.get('/gestion',AdmcrtlGes.index)
api.post('/crearG',AdmcrtlGes.crearG)
api.post('/closeGes',AdmcrtlGes.cerrarGestion)
api.get('/listG',AdmcrtlGes.listarG)
///////mMATERIAS
api.get('/indexM',AdmcrtlMat.index)
api.post('/crearM',AdmcrtlMat.crearMat)
api.get('/listM',AdmcrtlMat.listMa)
api.get('/delMa/:id',AdmcrtlMat.deleteMat)//ELIMINAR MATERIA
api.get('/editar/:id',AdmcrtlMat.editMat)//que tarea editara
api.get('/ver1',AdmcrtlMat.ver)//renderiza el formulario
api.post('/actualizar/:id',AdmcrtlMat.actualizarMat)
////Users
api.get('/indexU',AdmcrtlUs.index)//primera pagina 
api.get('/formUs',AdmcrtlUs.formularioU)//formulario
api.post('/crearU',AdmcrtlUs.postUs)
api.get('/editarU/:id',AdmcrtlUs.editU)//que tarea editara
api.get('/visU',AdmcrtlUs.verU)//renderiza el formulario
api.post('/actualizarU/:id',AdmcrtlUs.actualizarUs)
api.get('/estado/:id',AdmcrtlUs.pagoU)
//admin
api.get('/indexA',AdmcrtlUs.indexAdm)
api.get('/userlistA',AdmcrtlUs.usersGA)
api.get('/formA',AdmcrtlUs.formAdm)
api.get('/delUA/:id',AdmcrtlUs.deleteA)//ELIMINAR user
//////docentes
api.get('/indexD',AdmcrtlUs.indexDoc)
api.get('/userlistD',AdmcrtlUs.usersGDoc)
api.get('/formD',AdmcrtlUs.formDoc)
api.get('/delUD/:id',AdmcrtlUs.deleteD)//ELIMINAR user
///estudiantes
api.get('/indexE',AdmcrtlUs.indexEst)
api.get('/userlistE',AdmcrtlUs.usersGEst)
api.get('/formE',AdmcrtlUs.formEst)
api.get('/delUE/:id',AdmcrtlUs.deleteE)//ELIMINAR user
/////
api.get('/users',Userscrtl.indexUser)
api.post('/usersSend',Userscrtl.save)
api.post('/sendBD',Userscrtl.userSend)
api.post('/crear',Userscrtl.crear)




// ////busqueda de estudiante por id
// ///estudiante
// api.get('/api/estudiante/:estudianteId',Estudiantecrtl.saveEstudiante)

// //registrar estudiante
// api.post('/ingreso',Estudiantecrtl.ingreso)
////////////////////////////
// api.get('/private',auth, function(req,res){
//     res.status(200).send({message:'tienes acceso'})
// })



module.exports=api