const { Router } = require("express")
const projetosRouter = require("./projetos.routes")
const routes = Router()

routes.use("/projetos", projetosRouter)

module.exports = routes