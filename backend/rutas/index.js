'use strict'

const express=require('express')
const Usercrtl=require('../controles/usercrtl')//exportando el controlador
const Materiacrtl=require('../controles/materiascrtl')
const Gestioncrtl=require('../controles/gestioncrtl')
const Ingresocrtl=require('../controles/logincrtl')
const Subircrtl=require('../controles/subir _archivos')
const pruebas=require('../controles/pruebas')

const authUs=require('../middlewares/authUsers')
// const Materia=require('../modelos/Materias')


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
//ver todos los usuarios 
api.get('/users',authUs,Usercrtl.getUsers)
//usuarios de la ultimagestion
api.get('/usersG',authUs,Usercrtl.getUsersges)
//muestra catidades de usuarios por rol de la ultima gestion creada
api.get('/usercant',authUs,Usercrtl.cant)
//busqueda de user por id //NO CE USA
api.get('/user/:userId',Usercrtl.getUser)
//registrar usuario individualmente
api.post('/user',Usercrtl.saveUser)
//mostrar los usuarios de la ultia gestion(estudiantes,docentes,admin)
api.get('/usersGE',authUs,Usercrtl.getUsE)
api.get('/usersGD',authUs,Usercrtl.getUsD)
api.get('/usersGA',authUs,Usercrtl.getUsA)
//FUNCIONES PARA eliminar usuarios
api.get('/deleteU/:id',authUs,Usercrtl.deletU)
//Edicion
//devuelve user  que queremos editar
api.get('/vereditU/:id',authUs,Usercrtl.verEdit)
//realiza la edicion del user////////////////////
api.post('/editU/:id',Usercrtl.updateUser)
//cambia el estado del pago
api.get('/turn/:id',authUs,Usercrtl.pagoU)
//////////////////////////////////////////////////////////////////////////   


////------<<<<<<<<<<<<<<<<<<<<<<sube barios datos a la base de datos
api.post('/user1',Usercrtl.User)//este para guardar varios datos del excel
// api.post('/mostrar1',Usercrtl.mostar)
//<<<<<<_----------------  ruta para subir archivos ------------->>>>>>
api.post('/subir',upload.single('file'),Subircrtl.saveArchivo)//1ro
api.post('/subir1',Subircrtl.save)//este se usa para subir un archivo excel
/////////////////////////////////////////////////////////////////7
api.post(`/output`,Subircrtl.mostrar)


//<<<<<<_----------------  rutas de materias ------------->>>>>>
//ver todos las materias
api.get('/materias',authUs,Materiacrtl.getMaterias)
//busqueda de dmateria por id 
api.get('/materia/:materiaId',authUs,Materiacrtl.getMateria)
//registrar nueva materia
api.post('/materia',Materiacrtl.saveMateria)
//eliminar_materia
 api.get('/delete/:id',authUs,Materiacrtl.deletMateria)
//devuelve la tarea que queremos editar
api.get('/veredit/:id',authUs,Materiacrtl.verEdit)
//realiza la edicion de la materia
api.post('/edit/:id',Materiacrtl.updateMateria)
//muestra las materias de la gestion actual o ultima gestion cursante
api.get('/VMG',authUs,Materiacrtl.getmateriasG)
///////////////////////////////////////////////////////////////////


//<<<<<<_----------------  rutas de gestion ------------->>>>>>
//ver todos las gestiones                                       
api.get('/gestiones',authUs,Gestioncrtl.getGestiones)
//busqueda de gestion por id 
api.get('/gestion/:gestionId',authUs,Gestioncrtl.getGestion)
//registrar docente
api.post('/gestion',Gestioncrtl.saveGestion)
//editar director por id
api.put('/gestion/:gestionId',Gestioncrtl.updateGestion)
//eliminar director por el id
api.delete('/gestion/:gestionId',authUs,Gestioncrtl.deletGestion)
//cierre de gestion
api.post('/closeGestion',Gestioncrtl.cierreGestion)
//////////////////////////////////////////////////////////////////



//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>login<<<<<<<<<<<<<<<<<<<<<<<<<<<
api.post('/signin',Ingresocrtl.ingreso)//logeo
/////////////////////////////////////////////////////////

//registrar user
//api.post('/signup',Estudiantecrtl.registroEst)//registro/
// api.post('/signin',Ingresocrtl.ingreso)//ingresar
// api.post('/decode',Usercrtl.decode)//decodificador

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