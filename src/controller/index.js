import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const templatePath = '../view/';

export async function receiveEmail(req, res) {
  const email = req.body.email;
  const produto = req.body.produto

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

/*     const handlebarOptions = {
      viewEngine: {
        extName: ".handlebars",
        partialsDir: path.resolve(__dirname, templatePath),
        defaultLayout: false,
      },
      viewPath: path.resolve(__dirname, templatePath),
      extName: ".handlebars",
    };

    smtp.use('compile', hbs(handlebarOptions)); */

    // Lista de emails que quero enviar (buscar do banco de dados)
    const lista = [
      { nome: "", email: email },
    ];


    const emailBody = `
      <!DOCTYPE html>
      <html>
      <head>
          <title>Confirmação de Doação</title>
      </head>
      <body>
          <h1>Confirmação de Doação</h1>
          <p>Olá,</p>
          <p>Este é um e-mail de confirmação da doação do produto "${produto}" no Doe+.</p>
          <p>Estamos felizes pela sua ajuda..</p>
      </body>
      </html>
    `;


    // Chamar a configuração do e-mail e passar como parâmetro para quem vai ser enviado.
    // Disparar e-mail
    const emailPromises = lista.map(async (pessoa) => {
      const emailConfig = {
        from: "manoeudavi20@gmail.com",
        to: pessoa.email,
        subject: "Confirmação de doação",
        html: emailBody
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
