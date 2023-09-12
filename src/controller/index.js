import nodemailer from "nodemailer";
import dotenv from "dotenv";
import hbs from 'nodemailer-express-handlebars';
import path from 'path';

dotenv.config();

const templatePath = '../view/';

export async function receiveEmail(req, res) {
  const email = req.body.email;

  try {
    // Configuração do provedor
    // Habilitar 2 step verification e criar um app password no seu provedor, antes de rodar a api.
    const smtp = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const handlebarOptions = {
      viewEngine: {
        extName: ".handlebars",
        partialsDir: path.resolve(__dirname, templatePath),
        defaultLayout: false,
      },
      viewPath: path.resolve(__dirname, templatePath),
      extName: ".handlebars",
    };

    smtp.use('compile', hbs(handlebarOptions));

    // Lista de emails que quero enviar (buscar do banco de dados)
    const lista = [
      { nome: "", email: email },
    ];

    // Chamar a configuração do e-mail e passar como parâmetro para quem vai ser enviado.
    // Disparar e-mail
    const emailPromises = lista.map(async (pessoa) => {
      const emailConfig = {
        from: "manoeudavi20@gmail.com",
        to: pessoa.email,
        subject: "Teste da API",
        template: 'main',
      };

      return await smtp.sendMail(emailConfig);
    });

    const results = await Promise.all(emailPromises);
    console.log(results);
    res.status(200).send()
    smtp.close();
  } catch (error) {
    console.log("Erro ao enviar os emails:", error);
    smtp.close();
  }
}
