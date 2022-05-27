const { query } = require("../database/connection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ mensagem: "Email e senha são campos obrigatórios" });
  }

  try {
    const { rowCount, rows } = await query(
      "select * from dindin_users where email = $1",
      [email]
    );

    if (rowCount <= 0) {
      return res
        .status(400)
        .json({ mensagem: "Email ou Senha estão incorretas" });
    }

    const [user] = rows;
    const truePassword = await bcrypt.compare(password, user.password);

    if (!truePassword) {
      return res
        .status(400)
        .json({ mensagem: "Email ou Senha estão incorretas" });
    }

    const token = jwt.sign({ id: user.id }, "senhaDeToken", {
      expiresIn: "8h",
    });

    const { password: _, ...userData } = user;

    return res.status(200).json({
      user: userData,
      token,
    });
  } catch (error) {
    return res.status(500).json({ mensagem: `Erro Interno: ${error.message}` });
  }
}

module.exports = { login };
