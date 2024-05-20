import listUsers from './listUsers.js';
import createUser from './createUser.js';
import findUser from './findUser.js';
import updateUser from './updateUser.js';
import deleteUser from './deleteUser.js';

export const userRouter = (req, res, path) => {
    const method = req.method;

    if (path === '/users' && method === 'GET') {
        listUsers(req, res);
    } else if (path === '/users' && method === 'POST') {
        createUser(req, res);
    } else if (path.startsWith('/users') && method === 'GET') {
        findUser(req, res);
    } else if (path.startsWith('/users') && method === 'PUT') {
        updateUser(req, res);
    } else if (path.startsWith('/users') && method === 'DELETE') {
        deleteUser(req, res);
    } else {
        res.writeHead(404);
        res.end(JSON.stringify({ message: 'Route not found in users' }));
    }
};
