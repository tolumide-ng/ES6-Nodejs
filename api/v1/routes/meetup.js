import meetups from '../controllers/meetups';


const routes = (app) => {
	app.route('/v1/meetups')
		.get(meetups.findAll);

	app.route('/v1/meetups')
		.post(meetups.createMeetup);

	app.route('/v1/meetups/upcoming')
		.get(meetups.allUpcomings);

	app.route('/v1/meetups/:meetupId')
		.get(meetups.findOne);

	app.route('/v1/meetups/delete/:meetupId')
		.delete(meetups.deleteMeetup);

	app.route('/v1/meetups/attendees/:meetupId')
		.get(meetups.findAttending);

	app.route('/v1/meetups/edit')
		.get(meetups.edit);
};

export default routes;
