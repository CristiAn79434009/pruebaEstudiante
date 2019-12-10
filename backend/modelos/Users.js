'use strict'

const mongoose=require('mongoose')
const Schema=mongoose.Schema
// const bcrypt=require('bcrypt-nodejs')//encryptar el password
// const crypto=require('crypto')//est para e abatar
//  var alt=Math.floor((Math.random()*9999)+1*100)
const UserSchema=Schema({
    // nombre:{type:String,default:'nombre'},
    // apellido:{type:String,default:'apellido'},
    ru:{type:Number,default:'0',unique:false}, 
    ci:{type:Number,required:true,},
    rol:{type:String,default:'estudiante',enum:['estudiante','docente','administrador']},
    gestion:{type:String,default:'no tiene gestion'},
    pago:{type:Boolean,default:false},
    username:{type:String,default:'username'},//sera el ru para los estudiantes
    password:{type:String,required:true},
    materia_1:{type:String,default:'no programado'},
    materia_2:{type:String,default:'no programado'},
    materia_3:{type:String,default:'no programado'},
    materia_4:{type:String,default:'no programado'},
    materia_5:{type:String,default:'no programado'},
    materia_6:{type:String,default:'no programado'},
    materia_7:{type:String,default:'no programado'},
    Gmateria_1:{type:String,default:'G no programado'},
    Gmateria_2:{type:String,default:'G no programado'},
    Gmateria_3:{type:String,default:'G no programado'},
    Gmateria_4:{type:String,default:'G no programado'},
    Gmateria_5:{type:String,default:'G no programado'},
    Gmateria_6:{type:String,default:'G no programado'},
    Gmateria_7:{type:String,default:'G no programado'},

})
////////////////////funciones antes de guardar a la base de datos
// UserSchema.pre('save',function(next){// la flecha por function
//     let user=this
//     if(!user.isModified('password'))return next()
//     bcrypt.genSalt(10,(err,salt)=>{
//         if(err) return next(err)

//         bcrypt.hash(user.password, salt, null, (err,hash)=>{
//             if(err)return next(err)

//             user.password=hash
//             next()
//         })
//     })
// })

/////////////////////////para el abatar
// UserSchema.methods.gravatar=function(){
//     if(!this.email) return 'https://gravatar.com/avatar/?s=200&d=retro'

//     const md5 =crypto.createHash('md5').update(this.email).digest('hex')
//     return `https://gravatar.com/avatar/${md5}?s=200&d=retro`
// }
module.exports= mongoose.model('user',UserSchema)