'use strict'


const app=require('./app')
const config=require('./configuracion')


app.listen(config.port,()=>{
        console.log(`servidor en puerto${config.port}`)
})
////////////----------
