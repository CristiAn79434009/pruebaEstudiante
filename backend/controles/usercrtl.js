'use strict'

const Users=require('../modelos/Users')//usando el equema de estudiantes
const Gestion=require('../modelos/Gestion')
const Materia=require('../modelos/Materias')

const service=require('../servicios/usersToken')



/////////////////////////////////para registro y autentificacion/////////////////////////////////////
/// registrar director
// function registroDirec(req,res){
//     const director=new Director({
//         rudi:req.body.rudi,
//         ci: req.body.ci,
//         rol: req.body.rol
//     })
//     //console.log(user)
//     //console.log({token: service.createToken(user)}))
//     director.save((err)=>{//antes de que se guarde el user crea e token en las caveceras http
//         if(err) return res.status(500).send({message:`error al crear usuario: ${err}`})

//         return res.status(200).send({token: service.createToken(director)})//aqui crea el token del usuarioq mandamos y usa servicio token    
//     })
// }
///////////////////////////////////
// function decode(req,res){//vericar si existe email en la bd si existe damos acceso creando un token
    // console.log(req.body)
    // var user={
    //     token:service.decodeToken(req.body.token)
    // }
    // console.log(user)

    // Director.findOne({
    //     rudi : req.body.rudi,
    //     ci : req.body.ci
    //     }). exec ( (err,user)=>{
    //         if(err){res.status(500).send({message:err})}
    //         if (user == null)res.status(404).send({message:'no existe el director'})
    //         if (user != null){
    //             res.status(200).send({
    //                         message:'estas registrado',
    //                         token:service.createToken(user),
    //                         user
    //             })
    //         }
        
    // })
