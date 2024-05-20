import knex from 'knex';

const db = knex({
    client: 'sqlite3',
    connection: {
        filename: './src/data/data.db'
    }
});

await db.schema
    .createTableIfNotExists('users', table => {
        table.increments('id');
        table.string('name').notNullable();
        table.integer('age').notNullable();
    });

export const findAllUsers = async () => await db.select('*').from('users');

export const saveUser = async user => {
    const insertedUsers = await db
        .insert(user, ['id', 'name', 'age'])
        .into('users');

    return insertedUsers[0];
};

export const findUserById = async id => {
    const selectedUsers = await db
        .select('*')
        .from('users')
        .where('id', id);

    return selectedUsers[0];
};

export const updateUser = async (id, data) => {
    const updatedUsers = await db('users')
        .update(data, ['id', 'name', 'age'])
        .where('id', id);

    return updatedUsers[0];
};

export const deleteUser = async id => {
    const deletedUsersNumber = await db('users')
        .where('id', id)
        .del();

    return deletedUsersNumber === 1;
};
