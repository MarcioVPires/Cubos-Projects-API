const { query } = require("../database/connection");
const bcrypt = require("bcrypt");

async function userSignup(req, res) {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ mensagem: "Todos os campos são obrigatórios" });
  }

  try {
    const user = await query("select * from dindin_users where email = $1", [
      email,
    ]);

    if (user.rowCount > 0) {
      return res
        .status(400)
        .json({ mensagem: "O e-mail informado já está cadastrado" });
    }

    const cryptoPassword = await bcrypt.hash(password, 10);

    const insertUser =
      "insert into dindin_users (name, email, password) values ($1, $2, $3) returning *";

    const newUser = await query(insertUser, [name, email, cryptoPassword]);

    if (newUser.rowCount <= 0) {
      return res.status(500).json({ mensagem: "Internal Error" });
    }

    const { password: _, ...newUserInfo } = newUser.rows[0];

    return res.status(201).json(newUserInfo);
  } catch (error) {
    return res.status(500).json({ mensagem: `Erro interno: ${error.message}` });
  }
}

module.exports = { userSignup };