// }
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><<<<>>>><<>
//mostrar todos los usuarios 
function getUsers(req,res){
    Users.find({},(err,user)=>{
        if(err) return res.status(500).send({message:`error en la peticion peticion: ${err}`})
        if(user.length==0) return res.status(404).send({message:'no existe usuarios'})
        res.send(200,{user})
    })
}
//mostrar todos los usuarios de un la ultima gestion creada
function getUsersges(req,res){
    Gestion.find({},(err,gestion)=>{
        if(err) return res.status(500).send({message:`error en la peticion: ${err}`})
        if(gestion.length==0 ||gestion[gestion.length-1].nombre=='nada') return res.status(404).send({message:'no existe gestines programadas recientemente'})
        var g=gestion[gestion.length-1].nombre
        Users.find({"gestion":g},(err,user)=>{
            if(err) return res.status(500).send({message:`error en la peticion peticion: ${err}`})
            if(user.length==0) return res.status(404).send({message:'no existe usuarios en la gestion'})
            res.send(200,{message:'exito',user})
        })
    })
}
//muestra las cantidades de usuarios por rol de la ultima gestion
function cant(req,res){
    Gestion.find({},(err,gestion)=>{
        if(err) return res.status(500).send({message:`error en la peticion: ${err}`})
        if(gestion.length==0 ||gestion[gestion.length-1].nombre=='nada') return res.status(404).send({message:'no existe gestines programadas recientemente'})
        var g=gestion[gestion.length-1].nombre
        Users.find({"rol":"administrador"},(err,user)=>{
            if(err) return res.status(500).send({message:`error en la peticion peticion: ${err}`})
            var a=user.length
            Users.find({"gestion":g,"rol":"docente"},(err,user)=>{
                if(err) return res.status(500).send({message:`error en la peticion peticion: ${err}`})
                var d=user.length
                Users.find({"gestion":g,"rol":"estudiante"},(err,user)=>{
                    if(err) return res.status(500).send({message:`error en la peticion peticion: ${err}`})
                    var e=user.length
                    res.send(200,{message:'exito',a,d,e})
                })
            })
        })
    })
}
//mostrar usuario por id
function getUser(req, res){
    let userId =req.params.userId
    Users.findById(userId,(err,user)=>{
        if(err)return res.status(500).send({message:`error en la peticion: ${err}`})
        if(!user)return res.status(404).send({message:`el user no existe`})
        res.status(200).send({user,message:'exito'})
    })
}
//registrar un usuario individualmente
function saveUser(req,res){
    Gestion.find({},(err,gestion)=>{
        if(err) return res.status(500).send({message:`error en la peticion de gestiones: ${err}`})
        if(gestion.length==0){
            return res.status(404).send({message:'no existen gestiones programadas ......programe nueva gestion'})
        }else{
            if(gestion[gestion.length-1].nombre=='nada'){return res.send({message:`Error cree una nueva gestion`})}
            else{
                Materia.find({"gestion":gestion[gestion.length-1].nombre},(err,materia)=>{
                    if(err) return res.status(500).send({message:`error en la peticion de materias: ${err}`})
                    if(materia.length==0) {
                        return res.status(404).send({message:'no existen materias programadas.....en la gestion'})
                    }else{
                        // console.log("exito");
                        if(req.body.rol=='estudiante'){
                            let user=new Users()
                            user.ru=req.body.ru
                            user.ci=req.body.ci
                            user.rol=req.body.rol
                            user.gestion=gestion[gestion.length-1].nombre
                            // user.pago=req.body.pago
                            user.username=req.body.ru
                            user.password=req.body.ci
                            //si la materia esta en la base de datos de la materia la programa con sigla y grupo
                            for(var j=0;j<materia.length;j++){
                                if(materia[j].sigla==req.body.materia_1 & materia[j].grupo==req.body.Gmateria_1){user.materia_1=req.body.materia_1, user.Gmateria_1=req.body.Gmateria_1}
                                if(materia[j].sigla==req.body.materia_2 & materia[j].grupo==req.body.Gmateria_2){user.materia_2=req.body.materia_2, user.Gmateria_2=req.body.Gmateria_2}
                                if(materia[j].sigla==req.body.materia_3 & materia[j].grupo==req.body.Gmateria_3){user.materia_3=req.body.materia_3, user.Gmateria_3=req.body.Gmateria_3}
                                if(materia[j].sigla==req.body.materia_4 & materia[j].grupo==req.body.Gmateria_4){user.materia_4=req.body.materia_4, user.Gmateria_4=req.body.Gmateria_4}
                                if(materia[j].sigla==req.body.materia_5 & materia[j].grupo==req.body.Gmateria_5){user.materia_5=req.body.materia_5, user.Gmateria_5=req.body.Gmateria_5}
                                if(materia[j].sigla==req.body.materia_6 & materia[j].grupo==req.body.Gmateria_6){user.materia_6=req.body.materia_6, user.Gmateria_6=req.body.Gmateria_6}
                                if(materia[j].sigla==req.body.materia_7 & materia[j].grupo==req.body.Gmateria_7){user.materia_7=req.body.materia_7, user.Gmateria_7=req.body.Gmateria_7}
                            }
                            // console.log(user)
                            user.save((err,userGuardado)=>{
                            if(err) res.status(500).send({message:`error al guardar datos: ${err}`})

                            res.status(200).send({userGuardado})
                            })
                        }
                        if(req.body.rol=='docente'){
                            let user=new Users()
                            user.ci=req.body.ci
                            user.rol=req.body.rol
                            user.gestion=gestion[gestion.length-1].nombre
                            user.username=req.body.nombre+req.body.apellido//union de nombres y apellidos
                            user.password=req.body.ci
                            //si la materia esta en la bas de datos de la materia la programa
                            for(var j=0;j<materia.length;j++){
                                if(materia[j].sigla==req.body.materia_1 & materia[j].grupo==req.body.Gmateria_1){user.materia_1=req.body.materia_1, user.Gmateria_1=req.body.Gmateria_1}
                                if(materia[j].sigla==req.body.materia_2 & materia[j].grupo==req.body.Gmateria_2){user.materia_2=req.body.materia_2, user.Gmateria_2=req.body.Gmateria_2}
                                if(materia[j].sigla==req.body.materia_3 & materia[j].grupo==req.body.Gmateria_3){user.materia_3=req.body.materia_3, user.Gmateria_3=req.body.Gmateria_3}
                                if(materia[j].sigla==req.body.materia_4 & materia[j].grupo==req.body.Gmateria_4){user.materia_4=req.body.materia_4, user.Gmateria_4=req.body.Gmateria_4}
                            }
                            // console.log(user)
                            user.save((err,userGuardado)=>{
                            if(err) res.status(500).send({message:`error al guardar datos: ${err}`})

                            res.status(200).send({userGuardado})
                            })
                        }
                        if(req.body.rol=='administrador'){
                            let user=new Users()
                            user.ci=req.body.ci
                            user.rol=req.body.rol
                            user.gestion=gestion[gestion.length-1].nombre
                            user.username=req.body.username
                            user.password=req.body.password
                            // console.log(user)
                            user.save((err,userGuardado)=>{
                            if(err) res.status(500).send({message:`error al guardar datos: ${err}`})

                            res.status(200).send({userGuardado})
                            })
                        }
                    }
                })
            }
        }
    })      
}
//funcion para actualizar datos de un usuario
// function updateUser(req,res){
//     let userId =req.params.userId
//     let update= req.body

