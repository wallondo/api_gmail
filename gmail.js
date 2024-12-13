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
    },
    connectionTimeout: 300000,  // Ajuste o tempo de conexão
    greetingTimeout: 300000,    // Ajuste o tempo de saudação
    socketTimeout: 300000
})

const server = express();
server.use(cors());
server.use(express.json())

server.get("/",async(req,resp)=>{
    server.use(cors());
    console.log("rodou o / na normalidade")

    return  resp.status(200).send("tudo feito na entrada")
})
server.post("/sms_gmail/:option",async(req,resp)=>{
    server.use(cors())

    if(req.params.option==1){
      async  function  send1(){
            server.use(cors())
            let tema = req.body.tema;
            let cliente = req.body.cliente;
            let email = req.body.email;
            let conteudo = req.body.conteudo;
            console.log(cliente)
            await sender.sendMail({
                // de momento tá fixo , depois vai ser dinamico , se aceitarem , mas eu vou faze-lo 
                //só pra teste e agregação de conhecimento
                from:"wallondolaila@gmail.com",
                to:email,
                subject:tema,
                html:"<h4>"+conteudo+"</h4>"+"</br>"+`<a href=${cliente}> Esplorar </a>`, 
                text:conteudo
            }) 
            //teste de acrescimo
            .then((response)=>{
            console.log("tudo fine aqui")
            console.log(response)

            return  resp.status(201).send({sms:"tudo feito",gmail:tema+"/"+cliente+"/"+conteudo})
            })
            .catch((err)=>{
            console.log(err)
            console.log("deu erro aqui")

            return  resp.status(400).send("err o de envio")
            })
        }
        send1()
    }else if(req.params.option==2){
    server.use(cors())

        let emails = [...req.body]
        let num=0;
        var dune = null;
        var sended = [];
      async  function send2(){
        console.log(emails)
            while(num<emails.length){
                let tema = emails[num].tema;
                let email = emails[num].to;
                let conteudo = emails[num].conteudo;
                await sender.sendMail({
                    // de momento tá fixo , depois vai ser dinamico , se aceitarem , mas eu vou faze-lo 
                    //só pra teste e agregação de conhecimento
                    from:"wallondolaila@gmail.com",
                    to:email,
                    subject:tema,
                    html:"<h4>"+conteudo+"</h4>"+"</br>", 
                    text:conteudo
                }) 
                //teste de acrescimo
                .then((response)=>{
                console.log("Email enviado para : "+emails[num].to)
                sended.unshift({destino:emails[num].to,conteudo:emails[num].conteudo,tema:emails[num].tema})
                dune = true;
                })
                .catch((err)=>{
                console.log(err)
                console.log("deu erro aqui")

                dune=false;
                })
                await delay(1000) 
                num++;
            }
            if(dune==false){
                return  resp.status(400).send({sms:"err o de envio"})
            }else if(dune==true){
            console.log("saiu")
                return  resp.status(201).send({sms:"tudo feito",sended})
            }
        }
        send2()
       
    }

    function delay(params) {
        return new Promise((resolve)=>{
            setTimeout(resolve,params)
        })
        
    }
})

server.listen(3001,()=>{
    console.log("server sms_gmail rodando na porta 3001")
})