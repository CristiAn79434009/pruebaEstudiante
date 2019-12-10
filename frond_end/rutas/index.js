'use strict'

const express=require('express')
// const Logincrtl=require('../controladores/login')//exportando el controlador
// const usercrtl=require('../controladores/user')
const AdmcrtlGes=require('../controladores/admiGes')
const AdmcrtlMat=require('../controladores/adminMat')
const AdmcrtlUs=require('../controladores/adminUser')

const Userscrtl=require('../controladores/user')

// const fetch = require('node-fetch')
const api=express.Router()


///rutas////////////////////////////////direcciones para logueo
//login-principal 
api.get('/login',AdmcrtlUs.inicio)
// api.get('/login',Logincrtl.inicio)
////////////////enviando el los datos por el login
api.post('/ingreso',AdmcrtlUs.ingreso)
// api.post('/ingreso',Logincrtl.ingreso)
// api.get('/homeE',Logincrtl.homeest)
// //////PAGINA BIENVENIDA
// api.get('/inicial',AdmcrtlUs.welcom)
api.get('/token',AdmcrtlUs.token)
api.get('/tokeng',AdmcrtlGes.tokeng)
api.get('/tokenm',AdmcrtlMat.tokenm)
//PAGINA INICIAL
api.get('/home',AdmcrtlUs.home)
// api.get('/lo',AdmcrtlUs.cabezera)
//////GESTION//////////////////////
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
api.get('/homeD/:id',AdmcrtlUs.homedoc)
// api.get('/homeDOC',AdmcrtlUs.homeD)
///estudiantes/
api.get('/indexE',AdmcrtlUs.indexEst)
api.get('/userlistE',AdmcrtlUs.usersGEst)
api.get('/formE',AdmcrtlUs.formEst)
api.get('/delUE/:id',AdmcrtlUs.deleteE)//ELIMINAR user
api.get('/homeE/:id',AdmcrtlUs.homeest)
// api.get('/homeEST',AdmcrtlUs.homeE)

////////////////////////////////////importar
//priemera pagina
api.get('/users',Userscrtl.indexUser)
//para guardar los datos en output
api.post('/usersSend',Userscrtl.save)
//aqui valida y muestra lista de repetidos si exiten
api.get('/sendBD',Userscrtl.userSend)
//envia datos
api.post('/registrar',Userscrtl.registrarU)






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