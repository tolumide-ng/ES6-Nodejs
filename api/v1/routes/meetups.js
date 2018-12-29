import meetups from '../controllers/meetups';

/* {
  createMeetup, findOne, findAll, allUpcomings, deleteMeetup,
} */

const routes = (app) => {
  app.route('/v1/meetups')
    .get(meetups.findAll);

  app.route('/v1/meetups')
    .post(meetups.createMeetup);

  app.route('/v1/meetups/:meetupId')
    .get(meetups.findOne);

  app.route('/v1/meetups/upcoming')
    .get(meetups.allUpcomings);

  /*   app.route('/v1/meetups/:meetupId/rsvps')
    .post(reply); */

  app.route('/v1/meetups/delete')
    .get(meetups.deleteMeetup);
};

export default routes;
