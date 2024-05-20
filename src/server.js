import { createServer } from 'http';

import { router } from './routes/router.js';

const server = createServer(router);
const PORT = 3000;

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
