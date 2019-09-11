'use strict'
const fetch = require('node-fetch')
//pagina principal de crear gestiones
function index(req,res){
    fetch('http://localhost:3000/api/gestiones')
    .then(res => res.json())
    .then(data => {
        //si existe una gestion programada recientemente
        if(data.message==undefined){
            res.render('./gestiones/gestion2',{data}) 
        //para que pueda crear gestiones  
        }else{
            res.render('./gestiones/gestion1')
        }
    })
    .catch(error => console.error('Error:', error))
}
////crear gestion enviar datos y recivir mensaje
function crearG(req, res) { 
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
    fetch('http://localhost:3000/api/gestion',esto)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        if(data.message=='Nombre de Gestion ya existe...'){
            res.render('./gestiones/gestion1',{data})
            
        }else{ 
            fetch('http://localhost:3000/api/gestiones')
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
};
//funcion para listar gestiones
function listarG(req,res){
    fetch('http://localhost:3000/api/gestiones')
    .then(res => res.json())
    .then(data => {
        // console.log(data)
        //si existe una gestion programada recientemente
        if(data.message==undefined){
            res.render('./gestiones/gestion3list',{data}) 
        //para que pueda crear gestiones  
        }else{
            res.render('./gestiones/gestion1')
        }
    })
    .catch(error => console.error('Error:', error))
}
//funcion para cerrar gestion
function cerrarGestion(req,res){
    // console.log(req.body.nombre)
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
    fetch('http://localhost:3000/api/closeGestion',esto)
    .then(res => res.json())
    .then(data => {
        {res.render('./gestiones/gestion1',{data})}
        // console.log(data)
    })
    .catch(error => console.error('Error:', error))
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
    userSend
}