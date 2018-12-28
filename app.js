import express from 'express';
import meetupRoutes from './api/v1/routes/meetups';

const app = express();

meetupRoutes(app);


app.use((req, res, next) => {
  const error = new Error('Bad Request, Route not found');
  error.status = 400;
  next(error);
});

app.use((error, req, res) => {
  res.status(error.statusCode || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

export default app;
