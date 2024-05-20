import { updateUser } from '../../data/sqlite-data.js';

export default (req, res) => {
    const id = parseInt(req.url.split('/')[2]);
    let body = '';

    req.on('data', chunk => {
        body += chunk;
    });

    req.on('end', async () => {
        const parsedBody = new URLSearchParams(body);
        const name = parsedBody.get('name');
        const age = parsedBody.get('age');

        if (!name && !age) {
            res.writeHead(400);
            return res.end(JSON.stringify({ message: 'Name or age is required' }));
        }

        const updatedData = {};

        if (name) {
            updatedData.name = name;
        }

        if (age) {
            const parsedAge = parseInt(age);

            if (isNaN(parsedAge)) {
                res.writeHead(400);
                return res.end(JSON.stringify({ message: 'Please enter correct age' }));
            }

            updatedData.age = parsedAge;
        }

        const updatedUser = await updateUser(id, updatedData);

        if (updatedUser) {
            res.writeHead(200);
            res.end(JSON.stringify(updatedUser));
        } else {
            res.writeHead(404);
            res.end(JSON.stringify({ message: 'User not found' }));
        }
    });
};
