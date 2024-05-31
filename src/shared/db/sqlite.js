import knex from 'knex';

const db = knex({
    client: process.env.DB_CLIENT,
    connection: {
        filename: process.env.DB_CONNECTION_FILENAME
    }
});

await db.schema
    .createTableIfNotExists('users', table => {
        table.increments('id');
        table.string('name').notNullable();
        table.integer('age').notNullable();
    });

export default db;
