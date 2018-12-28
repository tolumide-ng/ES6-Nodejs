import express from 'express';
/* import meetupRoutes from './api/v1/routes/meetups' */

const app = express();

app.use((req, res) => {
  res.status(200).json({
    message: 'first confirmation',
  });
});


export default app;
