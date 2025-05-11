const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class ProjetosController {
  async create(request, response) {
    const { name, description, link, tags } = request.body;

    let tagsString;

    if (tags != "") {
      tagsString = tags.join(",");
    }

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

    const deleted = await knex("projetos").where({ id }).del();

    return response.json(deleted);
  }

  async index(request, response) {
    const { search } = request.query;

    let query;

    if (search != undefined) {
      query = await knex("projetos")
        .whereRaw("LOWER(name) LIKE ?", [`%${search.toLowerCase()}%`])
        .orWhereRaw("LOWER(tags) LIKE ?", [`%${search.toLowerCase()}%`]);
    } else {
      query = await knex("projetos");
    }

    return response.json(query);
  }

  async update(request, response) {
    const { name, description, link, tags } = request.body;

    const { id } = request.params;
    const tagsString = tags.join(",");
    console.log(tagsString);
    const projeto = await knex("projetos").where({ id }).first();

    if (!projeto) {
      throw new AppError("Site não encontrado");
    }

    projeto.name = name;
    projeto.description = description;
    projeto.link = link;
    (projeto.tags = tagsString),
      // Inserindo dados no banco
      await knex("projetos").where({ id }).update(projeto);

    return response.json();
  }
}

module.exports = ProjetosController;
