import { ErrorRequestHandler } from 'express';

import { HttpException } from '../shared/utils/http-exception';

export const errorHandler: ErrorRequestHandler = (err, _, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  if (err instanceof HttpException) {
    res.status(err.status).json({ message: err.message });
  } else {
    console.error(err.stack);
    res
      .status(500)
      .json({ message: 'There is a server problem, try again later' });
  }
};
