import nodemailer from "nodemailer";

async function enviarEmailRecuperacao({ to, link }) {
  const { SMTP_USER, SMTP_PASS, RESET_EMAIL_FROM } = process.env;

  if (!SMTP_USER || !SMTP_PASS || !RESET_EMAIL_FROM) {
    const error = new Error("Serviço de e-mail não configurado");
    error.status = 503;
    throw error;
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp-relay.brevo.com",
    port: Number(process.env.SMTP_PORT || 2525),
    secure: false,
    requireTLS: true,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
  });

  return transporter.sendMail({
    from: RESET_EMAIL_FROM,
    to,
    subject: "Redefinição de senha - Estampas Pro",
    html: `
      <div style="font-family: sans-serif; color: #333;">
        <h2>Você solicitou a redefinição de senha?</h2>
        <p>Clique no botão abaixo para escolher uma nova senha. Este link expira em 1 hora.</p>
        <a href="${link}" style="background: #2563eb; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Redefinir Minha Senha</a>
        <p>Se você não solicitou isso, ignore este e-mail.</p>
      </div>
    `,
  });
}

export default enviarEmailRecuperacao;
