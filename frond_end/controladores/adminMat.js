'use strict'
const fetch = require('node-fetch')
//pagina principal de creacion de materiass
function index(req,res){
    fetch('http://localhost:3000/api/gestiones')
    .then(rest => rest.json())
    .then(rest => {
        //si existe una gestion programada recientemente
        if(rest.message==undefined){
            fetch('http://localhost:3000/api/VMG')
            .then(resp => resp.json())
            .then(resp =>{
                // console.log(resp)
                if(resp.message==undefined){res.render('./materias/materia3',{resp})}
                else{res.render('./materias/materia2')}
                // res.render('./materias/materia3',{resp,data});
            });
        //para que pueda crear gestiones  
        }else{
            res.render('./materias/materia1')
        }
    })
    .catch(error => console.error('Error:', error))
}
//para crear materias
function crearMat(req, res) { 
    // if(req.body.nombre=='' || req.body.sigla=='' || req.body.grupo==''){res.render('materias',{message:'no en'}
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
    fetch('http://localhost:3000/api/materia',esto)
    .then(res => res.json())
    .then(data => {
        // console.log(data.message);
        fetch('http://localhost:3000/api/VMG')
        .then(resp => resp.json())
        .then(resp =>{
            // console.log(data,resp)
            res.render('./materias/materia3',{resp,data});
        });
        
    })
    .catch(error => console.error('Error:', error))
  
};
//listar materias actuales de la gestion
function listMa(req,res){
    fetch('http://localhost:3000/api/VMG')
    .then(resp => resp.json())
    .then(resp =>{
            if(resp.message=='no existen materias programadas en la gestion'){
                res.render('materias/materia2')
            }else{
                res.render('materias/materias4list',{resp});
            }
    });
}
///opcion eliminar
function deleteMat (req, res) {
    var delT = req.params.id //resiviendo el id de la tarea
    fetch('http://localhost:3000/api/delete/'+delT)
    .then(rest=> rest.json())
    .catch(error => console.error('Error:', error))
    .then(rest =>{
        res.redirect('/listM')
    });
}

//para saver que tarea editar
var OnlyMat
function editMat (req, res) {
    var editT = req.params.id //resiviendo el id de la materia
    // res.redirect('/ver1',editT)
    fetch('http://localhost:3000/api/veredit/'+editT)
    .then(resp => resp.json())
    .catch(error => console.error('Error:', error))
    .then(resp =>{
        OnlyMat=resp
        res.redirect('/ver1')
    });
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
    fetch('http://localhost:3000/api/edit/'+actT,esto)
        .then(resp => resp.json())
        .catch(error => console.error('Error:', error))
        .then(resp =>{
            console.log(resp)
            res.redirect('/listM')
        });
}

module.exports={
    index,
    crearMat,
    listMa,
    deleteMat,
    editMat,
    ver,
    actualizarMat,
   
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