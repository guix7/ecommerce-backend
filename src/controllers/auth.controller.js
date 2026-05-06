import {
  register,
  login,
  esqueceuSenha,
  redefinirSenha,
} from "../services/auth.service.js";
import transportar from "../config/mailer.js";

async function postRegister(req, res, next) {
  try {
    const data = req.body;
    const user = await register(data);

    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
}

async function postLogin(req, res, next) {
  try {
    const data = req.body;
    const user = await login(data, res);

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

async function postForgotSenha(req, res, next) {
  const { email } = req.body;

  try {
    const resultado = await esqueceuSenha(email);
    const token = resultado.token;

    const link = `http://localhost:5173/reset-password?token=${token}`;

    const mailOptions = {
      from: '"Estampas Pro" <guideoliveira2197@gmail.com>',
      to: email,
      subject: "Redefinição de senha - Estampas Pro",
      html: `
            <div style="font-family: sans-serif; color: #333;">
          <h2>Você solicitou a redefinição de senha?</h2>
          <p>Clique no botão abaixo para escolher uma nova senha. Este link expira em 1 hora.</p>
          <a href="${link}" style="background: #2563eb; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Redefinir Minha Senha</a>
          <p>Se você não solicitou isso, ignore este e-mail.</p>
        </div>
            `,
    };

    await transportar.sendMail(mailOptions);

    res
      .status(200)
      .json({ message: "E-mail de recuperação enviado com sucesso!" });
  } catch (error) {
    next(error);
  }
}

async function postResetSenha(req, res, next) {
  try {
    const { token, senha } = req.body;
    await redefinirSenha(token, senha);

    return res.status(200).json({ message: "Senha alterada com sucesso" });
  } catch (error) {
    next(error);
  }
}
export { postRegister, postLogin, postForgotSenha, postResetSenha };
