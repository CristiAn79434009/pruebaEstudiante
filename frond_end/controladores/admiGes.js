'use strict'
const fetch = require('node-fetch')

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



var cabezera

function tokeng(req,res){
    cabezera=req.headers//recupernado
    if(req.headers.rol=='administrador'){
        data1(req.headers,req.headers._id)
    }else{res.redirect('/login')}

    // console.log(cabezera,'este tken de gestion')
    //ata1(req.headers, req.headers._id)
}
//pagina principal de crear gestiones
function index(req,res){
    
    if(datos[cabezera._id].esto.rol=='administrador'){
        var token=({authorization:`Bearer ${datos[cabezera._id].esto.token}`})
        fetch('http://localhost:3000/api/gestiones',{headers:token})
        .then(res => res.json())
        .then(data => {
            // console.log(data.gestion.length)
            // if(data.gestion[data.gestion.length-1].nombre=='nada'){}
            //si existe una gestion programada recientemente
            if(data.message==undefined){
                
                res.render('./gestiones/gestion2',{data}) 
            // //para que pueda crear gestiones  
            }else{
                res.render('./gestiones/gestion1')
            }
        })
        .catch(error => console.error('Error:', error))
    }else{res.redirect('/login')}
}
////crear gestion enviar datos y recivir mensaje
function crearG(req, res) { 
    if(datos[cabezera._id].esto.rol=='administrador'){
        var token=({authorization:`Bearer ${datos[cabezera._id].esto.token}`})
    var gestion = {
      nombre:req.body.nombre,
    }
    const esto={
        method: 'POST', 
        body: JSON.stringify(gestion), 
        headers:{
            'Content-Type': 'application/json'
        }
    }
    fetch('http://localhost:3000/api/gestion',esto,{headers:token})
    .then(res => res.json())
    .then(data => {
        console.log(data)
        if(data.message=='Nombre de Gestion ya existe...'){
            res.render('./gestiones/gestion1',{data})
            
        }else{ 
            fetch('http://localhost:3000/api/gestiones',{headers:token})
            .then(res => res.json())
            .then(data => {
                //cuando exista una gestion vigente
                if(data.message==undefined){
                    res.render('./gestiones/gestion2',{data}) 
                //para que pueda crear gestiones  
                }else{
                    res.render('./gestiones/gestion1')
                }
            })
            .catch(error => console.error('Error:', error))
        }   
    })
    .catch(error => console.error('Error:', error))
    }else{res.redirect('/login')}
};
//funcion para listar gestiones
function listarG(req,res){
    if(datos[cabezera._id].esto.rol=='administrador'){
    var token=({authorization:`Bearer ${datos[cabezera._id].esto.token}`})
    fetch('http://localhost:3000/api/gestiones',{headers:token})
    .then(res => res.json())
    .then(data => {
        // console.log(data)
        // si existe una gestion programada recientemente
        if(data.message==undefined){
            res.render('./gestiones/gestion3list',{data}) 
        // //para que pueda crear gestiones  
        }else{
            res.render('./gestiones/gestion1')
        }
    })
    .catch(error => console.error('Error:', error))
    }else{res.redirect('/login')}
}
//funcion para cerrar gestion
function cerrarGestion(req,res){
    // console.log(datos)
    if(datos[cabezera._id].esto.rol=='administrador'){
        var token=({authorization:`Bearer ${datos[cabezera._id].esto.token}`})
        // console.log(token)
    var gestion={
      nombre:req.body.nombre,
    }
    const esto={
        method: 'POST', 
        body: JSON.stringify(gestion), 
        headers:{
            'Content-Type': 'application/json'
        }
    }
    fetch('http://localhost:3000/api/closeGestion',esto,{headers:token})
    .then(res => res.json())
    .then(data => {
        {res.render('./gestiones/gestion1',{data})}
        console.log(data)
    })
    .catch(error => console.error('Error:', error))
    }else{res.redirect('/login')}
}
/////////////////////////////////////>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
///>>>>>>>>>>>>>crear usuarios<<<<<<<<<<<
function indexEst(req,res){
     res.render('users1')
}
//esto es para enviar el archivo
function userSend(req,res){
    var actT=req//resive el id de la materia
    console.log(actT)
    // var materia={
    //     nombre:req.body.nombre,
    //     sigla:req.body.sigla,
    //     grupo:req.body.grupo
    // }
    // const esto={
    //       method: 'POST', 
    //       body: JSON.stringify(materia), 
    //       headers:{
    //           'Content-Type': 'application/json'
    //       }
    // }
    // fetch('http://localhost:3000/api/edit/'+actT,esto)
    //     .then(resp => resp.json())
    //     .catch(error => console.error('Error:', error))
    //     .then(resp =>{
    //         console.log(resp)
    //         fetch('http://localhost:3000/api/materias')
    //         .then(resp => resp.json())
    //         .then(resp =>{
    //             res.render('materias',{
    //               resp
    //             });
    //         });
    //     });
}

module.exports={
    index,
    crearG,
    cerrarGestion,
    listarG,
    //////
    indexEst,
    userSend,
    //
    tokeng
}