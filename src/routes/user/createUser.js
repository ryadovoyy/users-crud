import { saveUser } from '../../data/sqlite-data.js';

export default (req, res) => {
    let body = '';

    req.on('data', chunk => {
        body += chunk;
    });

    req.on('end', async () => {
        const parsedBody = new URLSearchParams(body);
        const name = parsedBody.get('name');
        const age = parsedBody.get('age');

        if (name && age) {
            const parsedAge = parseInt(age);

            if (isNaN(parsedAge)) {
                res.writeHead(400);
                return res.end(JSON.stringify({ message: 'Please enter correct age' }));
            }

            const user = { name, age: parsedAge };
            const createdUser = await saveUser(user);

            res.writeHead(201);
            res.end(JSON.stringify(createdUser));
        } else {
            res.writeHead(400);
            res.end(JSON.stringify({ message: 'Name and age are required' }));
        }
    });
};
