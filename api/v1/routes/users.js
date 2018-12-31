import users from '../models/users';

const routes = (app) => {
  app.route('/v1/singup')
    .post(users.signup);

  app.route('/v1/login')
    .post(users.login);

  app.route('/v1/user')
    .post(users.findUser);
};

export default routes;
