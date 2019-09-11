'use strict'
// formidable= require('formidable')
const formidable= require('formidable')
const xlsxtojson = require("xlsx-to-json")
// const xlstojson = require("xls-to-json")
// const output=require('../output.json')


function saveArchivo(req,res){
    console.log(`storage location is ${req.hostname}/${req.file.path}`);
    return res.send(req.file);
}
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
                res.send(result);
                
              
            }
        })
  
    })
}
module.exports={
    saveArchivo,
    save
   
}
