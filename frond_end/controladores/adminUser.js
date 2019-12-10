'use strict'
const fetch = require('node-fetch')
// ////login//////////////////////////////////////////////////////////////////////
function inicio(req,res){
    res.render('./login/login')
}
//////desde aqui comienza el login
function ingreso(req, res) { 
    // console.log(req.body)
    if (req.body.username=='' || req.body.password==''){
        res.render('./login/loginerr',{message:'error rrellene los campos vacios'})
    }
    else{
    var user = {
      username: req.body.username,
      password: req.body.password
    }
    const esto={
        method: 'POST', 
        body: JSON.stringify(user), 
        headers:{
            'Content-Type': 'application/json'
        }
    }
    fetch('http://localhost:3000/api/signin',esto)
    .then(data => data.json())
    .then(data => {
        console.log(data)
        if(data.message=='El usuario no existe'||data.message=='usted no pago por el servicio....' || data.message=='no existe gestiones programadas' || data.message=='usted aun no esta registrado'){
            res.render('./login/welcom',{data})
        }
        else{
            data1(data, data.id)
            if(data.rol=='estudiante'){
            res.render('./login/welcomest',{data})
            }
            if(data.rol=='docente'){
            res.render('./login/welcomdoc',{data})
            }
            if(data.rol=='administrador'){    
            res.render('./login/welcom',{data})
            }
           // console.log(datos)
        }
    })
    .catch(error => console.error('Error:', error))
}; 
} 

var datos = {}
function data1 (data, id){
    
    let algo = datos[id];
    // console.log(algo)
    if(!algo){
        algo = datos[id]={
            esto: data,
            qty:0
        };
        
    }
    algo.qty++;
}

function arr1 (){
    var arr =[]
    for (const id in datos){
        arr.push(datos[id])
    }
    return arr;
}

var cabezera//para recuperar el token
//muestra la pagina de bienvenida cargando los scripts necesarios
// function welcom(req, res) {  
//     // res.render('./login/welcom',{data1})
//     // res.render('pruebas')   
//     // console.log(data1)
// }



function token(req,res){
    cabezera=req.headers//recupernado
    // console.log(cabezera)
    //ata1(req.headers, req.headers._id)
}
//dando el acceso a las guias administrador
function home(req,res ){
  
        if(datos[cabezera._id].esto.rol=='administrador'){
            var token=({authorization:`Bearer ${datos[cabezera._id].esto.token}`})
            // console.log(token)
            fetch('http://localhost:3000/api/usercant',{headers:token})
            .then(resp => resp.json())
            .catch(error => console.error('Error:', error))
            .then(resp =>{
                res.render('./users/home',{resp})
                console.log(resp)
            })
        }
        if(datos[cabezera._id].esto.rol=='docente'){
            var token=({authorization:`Bearer ${datos[cabezera._id].esto.token}`})
            // var id1=(datos[cabezera._id].esto.id)
            fetch('http://localhost:3000/api/user/'+datos[cabezera._id].esto.id,{headers:token})
            .then(resp => resp.json())
            .catch(error => console.error('Error:', error))
            .then(resp =>{
                var doc=resp
                // console.log(resp,`aquiiiii`)
                if(resp.message=='exito'){
                    // res.send({resp})
                //     // console.log(doc)
                //     // res.redirect('/homeDOC')
                    res.render('./doc/homedoc',{doc})
                }else{res.send({resp})}
            })
        }
        if(datos[cabezera._id].esto.rol=='estudiante'){
            var token=({authorization:`Bearer ${datos[cabezera._id].esto.token}`})
            fetch('http://localhost:3000/api/user/'+datos[cabezera._id].esto.id,{headers:token})
            .then(resp => resp.json())
            .catch(error => console.error('Error:', error))
            .then(resp =>{
                // console.log(resp)
                var est=resp
                if(resp.message=='exito'){
                    // res.send({resp})
                    // res.redirect('/homeEST')
                    // res.render('./esrstu/homeest',{est})
                    res.render('./estu/homeest',{est})
                }else{res.send({resp})}
            })
        }
}

////ingreso de docentes//////////////////////////////////////////////////////////////////////////