//     Users.findByIdAndUpdate(userId,update,(err,userActualizado)=>{
//         if(err)res.status(500).send({message:`error al actualizar datos ${err}`})

//         res.status(200).send({userActualizado})
//     })
// }
//funcion para eliminar datos de un usuario
// function deletUser(req,res){
//     let userId =req.params.userId

//     Users.findById(userId,(err,user)=>{
//         if(err) res.status(500).send({message:`error al eliminar ${err}`})

//         user.remove(err=>{
//             if(err) res.status(500).send({message:`error al eliminar user ${err}`})
//             res.status(200).send({message:'el user a sido eliminado'})
//             console.log('uso del metodo delete')

//         })
//     })
// }
var datos1 = {}
function data1 (data, id){
    // for(i=0;i<)
    let algo = datos1[id];
    // console.log(algo)
    if(algo==algo){
        algo = datos1[id]={
            esto: data,
            qty:0
        };
    }
    algo.qty++;
}
///------<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<metodo para guardar varios datos de un objet json
function User(req,res){
    var output=req.body

        Gestion.find({},(err,gestion)=>{
            if(err) return res.status(500).send({message:`error en la peticion de gestiones: ${err}`})
            if(gestion.length==0){
                return res.status(404).send({message:'no existen gestiones programadas ......programe nueva gestion'})
            }else{
                if(gestion[gestion.length-1].nombre=='nada'){return res.send({message:`Error cree una nueva gestion`})}
                else{
                    var g=gestion[gestion.length-1].nombre
                    // console.log(g)
                    Materia.find({"gestion":g},(err,materia)=>{
                        if(err) return res.status(500).send({message:`error en la peticion de materias: ${err}`})
                        if(materia.length==0) {
                            return res.status(404).send({message:'no existen materias programadas en la gestion'})
                        }else{     
                            Users.find({"gestion":gestion[gestion.length-1].nombre,"rol":"estudiante"},(err,user)=>{
                                if(err) return res.status(500).send({message:`error en la peticion de users: ${err}`})
                                if(user.length==0) {
                                    // console.log(user.length,'=====================00')
                                    for(var i=0;i<output.length;i++){
                                        var user2=new Users()
                                            user2.ru= output[i].R_Uss 
                                            user2.ci=output[i].C_I
                                            // user.rol=output[i].rol//este guardara el rol como estudiante por defecto
                                            user2.gestion=gestion[gestion.length-1].nombre
                                            // user.pago=output[i].pago
                                            user2.username= output[i].R_Uss
                                            user2.password=output[i].C_I

                                            for(var j=0;j<materia.length;j++){
                                                if(materia[j].sigla==output[i].Materia_1 & materia[j].grupo==output[i].Grupo_M1){user2.materia_1=output[i].Materia_1, user2.Gmateria_1=output[i].Grupo_M1}
                                                if(materia[j].sigla==output[i].Materia_2 & materia[j].grupo==output[i].Grupo_M2){user2.materia_2=output[i].Materia_2, user2.Gmateria_2=output[i].Grupo_M2}
                                                if(materia[j].sigla==output[i].Materia_3 & materia[j].grupo==output[i].Grupo_M3){user2.materia_3=output[i].Materia_3, user2.Gmateria_3=output[i].Grupo_M3}
                                                if(materia[j].sigla==output[i].Materia_4 & materia[j].grupo==output[i].Grupo_M4){user2.materia_4=output[i].Materia_4, user2.Gmateria_4=output[i].Grupo_M4}
                                                if(materia[j].sigla==output[i].Materia_5 & materia[j].grupo==output[i].Grupo_M5){user2.materia_5=output[i].Materia_5, user2.Gmateria_5=output[i].Grupo_M5}
                                                if(materia[j].sigla==output[i].Materia_6 & materia[j].grupo==output[i].Grupo_M6){user2.materia_6=output[i].Materia_6, user2.Gmateria_6=output[i].Grupo_M6}
                                                if(materia[j].sigla==output[i].Materia_7 & materia[j].grupo==output[i].Grupo_M7){user2.materia_7=output[i].Materia_7, user2.Gmateria_7=output[i].Grupo_M7}
                                            }
                                            // console.log(user2,'1........')
                                            // user2.save
                                            user2.save((err,userG)=>{
                                                if(err) return res.status(500).send({message:`error al guardar datos del documento : ${err}`})
        
                                             // res.status(200).send({userGuardado})
                                                // console.log(userG)
                                            })
                                    }
                                    return res.status(200).send({msg2:'usuarios guardados satisfactoriamente'})
                                //compra datos con los usuarios de la base de datos
                                }else{
                                    // var g=gestion[gestion.length-1].nombre
                                    // console.log(g)
                                    // Users.find({"gestion":gestion[gestion.length-1],"rol":"estudiante"},(err,user1)=>{
                                    //         if(err) return res.status(500).send({message:`error en la peticion: ${err}`})
                                    //         if(user1.length==0){
                                    //         return res.status(404).send({message:'no existen estudiantes en la gestion'})
                                    //         res.send(200,{user})
                                    //         console.log(user1.length)
                                            var k=0
                                            for(var i=0;i<user.length;i++){
                                                // var h=0
                                                for(var j=0;j<output.length;j++){
                                                    if(user[i].ci==output[j].C_I){
                                                            // h++
                                                        // if(h==2){
                                                            k++
                                                            // res.send(output[i].C_I)
                                                            data1( output[j],k)
                                                            // data1(output[j], output[j].C_I)                         
                                                            // console.log(output[j],'essssstos',k)
                                                        // }
                                                    }
                                                }
                                            }
                                            if(k>=1){
                                                res.send({
                                                    msg1:datos1,
                                                    msg2:'usuarios repetidos',k
                                                })
                                                }else{
                                                    for(var i=0;i<output.length;i++){
                                                        
                                                        var user1=new Users()
                                                        user1.ru= output[i].R_Uss 
                                                        user1.ci=output[i].C_I
                                                        // user1.rol=output[i].rol//este guaradara con estudiante por defecto
                                                        user1.gestion=gestion[gestion.length-1].nombre
                                                        // user1.pago=output[i].pago
                                                        user1.username= output[i].R_Uss
                                                        user1.password=output[i].C_I  
                                                            for(var j=0;j<materia.length;j++){
                                                                if(materia[j].sigla==output[i].Materia_1 & materia[j].grupo==output[i].Grupo_M1){user1.materia_1=output[i].Materia_1, user1.Gmateria_1=output[i].Grupo_M1}
                                                                if(materia[j].sigla==output[i].Materia_2 & materia[j].grupo==output[i].Grupo_M2){user1.materia_2=output[i].Materia_2, user1.Gmateria_2=output[i].Grupo_M2}
                                                                if(materia[j].sigla==output[i].Materia_3 & materia[j].grupo==output[i].Grupo_M3){user1.materia_3=output[i].Materia_3, user1.Gmateria_3=output[i].Grupo_M3}
                                                                if(materia[j].sigla==output[i].Materia_4 & materia[j].grupo==output[i].Grupo_M4){user1.materia_4=output[i].Materia_4, user1.Gmateria_4=output[i].Grupo_M4}
                                                                if(materia[j].sigla==output[i].Materia_5 & materia[j].grupo==output[i].Grupo_M5){user1.materia_5=output[i].Materia_5, user1.Gmateria_5=output[i].Grupo_M5}
                                                                if(materia[j].sigla==output[i].Materia_6 & materia[j].grupo==output[i].Grupo_M6){user1.materia_6=output[i].Materia_6, user1.Gmateria_6=output[i].Grupo_M6}
                                                                if(materia[j].sigla==output[i].Materia_7 & materia[j].grupo==output[i].Grupo_M7){user1.materia_7=output[i].Materia_7, user1.Gmateria_7=output[i].Grupo_M7}
                                                            }
                                                            console.log(user1)
                                                            // user.save
                                                            user1.save((err,userGuardado)=>{
                                                                // if(err) return res.status(500).send({message:`error al guardar datos del documento : ${err}`})
                                                                console.log(err)
                                                                // res.status(200).send({userGuardado})
                                                                // console.log('guardado'+i)
                                                            })
                                                    }
                                                    // console.log(user1)
                                                    res.status(200).send({msg2:'usuarios guardados satisfactoriamente'})
                                            }
                                      //  }//
                                    //})
                                  
                                }
                            })   
                        }
                    })
                }
            }
        })
      
}
//////////////////////////////////////////////////////////////////7


