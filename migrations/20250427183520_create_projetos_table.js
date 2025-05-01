exports.up = (knex) =>
  knex.schema.createTable("projetos", (table) => {
    table.increments("id");
    table.text("name");
    table.text("link");

    table.text("description");
    table.text("tags");

    table.timestamp("created_at").default(knex.fn.now());
    table.timestamp("updated_at").default(knex.fn.now());
  });

exports.down = (knex) => knex.schema.dropTable("projetos");
