const users = []
let currentId = 1;

export const findAllUsers = () => users;

export const saveUser = user => {
    user.id = currentId++;
    users.push(user);
};

export const findUserById = id => users.find(user => user.id === id);

export const updateUser = (id, data) => {
    const userIndex = users.findIndex(user => user.id === id);

    if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], ...data };
        return users[userIndex];
    }
    return null;
};

export const deleteUser = id => {
    const userIndex = users.findIndex(user => user.id === id);

    if (userIndex !== -1) {
        users.splice(userIndex, 1);
        return true;
    }
    return false;
};
