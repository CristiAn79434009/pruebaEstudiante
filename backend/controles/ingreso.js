'use strict'

const User=require('../modelos/Users')//usando el equema de estudiantes
const service1=require('../servicios/usersToken')


function ingreso(req,res){//vericar si existe email en la bd si existe damos acceso creando un token
    //  const ru=req.body.ru
    const ci=req.body.ci
    // const username=req.body.username
    User.findOne({
        // rudi : ru,
        ci : ci
        }). exec ( (err,user)=>{
            if(err){res.status(500).send({message:err})}
            if (user == null){res.status(404).send({message:'no existe el user'})}
            if(user.rol=='estudiante'){
                if(user.pago==true){
                    res.status(200).send({
                    message:'Estudiante tiene acceso al Sistema de Guias de Laboratorio',
                    // token:service1.createToken(user),
                    user
                    })

                }else{res.status(404).send({message:'usted no pago por el servicio....'})}
            }
            if(user.rol=='docente'){
                res.status(200).send({
                message:'Docente registrado correctamente',
                // token:service1.createToken(user),
                // user
                })
            }
            if(user.rol=='director'){
                
            }
            
        })
}
module.exports={
    ingreso
}