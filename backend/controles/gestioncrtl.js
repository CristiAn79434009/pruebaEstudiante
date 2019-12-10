'use strict'

const Gestion=require('../modelos/Gestion')//usando el equema de gestiones

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><<<<>>>><<>
//mostrar todos las gestiones 1
function getGestiones(req,res){
    Gestion.find({},(err,gestion)=>{
        if(err) return res.status(500).send({message:`error en la peticion: ${err}`})
        if(gestion.length==0 ||gestion[gestion.length-1].nombre=='nada') return res.status(404).send({message:'no existe gestines programadas recientemente'})
        res.send(200,{gestion})
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
            if(gestion[gestion.length-1].nombre=='nada'){
                var h=0
                for(var i=0;i<gestion.length;i++){
                    if(gestion[i].nombre==req.body.nombre){h++}
                }
                if(h>0){res.status(500).send({message:'Nombre de Gestion ya existe...'})}
                else{
                    let gestionId=gestion[gestion.length-1]._id
                    Gestion.findById(gestionId,(err,gestionr)=>{
                        if(err) res.status(500).send({message:`error al eliminar ${err}`})
                        gestionr.remove()
                    })

                    let gestion2=new Gestion()
                    gestion2.nombre=req.body.nombre    
                    gestion2.save((err,gestionGuardado)=>{
                        if(err) res.status(500).send({message:`error al guardar datos: ${err}`})
        
                        res.status(200).send({gestion,message:'gestion guardada correctamente despues de borrar'})
                    })}
            }
            else{
                var h=0
                for(var i=0;i<gestion.length;i++){
                    if(gestion[i].nombre==req.body.nombre){h++}
                }
                if(h>0){res.status(500).send({message:'Nombre de Gestion ya existe...'})}
                else{
                    let gestion1=new Gestion()
                    gestion1.nombre=req.body.nombre    
                    gestion1.save((err,gestionGuardado)=>{
                        if(err) res.status(500).send({message:`error al guardar datos: ${err}`})
        
                        res.status(200).send({gestion,message:'gestion guardada correctamente'})
                    })}
                }
        }
    })       
}
//funcion para actualizar datos de una gestion//no se usa
function updateGestion(req,res){
    let gestionId =req.params.gestionId
    let update= req.body

    Gestion.findByIdAndUpdate(gestionId,update,(err,gestionActualizado)=>{
        if(err)res.status(500).send({message:`error al actualizar datos ${err}`})
        res.status(200).send({gestionActualizado})
    })
}
//funcion para eliminar una gestion
function deletGestion(req,res){
    let gestionId =req.params.gestionId
    Gestion.findById(gestionId,(err,gestion)=>{
        if(err) res.status(500).send({message:`error al eliminar ${err}`})
        gestion.remove(err=>{
            if(err) res.status(500).send({message:`error al eliminar la gestion${err}`})
            res.status(200).send({message:'la gestion a sido eliminado'})
        })
    })
}
// cerrar gestion
function cierreGestion(req,res){
    // console.log(req.headers,req.body)
    Gestion.find({},(err,gestion)=>{
        if(err) return res.status(500).send({message:`error en la peticion: ${err}`})
        if(gestion.length==0){ return res.send({message:'error al gurdar datos'})}
        else{
            let gestion1=new Gestion()
            gestion1.nombre=req.body.nombre  
            gestion1.save((err,gestionGuardado)=>{
                if(err) res.status(500).send({message:`error al guardar datos: ${err}`})
                res.status(200).send({gestionGuardado, message:'Gestion cerrada correctamente'})
            })
        }
    })       
}

//exportando todas las funciones 
module.exports={
    getGestiones,//muestra todas las gestiones 
    getGestion,//muestra gestion por id
    saveGestion,//crea una gestion con controles
    updateGestion,//actualiza gestion
    deletGestion,//elimina gestion por id
    cierreGestion//cierra la gestion
}