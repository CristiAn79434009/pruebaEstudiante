'use strict'

const Gestion=require('../modelos/Gestion')//usando el equema de estudiantes

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><<<<>>>><<>
//para ves si hay gestiones o gestiones vacias
function getpruebages(req,res){
    Gestion.find({},(err,gestion)=>{ 
        if(err) return res.status(500).send({message:`error en la peticion: ${err}`})
        if(gestion.length==0 ) return res.status(404).send({message:'no existe gestines programadas'})
         res.send(200,{gestion})//el primero es el nombre de la tabla
    })
}
//mostrar gestion por id
function getGestion(req, res){
    let gestionId =req.params.gestionId
    Gestion.findById(gestionId,(err,gestion)=>{
        if(err)return res.status(500).send({message:`error en la peticion: ${err}`})
        if(!gestion)return res.status(404).send({message:`la gestion no existe`})

        res.status(200).send({gestion})
    })
}
//registrar gestion individual
function saveGestion(req,res){
    Gestion.find({},(err,gestion)=>{
        if(err) return res.status(500).send({message:`error en la peticion: ${err}`})
        if(gestion.length==0){
            let gestion=new Gestion()
            gestion.nombre=req.body.nombre    
            gestion.save((err,gestionGuardado)=>{
                if(err) res.status(500).send({message:`error al guardar datos: ${err}`})

                res.status(200).send({message:'gestion guardada correctamente 1ra'})
            })
        }else{
            var h=0
            for(var i=0;i<gestion.length;i++){
                if(gestion[i].nombre==req.body.nombre){h++}
            }
            if(h>0){res.status(500).send({message:'Nombre de Gestion ya existe...'})}
            else{
                let gestion=new Gestion()
                gestion.nombre=req.body.nombre    
                gestion.save((err,gestionGuardado)=>{
                    if(err) res.status(500).send({message:`error al guardar datos: ${err}`})
    
                    res.status(200).send({message:'gestion guardada correctamente'})
                })}
        }
    })       
}
//funcion para actualizar datos de un director
function updateGestion(req,res){
    let gestionId =req.params.gestionId
    let update= req.body

    Gestion.findByIdAndUpdate(gestionId,update,(err,gestionActualizado)=>{
        if(err)res.status(500).send({message:`error al actualizar datos ${err}`})

        res.status(200).send({gestionActualizado})
    })
}
//funcion para eliminar un director
function deletGestion(req,res){
    let gestionId =req.params.gestionId

    Gestion.findById(gestionId,(err,gestion)=>{
        if(err) res.status(500).send({message:`error al eliminar ${err}`})

        gestion.remove(err=>{
            if(err) res.status(500).send({message:`error al eliminar la gestion${err}`})
            res.status(200).send({message:'la gestion a sido eliminado'})
            console.log('uso del metodo delete')

        })
    })
}
// cerrar gestion
function cierreGestion(req,res){
    Gestion.find({},(err,gestion)=>{
        if(err) return res.status(500).send({message:`error en la peticion: ${err}`})
        if(gestion.length==0){ return res.send({message:'error al gurdar datos'})}
        else{
            let gestion1=new Gestion()
            gestion1.nombre=req.body.nombre    
            gestion1.save((err,gestionGuardado)=>{
                if(err) res.status(500).send({message:`error al guardar datos: ${err}`})
    
                res.status(200).send({gestionGuardado, message:'gestion guardada correctamenteRS'})
            })
        }
    })       
}

//exportando todas las funciones 
module.exports={
    getpruebages
    // getGestion,
    // saveGestion,
    // updateGestion,
    // deletGestion,
    // cierreGestion
}