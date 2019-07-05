'use strict'

const mongoose= require('mongoose')
const app=require('./app')
const config=require('./configuracion')



////////conecion bd y puerto
//MongoClient.connect (url, {useNewUrlParser: true}) este es codigo para solucionar el error
//mongoose.connect(config.db, {useNewUrlParser: true},(err, res)=>{
mongoose.connect(config.db, {useNewUrlParser: true},(err,res)=>{
    if(err){
        return console.log(`error en la conxion a la BD: ${err}`)
    }
    console.log('conexion a la base de datos establecida')
/////esto para la coneccion servidor
    app.listen(config.port,()=>{
        console.log(`servidor en puerto${config.port}`)
    })
})
////////////----------
