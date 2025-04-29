const { Router } = require("express");
const ProjetosController = require("../controllers/ProjetosController");

const projetosRoutes = Router();
const projetosController = new ProjetosController();

projetosRoutes.post("/", projetosController.create);
projetosRoutes.delete("/:id", projetosController.delete);
projetosRoutes.get("/", projetosController.index);

module.exports = projetosRoutes;
