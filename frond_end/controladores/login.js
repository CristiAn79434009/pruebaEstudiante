// 'use strict'
// const fetch = require('node-fetch')

// function inicio(req,res){
//         // res.render('index')
//     res.render('./login/login')
// }
// ///////////////////////////desde aqui comienza el login
// // var data1
// function ingreso(req, res) { 
//     var user = {
//       username: req.body.username,
//       password: req.body.password
//     }
//     const esto={
//         method: 'POST', 
//         body: JSON.stringify(user), 
//         headers:{
//             'Content-Type': 'application/json'
//         }
//     }
//     // console.log(user);
//     fetch('http://localhost:3000/api/signin',esto)
//     .then(data => data.json())
//     .then(data => {
//         // if(data)
//         // data1=data
//         // console.log(data)
//         if(data.message=='no existe el user'||data.message=='usted no pago por el servicio....'){
//             res.render('./login/welcom',{data})
//         }
//         else{
//             if(data.rol=='estudiante'){
//             // res.redirect('/inicial');
//             res.render('./login/directo',{data})
//             // res.render('./estu/homeest',{data})
//             }
//             if(data.rol=='docente'){
//             // res.redirect('/inicial');
//             res.render('./login/welcomdoc',{data})
//             }
//             if(data.rol=='administrador'){
//             // res.redirect('/inicial');    
//             res.render('./login/welcom',{data})
//             }
//         }
//     })
//     .catch(error => console.error('Error:', error))
// }; 


// // function token(req,res){
// //         cabezera=req.headers//recupernado
// //         // console.log(cabezera)
// //         // res.redirect('/home')
// //     }
//     //dando el acceso a las guias administrador
//     function home(req,res){
//         console.log(req.headers)
//         // console.log('authorization',`Bearer ${ca}`)
//         // fetch('http://localhost:3000/api/usercant',{headers:cabezera})
//         // .then(resp => resp.json())
//         // .catch(error => console.error('Error:', error))
//         // .then(resp =>{
//         //     // console.log(resp)
//         //     // if(resp.message=='exito')
//         //     res.render('./users/home',{resp})
//         // })
//     }
//     function homedoc(req,res){
//         var id=cabezera._id
//         // console.log(cabezera)
//         // console.log('authorization',`Bearer ${ca}`)
//         fetch('http://localhost:3000/api/user/'+id,{headers:cabezera})
//         .then(resp => resp.json())
//         .catch(error => console.error('Error:', error))
//         .then(resp =>{
//             console.log(resp)
//             // if(resp.message=='exito')
//             // res.render('./users/home',{resp})
//         })
//     }
//     // var est
//     function homeest(req,res){
//         // var id=req.params.id
//         console.log(req.params)
//         console.log(req.headers)
//         fetch('http://localhost:3000/api/user/'+req.headers._id,{headers:req.headers})
//         .then(resp => resp.json())
//         .catch(error => console.error('Error:', error))
//         .then(resp =>{
//             console.log(resp)
//             // est=resp
//             res.send({message:resp})
//             // res.render('./estu/prueba',{resp})
//             // if(resp.message=='exito'){
//             //     res.redirect('/homeEST')
//             //     // res.render
//             //     // res.render('./estu/homeest',{est})
//             // }else{res.send({est})}
//             // if(resp.message=='exito')
//             // res.render('./users/home',{resp})
//         })
//     }
//     //renderiza pagina de estudiantes
//     function homeE(req,res){
//         // console.log(est.user.mat)
//         res.render('./estu/homeest',{est})
//     }
// //muestra la pagina de bienvenida cargando los scripts necesarios
// function authestudiante1(req, res) {  
//     res.render('./login/welcom',{data1})
//     /// res.render('pruebas')   
//     // console.log(data1)
// }
// var cabezera//para recuperar el token
// function prueba(req,res){
//     cabezera=req.headers//recupernado
//     // console.log(cabezera)
//     res.redirect('/prueba2')
// }
// //dando el acceso a las guias
// function prueba2(req,res){
//     // console.log(cabezera.authorization)
//     fetch('http://localhost:3000/api/usercant',{
//         //method:'GET',
//         headers:cabezera
//         //headers: myHeaders
//     })
//     .then(resp => resp.json())
//     .catch(error => console.error('Error:', error))
//     .then(resp =>{
//         // console.log(resp)
//         // res.
//         // if(resp.message=='exito')
//         res.render('./users/home',{resp})
//     })
// }

// module.exports={
//  inicio,
//  ingreso,
//  homeest
// //  authestudiante1,
// //  prueba,
// //  prueba2
// }