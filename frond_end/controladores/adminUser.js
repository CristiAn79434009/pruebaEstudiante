'use strict'
const fetch = require('node-fetch')
//pagina principal de creacion de materiass
function index(req,res){
    fetch('http://localhost:3000/api/gestiones')
    .then(rest => rest.json())
    .then(rest => {
        // console.log(rest)
        //si existe una gestion programada recientemente
        if(rest.message==undefined){
            //si existen materias programadas en la gestion
            fetch('http://localhost:3000/api/VMG')
            .then(resp => resp.json())
            .then(resp =>{
                // console.log(resp)
                if(resp.message==undefined){res.render('./users/doc1')}
                else{res.render('./users/user2')}
            });
        //para que pueda crear gestiones  
        }else{
            res.render('./users/user1')
        }
    })
    .catch(error => console.error('Error:', error))
}
//formulario para cualquier usuario
function formularioU(req,res){
    res.render('users/user4Form')
}
//Crear user en la BD (estu,docen,admin)
function postUs(req,res){
if(req.body.rol=='estudiante'){
    var user = {
        ci: req.body.ci,
        ru: req.body.ru,
        rol:req.body.rol,
        materia_1:req.body.m1,Gmateria_1:req.body.mg1,
        materia_2:req.body.m2,Gmateria_2:req.body.mg2,
        materia_3:req.body.m3,Gmateria_3:req.body.mg3,
        materia_4:req.body.m4,Gmateria_4:req.body.mg4,
        materia_5:req.body.m5,Gmateria_5:req.body.mg5,
        materia_6:req.body.m6,Gmateria_6:req.body.mg6,
        materia_7:req.body.m7,Gmateria_7:req.body.mg7,
    }
}
if(req.body.rol=='docente'){
    var user = {
        nombre:req.body.nombre,
        apellido:req.body.apellido,
        ci: req.body.ci,
        rol:req.body.rol,
        materia_1:req.body.m1,Gmateria_1:req.body.mg1,
        materia_2:req.body.m2,Gmateria_2:req.body.mg2,
        materia_3:req.body.m3,Gmateria_3:req.body.mg3,
        materia_4:req.body.m4,Gmateria_4:req.body.mg4,
    }
}
if(req.body.rol=='administrador'){
    var user = {
        username:req.body.username,
        password:req.body.password,
        ci: req.body.ci,
        rol:req.body.rol,
    }
}
    
// console.log(user)
    const esto={
        method: 'POST', 
        body: JSON.stringify(user), 
        headers:{
            'Content-Type': 'application/json'
        }
    }
    fetch('http://localhost:3000/api/user',esto)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        if(data.userGuardado.rol=='administrador'){res.redirect('userlistA')}
        if(data.userGuardado.rol=='docente'){res.redirect('userlistD')}
        if(data.userGuardado.rol=='estudiante'){res.redirect('userlistE')}
        // res.redirect('')
        // fetch('http://localhost:3000/api/VMG')
        // .then(resp => resp.json())
        // .then(resp =>{
        //     // console.log(data,resp)
        //     res.render('./materias/materia3',{resp,data});
        // });
        
    })
    .catch(error => console.error('Error:', error))
  
}
///ADMINISTRADORES
//PAGINA PRINCIPAL DE ADMIN
function indexAdm(req,res){
    fetch('http://localhost:3000/api/gestiones')
    .then(rest => rest.json())
    .then(rest => {
        // console.log(rest)
        //si existe una gestion programada recientemente
        if(rest.message==undefined){
            //si existen materias programadas en la gestion
            fetch('http://localhost:3000/api/VMG')
            .then(resp => resp.json())
            .then(resp =>{
                // console.log(resp)
                if(resp.message==undefined){res.render('./users/adm1')}
                else{res.render('./users/user2')}
            });
        //para que pueda crear gestiones  
        }else{
            res.render('./users/user1')
        }
    })
    .catch(error => console.error('Error:', error))
}
//LISTA DE Users Administradores
function usersGA (req,res){
    fetch('http://localhost:3000/api/usersGA')
    .then(resp => resp.json())
    .then(resp =>{
        console.log(resp)
            if(resp.message==undefined){
                res.render('./users/adm3list',{resp})
            }else{
                res.render('./users/adm1')
            }
    });
}
//muestra el formulario de admin
function formAdm(req,res){
    res.render('./users/adm2form')
}
///opcion eliminar
function deleteA (req, res) {
    var delT = req.params.id //resiviendo el id de la tarea
    fetch('http://localhost:3000/api/deleteU/'+delT)
    .then(rest=> rest.json())
    .catch(error => console.error('Error:', error))
    .then(rest =>{
        console.log(rest)
        res.redirect('/userlistA')
    });
}
//para saver que USUARIO EDITAR editar//////////////////////////////////////////////////////
var OnlyUs
function editU (req, res) {
    var editT = req.params.id //resiviendo el id de la materia
    // res.redirect('/ver1',editT)
    fetch('http://localhost:3000/api/vereditU/'+editT)
    .then(resp => resp.json())
    .catch(error => console.error('Error:', error))
    .then(resp =>{
        OnlyUs=resp
        res.redirect('/visU')
    });
}
//renderiza un formulario para editar
function verU(req,res){
    // console.log(OnlyUs)
    // if(OnlyMat==undefined){res.redirect('/listM')}
    if(OnlyUs.msn.rol=='administrador'){res.render('users/adminedit',{OnlyUs})}
    if(OnlyUs.msn.rol=='docente'){res.render('users/docEdit',{OnlyUs})}
    if(OnlyUs.msn.rol=='estudiante'){res.render('users/estEdit',{OnlyUs})}
 
} 

