/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('produtos', function(table) {
    table.increments('id').primary();
    table.string('descricao').notNullable();
    table.string('marca').notNullable();
    table.decimal('valor', 10, 2).notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('produtos');
};