function homedoc(req,res){
    let doc_id = req.params.id
    // console.log(doc_id)

    // var id=cabezera._id
    // console.log(cabezera)
    var token=({authorization:`Bearer ${datos[cabezera._id].esto.token}`})
    fetch('http://localhost:3000/api/user/'+doc_id,{headers:token})
    .then(resp => resp.json())
    .catch(error => console.error('Error:', error))
    .then(resp =>{
        // var user={resp}
        // myHeaders.app('user',` ${resp.user}`)
        // const esto={
        //         // method: 'POST', 
        //         // body: JSON.stringify(resp.user), 
        //         headers:{
        //             // 'Content-Type': 'application/json',
        //             _id:resp.user._id,
        //             rol:resp.user.rol,
        //             materia_1:resp.user.materia_1,
        //             materia_2:resp.user.materia_2,
        //             materia_3:resp.user.materia_3,
        //             materia_4:resp.user.materia_4,
        //             materia_5:resp.user.materia_5,
        //             materia_6:resp.user.materia_6,
        //             materia_7:resp.user.materia_7,
        //             Gmateria_1:resp.user.Gmateria_1,
        //             Gmateria_2:resp.user.Gmateria_2,
        //             Gmateria_3:resp.user.Gmateria_3,
        //             Gmateria_4:resp.user.Gmateria_4,
        //             Gmateria_5:resp.user.Gmateria_5,
        //             Gmateria_6:resp.user.Gmateria_6,
        //             Gmateria_7:resp.user.Gmateria_7,
        //         }
        // }
        // fetch('http://localhost:4000/homeDOC',esto)
        // res.redirect('/homeDOC')
        var doc=resp
        // console.log(myHeaders)
        if(resp.message=='exito'){
            // res.redirect('/homeDOC',{headers:45})
            res.render('./doc/homedoc',{doc})
        }else{res.send({resp})}
    })
}
// function homeD(req,res){
//     var doc=req.headers

//     console.log(req.headers,'aaaaaaaaaaaaaaaa')
// //     // console.log(est.user.mat)
//     // let doc_id = req.params.docId
//     // var doc=datos[doc_id].esto
//     res.render('./doc/home1doc',{doc})
// }
// var est
function homeest(req,res){
    var id=req.params.id
    // console.log(req)
    // console.log(req.params)
    var token=({authorization:`Bearer ${datos[cabezera._id].esto.token}`})
    fetch('http://localhost:3000/api/user/'+id,{headers:token})
    .then(resp => resp.json())
    .catch(error => console.error('Error:', error))
    .then(resp =>{
        // console.log(resp)
        var est=resp
        if(resp.message=='exito'){
            // res.redirect('/homeEST')
            res.render('./estu/homeest',{est})
        }else{res.send({resp})}
    })
}
//renderiza pagina de estudiantes
// function homeE(req,res){
    // console.log(est.user.mat)
    // res.render('./estu/homeest',{est})
// }
///////////////////////////////////////////////////////////////////////////////

