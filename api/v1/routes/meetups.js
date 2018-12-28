import { upcoming } from '../controllers/meetups';

console.log(upcoming);

const routes = (app) => {
  app.route('/upcoming')
    .get(upcoming);
};
export default routes;
