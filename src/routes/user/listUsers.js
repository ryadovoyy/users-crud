import { findAllUsers } from '../../data/sqlite-data.js';

export default async (req, res) => {
    res.writeHead(200);
    res.end(JSON.stringify(await findAllUsers()));
};
