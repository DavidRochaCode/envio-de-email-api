const express = require("express")
const nodemailer = require("nodemailer")
require('dotenv').config();


// Configuração do provedor 
const smtp = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
})

//atewivar 2 step verification e criar um App password na sua conta

// Configuração do Email (Repository)
const emailConfig = {
    from: "manoeudavi20@gmail.com",
    to: "manoeudavi3@gmail.com",
    subject: "Utimo teste",
    html: "<p>David, isso aqui é um teste para confirmar a API</p>"
}

// Disparar email ( função)

    // chamar a configuração do e-mail e passar como parâmetro para quem vai ser enviado.
    smtp.sendMail(emailConfig)
        .then(message => {
            smtp.close()
            console.log(message)
        }).catch(error => {
            console.log(error)
            smtp.close()
        })

const app = express()
app.listen(3002, () => {
    console.log("Servidor iniciado")
})

