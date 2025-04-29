const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class ProjetosController {
  async create(request, response) {
    const { name, description, link, tags } = request.body;

    const tagsString = tags.join(",");

    const projetos = await knex("projetos").insert({
      name,
      description,
      link,
      tags: tagsString,
    });

    return response.status(201).json(projetos);
  }

  async delete(request, response) {
    const { id } = request.params;

    return response.json();
  }

  async index(request, response) {
    const { search } = request.query;

    let query;

    if (search != undefined) {
      query = await knex("projetos")
        .whereLike("name", `%${search}%`)
        .orWhereLike("tags", `%${search}%`);
    } else {
      query = await knex("projetos");
    }

    return response.json(query);
  }
}

module.exports = ProjetosController;
