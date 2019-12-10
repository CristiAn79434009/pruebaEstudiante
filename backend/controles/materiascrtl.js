'use strict'

const Materia=require('../modelos/Materias')//usando el equema de estudiantes
const Gestion=require('../modelos/Gestion')
const express = require('express');

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><<<<>>>><<>
//mostrar todas las materias
function getMaterias(req,res){
    Materia.find({},(err,materia)=>{
        if(err) return res.status(500).send({message:`error en la peticion: ${err}`})
        if(materia.length==0) return res.status(404).send({message:'no existen materias programadas'})
        res.send(200,{materia})//el primero es el nombre de la tabla
    })
}
//mostrar materia por id
function getMateria(req, res){
    let materiaId =req.params.materiaId
    Materia.findById(materiaId,(err,materia)=>{
        if(err)return res.status(500).send({message:`error en la peticion: ${err}`})
        if(!materia)return res.status(404).send({message:`materias no existen`})
        res.status(200).send({materia})
    })
}
//registrar una materia----- SE USA
function saveMateria(req,res){
    const Gestion=require('../modelos/Gestion')
    Gestion.find({},(err,gestion)=>{
        if(err) return res.status(500).send({message:`error en la peticion: ${err}`})
        if(gestion.length==0){return res.status(404).send({message:'no existe gestines programadas'})}
        else{
            if(gestion[gestion.length-1].nombre=='nada'){return res.send({message:`Error cree una nueva gestion`})}
            else{
                    Materia.find({},(err,materia)=>{
                        if(err) return res.status(500).send({message:`error en la peticion: ${err}`})
                        if(materia.length==0){
                            let materia=new Materia()
                            materia.nombre=req.body.nombre
                            materia.sigla=req.body.sigla
                            materia.grupo=req.body.grupo
                            materia.gestion=gestion[([gestion.length]-1)].nombre
                            materia.save((err,materiaGuardada)=>{
                                if(err) res.status(500).send({message:`error al guardar datos: ${err}`})
                                res.status(200).send({message:'sucess',materiaGuardada})
                            })   
                        }else{
                            var h=0
                            var k=0
                            var r=0
                            for(var i=0;i<materia.length;i++){
                                if(materia[i].sigla!=req.body.sigla){k++}
                                if(materia[i].sigla==req.body.sigla & materia[i].grupo!=req.body.grupo){h++}
                                if(materia[i].sigla==req.body.sigla & materia[i].grupo==req.body.grupo){
                                    if(req.body.gestion=='ultima'){
                                        if(materia[i].gestion==gestion[([gestion.length]-1)].nombre){r++}
                                    }
                                }
                            }
                            if(r==0){
                                if(h>0 || k==materia.length){
                                    let materia=new Materia()
                                    materia.nombre=req.body.nombre
                                    materia.sigla=req.body.sigla
                                    materia.grupo=req.body.grupo
                                    materia.gestion=gestion[([gestion.length]-1)].nombre

                                    materia.save((err,matguar)=>{
                                    if(err) res.status(500).send({message:`error al guardar datos: ${err}`})
                            
                                    res.status(200).send({message:'sucess',matguar})
                        
                                    })
                                }else{
                                res.send({message:'la materia ya esta registrada ingrese otra'})
                                }
                            }else{res.send({message:'la materia ya esta registrada ingrese otra'})}
                        }
                    })
                }
        }
    })      
}
//------------------------------eliminar materia
async function deletMateria  (req, res, next) {
        let { id } = req.params;
        await Materia.remove({_id: id});
        res.status(200).send({message:'la materia a sido eliminado'})
        
}
///-----------------------------funcion para ver que materia se va editar
async function verEdit (req, res, next) {
    const materia = await Materia.findById(req.params.id);
    // console.log(materia)
     res.status(200).json({
        'msn' : materia
     });
}
//--------------------------------edita los datos de la materia
async function updateMateria (req, res, next) {
    const { id } = req.params;
    await Materia.update({_id: id}, req.body);//rq.body datos del formulario fronend
    res.status(200).json({
       'msn' : "actualizado correctamente"
    });
  }
//------------------------muestra materias de la gestion actual
function getmateriasG(req,res){
    Gestion.find({},(err,gestion)=>{
        if(err) return res.status(500).send({message:`error en la peticion: ${err}`})
        if(gestion.length==0 ||gestion[gestion.length-1].nombre=='nada') return res.status(404).send({message:'no existe gestines programadas recientemente'})
        var g=gestion[gestion.length-1].nombre
        console.log(g)
        Materia.find({"gestion":g},(err,materia)=>{
            if(err) return res.status(500).send({message:`error en la peticion: ${err}`})
            if(materia.length==0) return res.status(404).send({message:'no existen materias programadas en la gestion'})
            res.send(200,{materia})
        })
    })
}
//exportando todas las funciones
module.exports={
    getMaterias,
    getMateria,
    saveMateria,
    updateMateria,
    deletMateria,
    verEdit,
    getmateriasG,
}