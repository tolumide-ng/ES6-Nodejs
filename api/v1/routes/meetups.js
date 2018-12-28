import {
  upcoming, reply, allMeetups, specific, createMeetup,
} from '../controllers/meetups';

const routes = (app) => {
  app.route('/meetups/upcoming')
    .get(upcoming);

  app.route('/meetups/:meetupId/rsvps')
    .post(reply);

  app.route('/meetups')
    .get(allMeetups);

  app.route('/meetups/:meetup-id')
    .get(specific);

  app.route('/meetups')
    .post(createMeetup);
};

export default routes;
