const express = require("express")
const nodemailer = require("nodemailer")
require('dotenv').config();


// Configuração do provedor 
let smtp = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

//lista de emails que quero enviar ( buscar do banco de dados)
const lista = [
    { nome: "David", email: "manoeudavi3@gmail.com" },
    { nome: "Adalto", email: "adalto21lopes13rocha@gmail.com" }
];


// chamar a configuração do e-mail e passar como parâmetro para quem vai ser enviado.
//Disparar e-mail
const emailPromises = lista.map(pessoa => {
    const emailConfig = {
        from: "manoeudavi20@gmail.com",
        to: pessoa.email,
        subject: "Último teste",
        html: `<p>Olá, ${pessoa.nome}, esse e-mail é para confirmar ...</p>`
    };

    return smtp.sendMail(emailConfig);
});

Promise.all(emailPromises)
    .then(results => {
        console.log(results);
        smtp.close();
    })
    .catch(error => {
        console.log("Erro ao enviar os emails:", error);
        smtp.close();
    });




        
const app = express()
app.listen(3003, () => {
    console.log("Servidor iniciado")
})
  
