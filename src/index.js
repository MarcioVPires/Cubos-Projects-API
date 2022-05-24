const express = require("express");
const app = express();
const rotas = require("./rotas")
const port = 3000


app.use(express.json());

app.use(rotas)


app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})