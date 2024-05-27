import express from 'express';

import router from './api/router.js';

const PORT = 3000;

const main = async () => {
    const app = express();

    app.use(express.urlencoded({ extended: true }));
    app.use(router);

    app.use((req, res, next) => {
        res.status(404).json({ message: 'Route not found' });
    });

    app.use((err, req, res, next) => {
        console.error(err.stack);

        if (res.headersSent) {
            return next(err);
        }

        res.status(500).json({ message: 'There is a server problem, try again later' });
    });

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};

main().catch(err => {
    console.error(err);
});
