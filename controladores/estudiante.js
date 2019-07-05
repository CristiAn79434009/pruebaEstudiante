'use strict'

const Estudiante=require('../modelos/estudiante')//usando el equema de estudiantes
//todos los estudinates
function getEstudiantes(req,res){
    Estudiante.find({},(err,estudiante)=>{
        if(err) return res.status(500).send({message:`error en la peticion peticion: ${err}`})
        if(estudiante.length==0) return res.status(404).send({message:'no existen estudiantes'})
        
        res.send(200,{estudiante})//el primero es el nombre de la tabla
    })
}
///estudiante por id
function getEstudiante(req, res){
    let estudianteId =req.params.estudianteId
    Estudiante.findById(estudianteId,(err,estudiante)=>{
        if(err)return res.status(500).send({message:`error en la peticion: ${err}`})
        if(!estudiante)return res.status(404).send({message:`el estudiante no existe`})

        res.status(200).send({estudiante:estudiante})
    })
}
//registrar
function saveEstudiante(req,res){
    //console.log (req.body)
    //res.status(200).send({message:'el producto se recivio'})
    console.log('POST /api/estudiante')
    console.log(req.body)

    let estudiante=new Estudiante()
    estudiante.ru=req.body.ru
    estudiante.materia_1=req.body.materia_1
    estudiante.materia_2=req.body.materia_2
    estudiante.materia_3=req.body.materia_3
    estudiante.materia_4=req.body.materia_4
    estudiante.materia_5=req.body.materia_5
    estudiante.materia_6=req.body.materia_6
    estudiante.materia_7=req.body.materia_7
    
    estudiante.save((err,estudianteGuardado)=>{
        if(err) res.status(500).send({message:`error al guardar datos: ${err}`})

        res.status(200).send({estudiante:estudianteGuardado})
    })       
}

function updateEstudiante(req,res){
    let estudianteId=req.params.estudianteId
    let update= req.body

    Estudiante.findByIdAndUpdate(estudianteId,update,(err,estudianteActualizado)=>{
        if(err)res.status(500).send({message:`error al actualizar el estudiante ${err}`})

        res.status(200).send({estudiante: estudianteActualizado})
    })
}

function deletEstudiante(req,res){
    let estudianteId =req.params.estudianteId

    Estudiante.findById(estudianteId,(err,estudiante)=>{
        if(err) res.status(500).send({message:`error al eliminar ${err}`})

        estudiante.remove(err=>{
            if(err) res.status(500).send({message:`error al eliminar estudiante${err}`})
            res.status(200).send({message:'el estudiante  a sido eliminado correctamente'})
            console.log('uso del metodo delete')

        })
    })
}

module.exports={
    getEstudiantes,
    getEstudiante,
    saveEstudiante,
    updateEstudiante,
    deletEstudiante
}