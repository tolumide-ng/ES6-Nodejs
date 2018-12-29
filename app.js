import express from 'express';
import bodyParser from 'body-parser';
import meetupRoutes from './api/v1/routes/meetups';
import questionRoutes from './api/v1/routes/questions';

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

meetupRoutes(app);
questionRoutes(app);


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
