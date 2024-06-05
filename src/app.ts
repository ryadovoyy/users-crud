import express from 'express';

import router from './api/router';
import { notFoundHandler } from './middleware/not-found-handler';
import { errorHandler } from './middleware/error-handler';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(router);
app.use(notFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
