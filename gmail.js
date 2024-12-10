const nodemail = require("nodemailer");
const express = require("express");
const cors = require("cors");

const sender = nodemail.createTransport({
    host:"smtp.gmail.com",
    port:"465",
    secure:true,
    auth:{
        user:"wallondolaila@gmail.com",
        //pass:"laila0101*"
        pass:"yiag baer tkdl ajco"
    }
})

const server = express();
server.use(cors());
server.use(express.json())

server.get("/",async(req,resp)=>{
    server.use(cors());
    console.log("rodou o / na normalidade")

    return  resp.status(200).send("tudo feito na entrada")
})
server.post("/sms_gmail",async(req,resp)=>{
    server.use(cors())

        await sender.sendMail({
            // de momento tá fixo , depois vai ser dinamico , se aceitarem , mas eu vou faze-lo 
            //só pra teste e agregação de conhecimento
            from:"wallondolaila@gmail.com",
            to:"0l0a0i0l0a0@gmail.com",
            subject:"Teste de hospedagem na vercel 02",
           // html:"<h2>Olá Lalia</h2> <br/> confira os nossos produtos atualizados <a href='www.facebook.com'>facebook</a>",
            text:"ola senhor Laila"
        }) 
        //teste de acrescimo
    .then((response)=>{
        console.log("tudo fine aqui")
        console.log(response)

    return  resp.status(200).send("tudo feito")
    })
    .catch((err)=>{
        console.log(err)
        console.log("deu erro aqui")

        return  resp.status(400).send("err o de envio")
    })


})

server.listen(3001,()=>{
    console.log("server sms_gmail rodando na porta 3001")
})