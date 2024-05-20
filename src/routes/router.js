import { parse } from 'url';

import { userRouter } from './user/userRouter.js';

export const router = (req, res) => {
    const parsedUrl = parse(req.url, true);
    const path = parsedUrl.pathname;

    res.setHeader('Content-Type', 'application/json');

    if (path === '/users' || path.startsWith('/users')) {
        userRouter(req, res, path);
    } else {
        res.writeHead(404);
        res.end(JSON.stringify({ message: 'Route not found' }));
    }
};
