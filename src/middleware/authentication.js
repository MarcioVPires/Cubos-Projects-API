const { query } = require("../database/connection");
const jwt = require("jsonwebtoken");

async function authFilter(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ mensagem: "Não Autorizado" });
  }

  try {
    const token = authorization.replace("Bearer ", "").trim();
    const { id } = jwt.verify(token, "senhaDeToken");

    const { rowCount, rows } = await query(
      "select * from dindin_users where id = $1",
      [id]
    );

    if (rowCount <= 0) {
      return res.status(401).json({ message: "Não Autorizado" });
    }

    const [user] = rows;

    req.user = user;

    next();
  } catch (error) {
    return res.status(500).json({ mensagem: `Erro interno: ${error.message}` });
  }
}

module.exports = { authFilter };
