'use strict'

const Users=require('../modelos/Users')//usando el equema de users
const service1=require('../servicios/usersToken')
const Gestion=require('../modelos/Gestion')

function ingreso(req,res){//vericar si existe email en la bd si existe damos acceso creando un token
    const username=req.body.username
    const password=req.body.password
    Users.findOne({
        username : username,
        password : password,
        // gestion  : g,
        }). exec ( (err,user)=>{
            
            if(err){res.status(500).send({message:`error en la peticion: ${err}`})}else{
                if (user == null) { res.status(404).send({message:'El usuario no existe'})}else{
                    console.log(user)
                    if(user.rol=='administrador'){
                        return res.status(200).send({
                        message:'acceso al sistema',
                        token:service1.createToken(user),
                        rol:user.rol,
                        id:user.id
                        })
                    }else{
                    Gestion.find({},(err,gestion)=>{
                        if(err){res.status(500).send({message:`error en la peticion: ${err}`})}else{
                            if(gestion.length==0){ res.status(404).send({message:'no existe gestiones programadas'})}else{
                                if(gestion[gestion.length-1].nombre=='nada'){res.status(404).send({message:'no existe gestiones programadas'})}else{
                                    if(user.rol=='estudiante' & user.gestion==gestion[gestion.length-1].nombre){
                                        if(user.pago==true){
                                            return res.status(200).send({
                                            message:'acceso al sistema',
                                            token:service1.createToken(user),
                                            rol:user.rol,
                                            id:user.id
                                            })  
                                        }else{res.status(404).send({message:'usted no pago por el servicio....'})}
                                    }else{res.status(404).send({message:'usted aun no esta registrado'})}

                                    if(user.rol=='docente'& user.gestion==gestion[gestion.length-1].nombre){
                                        return res.status(200).send({
                                        message:'acceso al sistema',
                                        token:service1.createToken(user),
                                        rol:user.rol,
                                        id:user.id
                                        })
                                    }else{res.status(404).send({message:'usted aun no esta registrado'})}
                                }
                            }
                        }
                    })
                    }
                }
            }           
        })   
}
module.exports={
    ingreso
}