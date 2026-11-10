import {
  register,
  login,
  esqueceuSenha,
  redefinirSenha,
} from "../services/auth.service.js";
import enviarEmailRecuperacao from "../config/mailer.js";

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
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    const link = new URL("/reset-password", frontendUrl);
    link.searchParams.set("token", resultado.token);

    await enviarEmailRecuperacao({ to: email, link: link.toString() });

    res.status(200).json({
      message: "E-mail de recuperação enviado com sucesso!",
    });
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