//pagina principal de creacion de materiass
function index(req,res){
    if(datos[cabezera._id].esto.rol=='administrador'){
        var token=({authorization:`Bearer ${datos[cabezera._id].esto.token}`})
    fetch('http://localhost:3000/api/gestiones',{
        headers:token
    })
    .then(rest => rest.json())
    .then(rest => {
        // console.log(rest)
        //si existe una gestion programada recientemente
        if(rest.message==undefined){
            //si existen materias programadas en la gestion
           
            fetch('http://localhost:3000/api/VMG',{headers:token})
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
    }else{res.redirect('/login')}
}
//formulario para cualquier usuario---------------------------------------------
function formularioU(req,res){
    res.render('users/user4Form')
}

///ADMINISTRADORES
//PAGINA PRINCIPAL DE ADMIN
function indexAdm(req,res){
    if(datos[cabezera._id].esto.rol=='administrador'){
        var token=({authorization:`Bearer ${datos[cabezera._id].esto.token}`})
    // console.log(req.headers)
    // cabezera=req.headers
    
    fetch('http://localhost:3000/api/gestiones',{headers:token})
    .then(rest => rest.json())
    .then(rest => {
        // console.log(rest,cabezera)
        // si existe una gestion programada recientemente
        if(rest.message==undefined){
            //si existen materias programadas en la gestion
            fetch('http://localhost:3000/api/VMG',{headers:token})
            .then(resp => resp.json())
            .then(resp =>{
                console.log(resp)
                if(resp.message==undefined){res.render('./users/adm1')}
                else{res.render('./users/user2')}
            });
        //para que pueda crear gestiones  
        }else{
            res.render('./users/user1')
        }
    })
    .catch(error => console.error('Error:', error))
    }else{res.redirect('/home')}
}
//LISTA DE Users Administradores
function usersGA (req,res){
    var token=({authorization:`Bearer ${datos[cabezera._id].esto.token}`})
    fetch('http://localhost:3000/api/usersGA',{headers:token})
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
    // console.log(req.headers.authorization)
    var c=req.headers.authorization
    res.render('./users/adm2form',{c})
}
///opcion eliminar
function deleteA (req, res) {
    if(datos[cabezera._id].esto.rol=='administrador'){
        var token=({authorization:`Bearer ${datos[cabezera._id].esto.token}`})
    var delT = req.params.id //resiviendo el id de la tarea
    
    fetch('http://localhost:3000/api/deleteU/'+delT,{headers:token})
    .then(rest=> rest.json())
    .catch(error => console.error('Error:', error))
    .then(rest =>{
        console.log(rest)
        res.redirect('/userlistA')
    });
    }else{res.redirect('/login')}
}
//para saver que USUARIO EDITAR editar//////////////////////////////////////////////////////
var OnlyUs
function editU (req, res) {
    if(datos[cabezera._id].esto.rol=='administrador'){
        var token=({authorization:`Bearer ${datos[cabezera._id].esto.token}`})
    var editT = req.params.id //resiviendo el id de la materia
    // res.redirect('/ver1',editT)
    
    fetch('http://localhost:3000/api/vereditU/'+editT,{headers:token})
    .then(resp => resp.json())
    .catch(error => console.error('Error:', error))
    .then(resp =>{
        OnlyUs=resp
        res.redirect('/visU')
    });
    }else{res.redirect('/login')}
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
    // console.log(req.body)
    const esto={
          method: 'POST', 
          body: JSON.stringify(user), 
          headers:{
              'Content-Type': 'application/json',
              cabezera
          }
    }
    console.log(esto)
    // fetch('http://localhost:3000/api/editU/'+actT,esto)
    //     .then(resp => resp.json())
    //     .catch(error => console.error('Error:', error))
    //     .then(resp =>{
    //         console.log(resp)
    //         if(resp.rol=='administrador'){res.redirect('/userlistA')}
    //         if(resp.rol=='docente'){res.redirect('/userlistD')}
    //         if(resp.rol=='estudiante'){res.redirect('/userlistE')}
    //     });
}
///////////////////////////////////////////////////////////////////////////////////////////////
//////DOCENTES
//PAGINA PRINCIPAL DE DOCENTES
function indexDoc(req,res){
    if(datos[cabezera._id].esto.rol=='administrador'){
        var token=({authorization:`Bearer ${datos[cabezera._id].esto.token}`})
    fetch('http://localhost:3000/api/gestiones',{headers:token})
    .then(rest => rest.json())
    .then(rest => {
        // console.log(rest)
        //si existe una gestion programada recientemente
        if(rest.message==undefined){
            //si existen materias programadas en la gestion
            fetch('http://localhost:3000/api/VMG',{headers:token})
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
}else{res.redirect('/login')}
}
//LISTA DE Users Docentes
function usersGDoc (req,res){
    if(datos[cabezera._id].esto.rol=='administrador'){
        var token=({authorization:`Bearer ${datos[cabezera._id].esto.token}`})
    fetch('http://localhost:3000/api/usersGD',{headers:token})
    .then(resp => resp.json())
    .then(resp =>{
        console.log(resp)
            if(resp.message==undefined){
                res.render('./users/doc3list',{resp})
            }else{
                res.render('./users/doc1')
            }
    });
}else{res.redirect('/login')}
}
function formDoc(req,res){
    res.render('./users/doc2form')
}
//ELIMINAR //DOCENTE
function deleteD (req, res) {
    var delT = req.params.id //resiviendo el id de la tarea
    var token=({authorization:`Bearer ${datos[cabezera._id].esto.token}`})
    fetch('http://localhost:3000/api/deleteU/'+delT,{headers:token})
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
    if(datos[cabezera._id].esto.rol=='administrador'){
        var token=({authorization:`Bearer ${datos[cabezera._id].esto.token}`})
    fetch('http://localhost:3000/api/gestiones',{headers:token})
    .then(rest => rest.json())
    .then(rest => {
        // console.log(rest)
        //si existe una gestion programada recientemente
        if(rest.message==undefined){
            //si existen materias programadas en la gestion
            fetch('http://localhost:3000/api/VMG',{headers:token})
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
}else{res.redirect('/login')}
}
//LISTA DE Users Estudiantes
function usersGEst (req,res){
    if(datos[cabezera._id].esto.rol=='administrador'){
        var token=({authorization:`Bearer ${datos[cabezera._id].esto.token}`})
    
    fetch('http://localhost:3000/api/usersGE',{headers:token})
    .then(resp => resp.json())
    .then(resp =>{
        // console.log(resp)
            if(resp.message==undefined){
                res.render('./users/est3list',{resp})
            }else{
                res.render('./users/student1')
            }
    });
}else{res.redirect('/login')}
}
//FORMULARIO DE Estudiante
function formEst(req,res){
    res.render('./users/est2form')
}
//ELIMINAR ESTUDIANTE
function deleteE (req, res) {
    if(datos[cabezera._id].esto.rol=='administrador'){
        var token=({authorization:`Bearer ${datos[cabezera._id].esto.token}`})
    var delT = req.params.id //resiviendo el id de la tarea
    
    fetch('http://localhost:3000/api/deleteU/'+delT,{headers:token})
    .then(rest=> rest.json())
    .catch(error => console.error('Error:', error))
    .then(rest =>{
        // console.log(rest)
        res.redirect('/userlistE')
    });
}else{res.redirect('/login')}
}
//<<<<<<<<cambiar el estado del pago
function pagoU (req, res) {
    if(datos[cabezera._id].esto.rol=='administrador'){
        var token=({authorization:`Bearer ${datos[cabezera._id].esto.token}`})
    var estadoT = req.params.id //resiviendo el id de la tarea
    // console.log(delT)
    fetch('http://localhost:3000/api/turn/'+estadoT,{headers:token})
    .then(resp => resp.json())
    .catch(error => console.error('Error:', error))
    .then(resp =>{
        console.log(resp);
        res.redirect('/userlistE');
    });
}else{res.redirect('/login')}
}
//Crear user en la BD (estu,docen,admin)
function postUs(req,res){
    if(datos[cabezera._id].esto.rol=='administrador'){
        var token=({authorization:`Bearer ${datos[cabezera._id].esto.token}`})
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
    console.log(req.body)
        const esto={
            method: 'POST', 
            body: JSON.stringify(user), 
            headers:{
                'Content-Type': 'application/json',
                cabezera
            }
        }
        // console.log(esto)
        fetch('http://localhost:3000/api/user',esto,{headers:token})
        .then(res => res.json())
        .then(data => {
            console.log(data,'HOLAAAA');
            // if(data.userGuardado.rol=='administrador'){res.redirect('userlistA')}
            // if(data.userGuardado.rol=='docente'){res.redirect('userlistD')}
            // if(data.userGuardado.rol=='estudiante'){res.redirect('userlistE')}
        })
        .catch(error => console.error('Error:', error))
    }else{res.redirect('/login')}
    }
module.exports={
    // login
    inicio,
    ingreso,
    // welcom,
    token,
    home,
    //
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
    // homeD,
    homedoc,
    //estudiantes
    indexEst,
    usersGEst,
    formEst,
    deleteE,
    cabezera,
    homeest,
    // homeE
}