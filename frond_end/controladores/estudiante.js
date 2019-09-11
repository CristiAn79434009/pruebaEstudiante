'use strict'
const fetch = require('node-fetch')

  
// const Estudiante=require('../modelos/estudiante')//usando el equema de estudiantes




function inicio(req,res){
    // fetch('http://localhost:3000')
    // .then(resp => resp.json())
    // .then(resp =>{
        //console.log(resp)
        res.render('index')
        // ,{
        // //   resp
        // });
    // });
}
///////////////////////////
function ingreso(req, res) { 

    // console.log(req.body)
    var estudiante = {
      ru: req.body.ru,
      ci: req.body.ci
    }
    const esto={
        method: 'POST', 
        body: JSON.stringify(estudiante), 
        headers:{
            'Content-Type': 'application/json'
        }
    }
    // console.log(data.token);
    fetch('http://localhost:3000/api/signin',esto)
    .then(res => res.json())
    .then(data => {

        console.log(data);
       // res.redirect('ingreso',{data});
        res.render('ingreso_est',{data});
        

    })
    .catch(error => console.error('Error:', error))
  
};  
//vera los estudiantes
function authestudiante1(req, res) { 
    
    res.render('product')
    
    // var estado = req.params.id //resiviendo el id de la tarea
    // console.log(delT)
    // fetch('http://localhost:3000/api/estudiante')
    // .then(resp => resp.json())
    // .catch(error => console.error('Error:', error))
    // .then(resp =>{
    //     console.log(resp);
    // });
    // let productlist=document.createElement('ul')

    // const myHeaders=new Headers();
    // myHeaders.append('authorization',`Bearer ${localStorage.token}`)

    // fetch('/api/estudiante',{
    //     method:'GET',
    //     headers: myHeaders
    // })
    // .then(res => res.json())//pasando la respuesta a formato json
    // .then(data => {
    //     data.estudiante.map(estudiante=>{
    //         let text =document.createTextNode(estudiante.ru)
    //         let elem=document.createElement('li')
    //         elem.appendChild(text)
    //         productlist.appendChild(elem)
    //     })

    //     document.body.appendChild(productlist)
    // })
}
  






module.exports={
 inicio,
 ingreso,
 authestudiante1
}