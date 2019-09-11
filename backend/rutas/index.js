'use strict'

const express=require('express')
const Usercrtl=require('../controles/usercrtl')//exportando el controlador
const Materiacrtl=require('../controles/materiascrtl')
const Gestioncrtl=require('../controles/gestioncrtl')
const Ingresocrtl=require('../controles/ingreso')
const Subircrtl=require('../controles/subir _archivos')
const pruebas=require('../controles/pruebas')

const authUs=require('../middlewares/authUsers')
const Materia=require('../modelos/Materias')


const api=express.Router()


/////esto para subir cualquier archivo
const path = require('path');
const multer =require('multer');

let storage =multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,'./archivos')
    },
    filename:(req,file,cb)=> {
        cb(null,file.fieldname + '-'+ Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({storage});

/////--------------------


//<<<<<<_----------------  rutas de users ------------->>>>>>
//ver todos los users 
api.get('/users',Usercrtl.getUsers)
//busqueda de user por id //NO CE USA
api.get('/user/:userId',Usercrtl.getUser)
//registrar user
api.post('/user',Usercrtl.saveUser)
//editar user por id//NO CE USA
// api.put('/user/:userId',Usercrtl.updateUser)//
//eliminar user por el id//NO CE USA
// api.delete('/user/:userId',Usercrtl.deletUser)//
//mostrar los usuarios de la ultia gestion(estudiantes,docentes,admin)
api.get('/usersGE',Usercrtl.getUsE)
api.get('/usersGD',Usercrtl.getUsD)
api.get('/usersGA',Usercrtl.getUsA)
//FUNCIONES PARA eliminar usuarios
api.get('/deleteU/:id',Usercrtl.deletU)
//Edicion
//devuelve user  que queremos editar
api.get('/vereditU/:id',Usercrtl.verEdit)
//realiza la edicion del user////////////////////
api.post('/editU/:id',Usercrtl.updateUser)
//cambia el estado del pago
api.get('/turn/:id',Usercrtl.pagoU)
   


////------
api.get('/user1',Usercrtl.User)
api.post('/mostrar1',Usercrtl.mostar)

//<<<<<<_----------------  rutas de materias ------------->>>>>>
//ver todos los director 
api.get('/materias',Materiacrtl.getMaterias)
//busqueda de director por id 
api.get('/materia/:materiaId',Materiacrtl.getMateria)
//registrar docente
api.post('/materia',Materiacrtl.saveMateria)
//editar director por id
// api.put('/materia/:materiaId',Materiacrtl.updateMateria)
// //eliminar director por el id
// api.delete('/deletemat/:materiaId',Materiacrtl.deletMateri)
//------------------------------eliminar_materia
 api.get('/delete/:id',Materiacrtl.deletMateria)
//devuelve la tarea que queremos editar
api.get('/veredit/:id',Materiacrtl.verEdit)
//realiza la edicion de la tarea////////////////////
api.post('/edit/:id',Materiacrtl.updateMateria)
//otra
api.get('/VMG',Materiacrtl.getmateriasG)
//<<<<<<_----------------  rutas de gestion ------------->>>>>>
//ver todos los director 
api.get('/gestiones',Gestioncrtl.getGestiones)
//busqueda de director por id 
api.get('/gestion/:gestionId',Gestioncrtl.getGestion)
//registrar docente
api.post('/gestion',Gestioncrtl.saveGestion)
//editar director por id
api.put('/gestion/:gestionId',Gestioncrtl.updateGestion)
//eliminar director por el id
api.delete('/gestion/:gestionId',Gestioncrtl.deletGestion)
//cierre de gestion
api.post('/closeGestion',Gestioncrtl.cierreGestion)

//<<<<<<_----------------  ruta para subir archivos ------------->>>>>>
api.post('/subir',upload.single('file'),Subircrtl.saveArchivo)//1ro
api.post('/subir1',Subircrtl.save)
////////////////////////pruebas///
api.get('/pru',pruebas.getpruebages)


//////////////////////////////////////////////////
//registrar user
//api.post('/signup',Estudiantecrtl.registroEst)//registro/
api.post('/signin',Ingresocrtl.ingreso)//ingresar

// ///para el usuario desde aqui ruta sin controlador
api.get('/private',authUs, function(req,res){
    // let directorId =req.director
    // Director.findById(directorId,(err,direc)=>{
    //     console.log(direc)
    //     if(err)return res.status(500).send({message:`error en la peticion: ${err}`})
    //     if(!direc)return res.status(404).send({message:`el director no existe`})
    //     if(direc.rol!='director')return res.status(404).send({message:`usted no es director para estar aqui`})

    //     res.status(200).send({direc})
    // })
    // let directorId =req.director
    //  console.log(directorId)
    res.status(200).send({message:'tienes acceso'})
})



module.exports=api