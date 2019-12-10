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

function tokenm(req,res){
    cabezera=req.headers//recupernado
    if(req.headers.rol=='administrador'){
        data1(req.headers,req.headers._id)
    }else{res.redirect('/login')}

    // console.log(cabezera,'este tken de gestion')
    //ata1(req.headers, req.headers._id)
}
//pagina principal de creacion de materiass
function index(req,res){
    if(datos[cabezera._id].esto.rol=='administrador'){
    var token=({authorization:`Bearer ${datos[cabezera._id].esto.token}`})
    fetch('http://localhost:3000/api/gestiones',{headers:token})
    .then(rest => rest.json())
    .then(rest => {
        //si existe una gestion programada recientemente
        if(rest.message==undefined){
            fetch('http://localhost:3000/api/VMG',{headers:token})
            .then(resp => resp.json())
            .then(resp =>{
                // console.log(resp)
                if(resp.message==undefined){res.render('./materias/materia3',{resp})}
                else{res.render('./materias/materia2')}
                // res.render('./materias/materia3',{resp,data});
            });
        //para que pueda crear gestiones  
        }else{
            // console.log('noooooooo')
            res.render('./materias/materia1')
        }
    })
    .catch(error => console.error('Error:', error))
    }else{ 
        // res.send({message:'hoooooo'})
        res.redirect('/login')
    }
}
//para crear materias
function crearMat(req, res) { 
    // if(req.body.nombre=='' || req.body.sigla=='' || req.body.grupo==''){res.render('materias',{message:'no en'}
    if(datos[cabezera._id].esto.rol=='administrador'){
        var token=({authorization:`Bearer ${datos[cabezera._id].esto.token}`})
    var materia = {
        nombre: req.body.nombre,
        sigla: req.body.sigla,
        grupo:req.body.grupo,
        gestion:'ultima'
    };
    const esto={
        method: 'POST', 
        body: JSON.stringify(materia), 
        headers:{
            'Content-Type': 'application/json'
        }
    }
    fetch('http://localhost:3000/api/materia',esto,{headers:token})
    .then(res => res.json())
    .then(data => {
        // console.log(data.message);
        fetch('http://localhost:3000/api/VMG',{headers:token})
        .then(resp => resp.json())
        .then(resp =>{
            // console.log(data,resp)
            res.render('./materias/materia3',{resp,data});
        });
        
    })
    .catch(error => console.error('Error:', error))
    }else{res.redirect('/login')}
};
//listar materias actuales de la gestion
function listMa(req,res){
    if(datos[cabezera._id].esto.rol=='administrador'){
        var token=({authorization:`Bearer ${datos[cabezera._id].esto.token}`})
    fetch('http://localhost:3000/api/VMG',{headers:token})
    .then(resp => resp.json())
    .then(resp =>{
            if(resp.message=='no existen materias programadas en la gestion'){
                res.render('materias/materia2')
            }else{
                res.render('materias/materias4list',{resp});
            }
    });
    
    }else{res.redirect('/login')}

}
///opcion eliminar
function deleteMat (req, res) {
    if(datos[cabezera._id].esto.rol=='administrador'){
        var token=({authorization:`Bearer ${datos[cabezera._id].esto.token}`})
    var delT = req.params.id //resiviendo el id de la tarea
    fetch('http://localhost:3000/api/delete/'+delT,{headers:token})
    .then(rest=> rest.json())
    .catch(error => console.error('Error:', error))
    .then(rest =>{
        res.redirect('/listM')
    });
    }else{res.redirect('/login')}
}

//para saver que tarea editar
var OnlyMat
function editMat (req, res) {
    if(datos[cabezera._id].esto.rol=='administrador'){
        var token=({authorization:`Bearer ${datos[cabezera._id].esto.token}`})
    var editT = req.params.id //resiviendo el id de la materia
    // res.redirect('/ver1',editT)
    fetch('http://localhost:3000/api/veredit/'+editT,{headers:token})
    .then(resp => resp.json())
    .catch(error => console.error('Error:', error))
    .then(resp =>{
        OnlyMat=resp
        res.redirect('/ver1')
    });
    }else{res.redirect('/login')}
}
//renderiza un formulario para editar
function ver(req,res){
    // console.log(OnlyMat.msn)
    if(OnlyMat==undefined){
        res.redirect('/listM')
    }else{
        res.render('materias/materiaEd',{OnlyMat});
    }
    // res.render('materias/materiaEd',{OnlyMat});
} 

////edita la materia
function actualizarMat(req,res){
    if(datos[cabezera._id].esto.rol=='administrador'){
        var token=({authorization:`Bearer ${datos[cabezera._id].esto.token}`})
    var actT=req.params.id//resive el id de la materia
    var materia={
        nombre:req.body.nombre,
        sigla:req.body.sigla,
        grupo:req.body.grupo
    }
    const esto={
          method: 'POST', 
          body: JSON.stringify(materia), 
          headers:{
              'Content-Type': 'application/json'
          }
    }
    fetch('http://localhost:3000/api/edit/'+actT,esto,{headers:token})
        .then(resp => resp.json())
        .catch(error => console.error('Error:', error))
        .then(resp =>{
            console.log(resp)
            res.redirect('/listM')
        });
    }else{res.redirect('/login')}
}

module.exports={
    index,
    crearMat,
    listMa,
    deleteMat,
    editMat,
    ver,
    actualizarMat,
    tokenm
   
    // crearG,
    // cerrarGestion,
    // listarG,
    // ///////
    // crearMat,
    // deleteMat,
    // editMat,
    // actualizarMat,
    // indexEst,
    // userSend
}