//mostrar users estudiantes de la ultima gestion
function getUsE(req,res){
    Gestion.find({},(err,gestion)=>{
        if(err) return res.status(500).send({message:`error en la peticion: ${err}`})
        if(gestion.length==0 ||gestion[gestion.length-1].nombre=='nada') return res.status(404).send({message:'no existe gestines programadas recientemente'})
        var g=gestion[gestion.length-1].nombre
        console.log(g)
        Users.find({"gestion":g,"rol":"estudiante"},(err,user)=>{
            if(err) return res.status(500).send({message:`error en la peticion: ${err}`})
            if(user.length==0) return res.status(404).send({message:'no existen estudiantes en la gestion'})
            res.send(200,{user})
        })
    })
}
//mostrar users docente de la ultima gestion
function getUsD(req,res){
    Gestion.find({},(err,gestion)=>{
        if(err) return res.status(500).send({message:`error en la peticion: ${err}`})
        if(gestion.length==0 ||gestion[gestion.length-1].nombre=='nada') return res.status(404).send({message:'no existe gestines programadas recientemente'})
        var g=gestion[gestion.length-1].nombre
        console.log(g)
        Users.find({"gestion":g,"rol":"docente"},(err,user)=>{
            if(err) return res.status(500).send({message:`error en la peticion: ${err}`})
            if(user.length==0) return res.status(404).send({message:'no existen Docentes en la gestion'})
            res.send(200,{user})
        })
    })
}
//mostrar users Administradores de la ultima gestion
function getUsA(req,res){
    Gestion.find({},(err,gestion)=>{
        if(err) return res.status(500).send({message:`error en la peticion: ${err}`})
        if(gestion.length==0 ||gestion[gestion.length-1].nombre=='nada') return res.status(404).send({message:'no existe gestines programadas recientemente'})
        var g=gestion[gestion.length-1].nombre
        console.log(g)
        Users.find({"gestion":g,"rol":"administrador"},(err,user)=>{
            if(err) return res.status(500).send({message:`error en la peticion: ${err}`})
            if(user.length==0) return res.status(404).send({message:'no existen administradores en la gestion'})
            res.send(200,{user})
        })
    })
}
//para eliminar un usuario
async function deletU (req, res, next) {
    let { id } = req.params;
    await Users.remove({_id: id});
     res.status(200).send({message:'El Usuario a sido eliminado'})
     
}
//ver que usuario se editara
async function verEdit (req, res, next) {
    const user = await Users.findById(req.params.id);
    console.log(user)
     res.status(200).json({
        'msn' : user
     });
}
//edita los datos del usuario
async function updateUser (req, res, next) {
    const { id } = req.params;
    var rol=req.body.rol
    await Users.update({_id: id}, req.body);//rq.body datos del formulario fronend
    res.status(200).json({
       'msn' : "actualizado correctamente",rol
    });
  }
////aqui cambiar el estado del Pago
async function pagoU (req, res, next) {
    let { id } = req.params;
   const user = await Users.findById(id);
   console.log(user)
   user.pago = !user.pago;
   await user.save();
   res.status(200).json({
      message: "ACTUALIZADO"
   });
}

//exportando todas las funciones 
module.exports={
    getUsers,
    getUser,
    saveUser,
    updateUser,
    deletU,
    verEdit,
    User,
    getUsE,
    getUsD,
    getUsA,
    pagoU,
    getUsersges,
    cant
    // decode
    // registroDirec,
    // ingresoDirec
}