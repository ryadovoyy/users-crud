import { findUserById } from '../../data/sqlite-data.js';

export default async (req, res) => {
    const id = parseInt(req.url.split('/')[2]);
    const user = await findUserById(id);

    if (user) {
        res.writeHead(200);
        res.end(JSON.stringify(user));
    } else {
        res.writeHead(404);
        res.end(JSON.stringify({ message: 'User not found' }));
    }
};
