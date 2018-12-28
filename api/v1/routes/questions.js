import { createQuestion, upvote, downvote } from '../controllers/questions';

const routes = (app) => {
  app.route('/questions')
    .post(createQuestion);

  app.route('/questions/:questionId/upvote')
    .patch(upvote);

  app.route('./questions/:questionId/downvote')
    .patch(downvote);
};

export default routes;