////edita el user enviando los nuevos datos
function actualizarUs(req,res){
    var actT=req.params.id//resive el id de la materia

    if(req.body.rol=='administrador'){
        var user={
        rol:req.body.rol,
        username:req.body.username,
        password:req.body.password,
        ci:req.body.ci
    }}
    if(req.body.rol=='docente'){
        var user = {
            // nombre:req.body.nombre,
            // apellido:req.body.nombre,
            rol:req.body.rol,
            username:req.body.nombre+req.body.apellido,
            ci: req.body.ci,
            materia_1:req.body.m1,Gmateria_1:req.body.mg1,
            materia_2:req.body.m2,Gmateria_2:req.body.mg2,
            materia_3:req.body.m3,Gmateria_3:req.body.mg3,
            materia_4:req.body.m4,Gmateria_4:req.body.mg4,
        }
    }
    if(req.body.rol=='estudiante'){}
        var user={
            ci: req.body.ci,
            ru: req.body.ru,
            rol:req.body.rol,
            materia_1:req.body.m1,Gmateria_1:req.body.mg1,
            materia_2:req.body.m2,Gmateria_2:req.body.mg2,
            materia_3:req.body.m3,Gmateria_3:req.body.mg3,
            materia_4:req.body.m4,Gmateria_4:req.body.mg4,
            materia_5:req.body.m5,Gmateria_5:req.body.mg5,
            materia_6:req.body.m6,Gmateria_6:req.body.mg6,
            materia_7:req.body.m7,Gmateria_7:req.body.mg7,
        }
    console.log(req.body)
    const esto={
          method: 'POST', 
          body: JSON.stringify(user), 
          headers:{
              'Content-Type': 'application/json'
          }
    }
    fetch('http://localhost:3000/api/editU/'+actT,esto)
        .then(resp => resp.json())
        .catch(error => console.error('Error:', error))
        .then(resp =>{
            console.log(resp)
            if(resp.rol=='administrador'){res.redirect('/userlistA')}
            if(resp.rol=='docente'){res.redirect('/userlistD')}
            if(resp.rol=='estudiante'){res.redirect('/userlistE')}
        });
}
///////////////////////////////////////////////////////////////////////////////////////////////
//////DOCENTES
//PAGINA PRINCIPAL DE DOCENTES
function indexDoc(req,res){
    fetch('http://localhost:3000/api/gestiones')
    .then(rest => rest.json())
    .then(rest => {
        // console.log(rest)
        //si existe una gestion programada recientemente
        if(rest.message==undefined){
            //si existen materias programadas en la gestion
            fetch('http://localhost:3000/api/VMG')
            .then(resp => resp.json())
            .then(resp =>{
                // console.log(resp)
                if(resp.message==undefined){res.render('./users/doc1')}
                else{res.render('./users/user2')}
            });
        //para que pueda crear gestiones  
        }else{
            res.render('./users/user1')
        }
    })
    .catch(error => console.error('Error:', error))
}
//LISTA DE Users Docentes
function usersGDoc (req,res){
    fetch('http://localhost:3000/api/usersGD')
    .then(resp => resp.json())
    .then(resp =>{
        console.log(resp)
            if(resp.message==undefined){
                res.render('./users/doc3list',{resp})
            }else{
                res.render('./users/doc1')
            }
    });
}
function formDoc(req,res){
    res.render('./users/doc2form')
}
//ELIMINAR //DOCENTE
function deleteD (req, res) {
    var delT = req.params.id //resiviendo el id de la tarea
    fetch('http://localhost:3000/api/deleteU/'+delT)
    .then(rest=> rest.json())
    .catch(error => console.error('Error:', error))
    .then(rest =>{
        // console.log(rest)
        res.redirect('/userlistD')
    });
}
///ESTUDIANTES
//PAGINA PRINCIPAL DE ESTUDIANTES
function indexEst(req,res){
    fetch('http://localhost:3000/api/gestiones')
    .then(rest => rest.json())
    .then(rest => {
        // console.log(rest)
        //si existe una gestion programada recientemente
        if(rest.message==undefined){
            //si existen materias programadas en la gestion
            fetch('http://localhost:3000/api/VMG')
            .then(resp => resp.json())
            .then(resp =>{
                // console.log(resp)
                if(resp.message==undefined){res.render('./users/student1')}
                else{res.render('./users/user2')}
            });
        //para que pueda crear gestiones  
        }else{
            res.render('./users/user1')
        }
    })
    .catch(error => console.error('Error:', error))
}
//LISTA DE Users Estudiantes
function usersGEst (req,res){
    fetch('http://localhost:3000/api/usersGE')
    .then(resp => resp.json())
    .then(resp =>{
        console.log(resp)
            if(resp.message==undefined){
                res.render('./users/est3list',{resp})
            }else{
                res.render('./users/student1')
            }
    });
}
//FORMULARIO DE Estudiante
function formEst(req,res){
    res.render('./users/est2form')
}
//ELIMINAR ESTUDIANTE
function deleteE (req, res) {
    var delT = req.params.id //resiviendo el id de la tarea
    fetch('http://localhost:3000/api/deleteU/'+delT)
    .then(rest=> rest.json())
    .catch(error => console.error('Error:', error))
    .then(rest =>{
        // console.log(rest)
        res.redirect('/userlistE')
    });
}
//<<<<<<<<cambiar el estado del pago
function pagoU (req, res) {
    var estadoT = req.params.id //resiviendo el id de la tarea
    // console.log(delT)
    fetch('http://localhost:3000/api/turn/'+estadoT)
    .then(resp => resp.json())
    .catch(error => console.error('Error:', error))
    .then(resp =>{
        console.log(resp);
        res.redirect('/userlistE');
    });
}
module.exports={
    index,
    formularioU,
    postUs,
    //adm
    indexAdm,
    usersGA,
    formAdm,
    deleteA,
    editU,
    verU,
    actualizarUs,
    pagoU,
    //docentes
    indexDoc,
    usersGDoc,
    formDoc,
    deleteD,
    //estudiantes
    indexEst,
    usersGEst,
    formEst,
    deleteE

}