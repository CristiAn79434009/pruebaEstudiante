'use strict'
const fetch = require('node-fetch')
const formidable= require('formidable')
const xlsxtojson = require("xlsx-to-json")


var datos1 = {}
function data1 (data, id){
    // for(i=0;i<)
    let algo = datos1[id];
    // console.log(algo)
    if(algo==algo){
        algo = datos1[id]={
            esto: data,
            qty:0
        };
    }
    algo.qty++;
}
var datos = {}
function data2 (data, id){
    
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

function tokenimp(req,res){
    cabezera=req.headers//recupernado
    if(req.headers.rol=='administrador'){
        data2(req.headers,req.headers._id)
    }else{res.redirect('/login')}

    // console.log(cabezera,'este tken de gestion')
    //ata1(req.headers, req.headers._id)
}

// function arr1 (data,id){
//     var arr =[]
//     for (const id in datos){
//         arr.push(datos[id])
//     }
//     return arr;
// }
///>>>>>>>>>>>>>crear usuarios<<<<<<<<<<<
function indexUser(req,res){
    res.render('./users/importar1')
}

//funncion para sacar iformacion de los archivos
///controlando tipo de archivo mine
function save(req,res){
    let form=formidable.IncomingForm()
    form.parse(req,(err,fields,files)=>{})
    form.on('fileBegin',(name,file)=>{
        var filename=file.name;
        var extension=filename.split('.').pop();
        // console.log(extension)
        if(extension=='xlsx'){
            if(file.type=='application/vnd.ms-excel' || file.type=='application/msexcel' || file.type=='application/x-msexcel'|| file.type=='application/x-ms-excel'|| file.type=='application/x-excel'|| file.type=='application/x-dos_ms_excel'|| file.type=='application/xls'|| file.type=='application/x-xls'|| file.type=='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'){
                var aleatorio=Math.floor((Math.random()*9999)+1);
                var name=aleatorio+file.name
                file.name=name
                file.path= './archivos/'+file.name

                form.on('file',(name,file)=>{
                    xlsxtojson({
                        // input: "./excel-to-json.xlsx",  // input xls
                        input: "./archivos/"+file.name, 
                        output: "output.json", // output json 
                        lowerCaseHeaders:true
                    },function(err, result) {
                        if(err) {
                          res.json(err);
                        } else { res.render('./users/listImport',{result});}
                    })
              
                })
            }else{return res.render('./errores/err_file',{message:'ingrese un archivo excel por favor'})}
        }else{return res.render('./errores/err_file',{message:'ingrese un archivo excel por favor'})}
    })
    
        // console.log(file,name)
        // var filename=file.name;
        // var extension=filename.split('.').pop();
        // console.log(extension)
        // if(extension=='xlsx'){
        // }else{res.send({message:'ingrese un archivo excel por favor.....'})}
        // if(extension=='xlsx'){
    
                    // if(result[0].R_Uss==undefined){
                        
                    //     res.render('./users/listImport',{message:'no exite datos en el archivo el formato no es el correcto'})
    
                    // }else{
                    //     res.render('./users/listImport',{result});
    
                    // }
            
}

//esto es para enviar a la base de Datos
function userSend(req,res){
    const output=require('../output.json')
    // console.log(output)

    if(output[0].R_Uss==undefined){
        res.send({message:'no exite datos en el archivo'})
    }else{
    //     // const output=require('../output.json')
    //     //verificando duplicidad de datos en el excel
            var k=0
            for(var i=0;i<output.length;i++){
                var h=0
                for(var j=0;j<output.length;j++){
                    if(output[i].C_I==output[j].C_I){
                        h++
                        if(h==2){
                            k++
                            // res.send(output[i].C_I)
                            data1( output[i],k)
                            // data1(output[j], output[j].C_I)                         
                            // console.log(output[i])
                        }
                    }
                }
            }
        }
        // console.log(datos1[1].esto,k)
        if(k>1){
            res.render('./users/import_result',{msg1:'existen '+k+' usuarios repetidos ',msg2:datos1,msg3:k})
            // res.send({msg1:'existen '+k+' usuarios repetidos ',msg2:datos1,msg3:k})
           
        }else{
            res.render('./users/import_result',{msg1:'exito'})
        }
    }

    function registrarU(req,res){
        // const user=req.body.usuarios[0]
        let users=require('../output.json')
          const esto={
              method: 'POST', 
              body: JSON.stringify(users), 
              headers:{
                  'Content-Type': 'application/json'
              }
          }
      
        fetch('http://localhost:3000/api/user1',esto)

        .then(resp => resp.json())
        .then(resp => {
            // if(resp.msg2=='usuarios repetidos'){
                // res.render('./users/import_resul_err',{resp})
            // }else{
                res.render('./users/import_resul_err',{resp})
            // }
            // console.log(resp.k)
            // console.log(resp.msg1[1].esto)
        })
        .catch(error => console.error('Error:', error))
    }
    
    

module.exports={
   indexUser,
   userSend,
   save,
   registrarU,
   tokenimp
}