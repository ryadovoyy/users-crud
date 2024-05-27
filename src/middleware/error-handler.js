export const errorHandler = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    if (err.status) {
        res.status(err.status).json({ message: err.message });
    } else {
        console.error(err.stack);
        res.status(500).json({ message: 'There is a server problem, try again later' });
    }
};
