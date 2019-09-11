//solo para director
'use strict'

const jwt =require('jwt-simple')
const moment=require('moment')
const config=require('../configuracion')///para la clave de tokens
//crea token
function createToken(user){
    const payload={
        sub:user._id,
        iat:moment().unix(),//cuando fue creado el token 
        exp:moment().add(14,'days').unix(),//cuando va expirar o caducar token
    }

    return jwt.encode(payload,config.SECRET_TOKEN)//devuelve el token codificado
}
//decodifica token
function decodeToken(token){
    const decoded=new Promise((resolve,reject)=>{
        try{
            const payload=jwt.decode(token, config.SECRET_TOKEN)

            if(payload.exp<=moment().unix()){
                reject({
                    status:401,
                    message:'token a expirado'
                }) 
            }
            resolve(payload.sub)//id del usuario
        }catch(err){
            reject({
                status:500,
                message:'token invalido'
            })
        }
    })
    return decoded
}
module.exports={
    createToken,
    decodeToken
}