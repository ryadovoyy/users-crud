import db from '../../shared/db/sqlite.js';

export const findAll = async () => await db.select('*').from('users');

export const save = async user => {
    const insertedUsers = await db
        .insert(user, ['id', 'name', 'age'])
        .into('users');

    return insertedUsers[0];
};

export const findById = async id => {
    const selectedUsers = await db
        .select('*')
        .from('users')
        .where('id', id);

    return selectedUsers[0];
};

export const update = async (id, data) => {
    const updatedUsers = await db('users')
        .update(data, ['id', 'name', 'age'])
        .where('id', id);

    return updatedUsers[0];
};

export const remove = async id => {
    const deletedUsersNumber = await db('users')
        .where('id', id)
        .del();

    return deletedUsersNumber === 1;
};
