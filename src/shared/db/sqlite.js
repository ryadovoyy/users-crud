import knex from 'knex';

const db = knex({
    client: 'sqlite3',
    connection: {
        filename: './src/shared/db/data.db'
    }
});

await db.schema
    .createTableIfNotExists('users', table => {
        table.increments('id');
        table.string('name').notNullable();
        table.integer('age').notNullable();
    });

export default db;
