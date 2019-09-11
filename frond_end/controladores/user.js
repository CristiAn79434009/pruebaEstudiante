'use strict'
const fetch = require('node-fetch')
const formidable= require('formidable')
const xlsxtojson = require("xlsx-to-json")
///>>>>>>>>>>>>>crear usuarios<<<<<<<<<<<
function indexUser(req,res){
    res.render('users1')
}

//funncion para sacar iformacion de los archivos
///controlando tipo de archivo mine
function save(req,res){
    let form=formidable.IncomingForm()
    form.parse(req,(err,fields,files)=>{})
    form.on('fileBegin',(name,file)=>{
        if(file.type=='application/vnd.ms-excel' || file.type=='application/msexcel' || file.type=='application/x-msexcel'|| file.type=='application/x-ms-excel'|| file.type=='application/x-excel'|| file.type=='application/x-dos_ms_excel'|| file.type=='application/xls'|| file.type=='application/x-xls'|| file.type=='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'){
            var aleatorio=Math.floor((Math.random()*9999)+1);
            var name=aleatorio+file.name
            file.name=name
            file.path= './archivos/'+file.name
            // // return res.send({message:'gracias'})
            // console.log(file.name)
            
        }else{return res.send({message:'ingrese un archivo excel por favor'})}
        
    })
    form.on('file',(name,file)=>{
        // console.log(file.name)
        xlsxtojson({
            // input: "./excel-to-json.xlsx",  // input xls
            input: "./archivos/"+file.name, 
            output: "output.json", // output json 
            lowerCaseHeaders:true
        },function(err, result) {
            if(err) {
              res.json(err);
            } else {
                // console.log(result);
                // res.json(result)
                // res.send(result);
                res.render('userlist1',{
                        result
                });
            }
        })
  
    })
}

//esto es para enviar a la base de Datos
function userSend(req,res){
    const output=require('../output.json')

    

    // if(output[0].R_U==undefined){

    // }else{
    //     for(var i=0;i<output.length;i++){
    //         var user={
    //             ci:output[i].C_i,
    //             username:output[i].R_U,
    //             rol:'',
    //             pago:'',
    //             materia_1:output[i].Materia_1,
    //             materia_2:output[i].Materia_2,
    //             materia_3:output[i].Materia_3,
    //             materia_4:output[i].Materia_4,
    //             materia_5:output[i].Materia_5,
    //             materia_6:output[i].Materia_6,
    //             materia_7:output[i].Materia_7,
    //             Gmateria_1:output[i].Grupo_M1,
    //             Gmateria_2:output[i].Grupo_M2,
    //             Gmateria_3:output[i].Grupo_M3,
    //             Gmateria_4:output[i].Grupo_M4,
    //             Gmateria_5:output[i].Grupo_M5,
    //             Gmateria_6:output[i].Grupo_M6,
    //             Gmateria_7:output[i].Grupo_M7,
    //         }
    //         const esto={
    //             method: 'POST', 
    //             body: JSON.stringify(user), 
    //             headers:{
    //                 'Content-Type': 'application/json'
    //             }
    //         }

    //     }
    // }
    
    // var actT=req//resive el id de la materia
    // console.log(output[0].R_U)
    
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
 function crear(req, res) { 
    const output=require('../output.json')
    var users = {
        // nombre: req.body.nombre,
        // sigla: req.body.sigla,
        // grupo:req.body.grupo
        output
    };
    const esto={
        method: 'POST', 
        body: JSON.stringify(users), 
        headers:{
            'Content-Type': 'application/json'
        }
    }
    fetch('http://localhost:3000/api/mostrar1',esto)
    .then(res => res.json())
    .then(data => {
        console.log(data.message);
    })
    .catch(error => console.error('Error:', error))
  
};


module.exports={
   indexUser,
   userSend,
   save,
   crear
}