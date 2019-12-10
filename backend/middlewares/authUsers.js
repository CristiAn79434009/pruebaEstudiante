//para director solo
'use strict'
///determinadas rutas para poder ser accedidas por usuarios

const servicio=require('../servicios/usersToken')//requerir solo de director

 function isAuth(req,res,next){
     console.log(req.headers)
     if(!req.headers.authorization){
         return res.status(403).send({message:'no tiene autorizacion'})/// para deteriar si tiee permiso
     }
    const token=req.headers.authorization.split(" ")[1]
    servicio.decodeToken(token)
        .then(response=>{
            req.user=response
            // console.log(response)
            next()
        })
        .catch(response=>{
            res.status(response.status)
        })
 }
 module.exports=isAuth