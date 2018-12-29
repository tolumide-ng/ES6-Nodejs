import meetupsModel from '../models/meetups';

const Meetups = {
  create(req, res) {
    // all the parameters below are required
    if (!req.body.location && !req.body.topic && !req.body.happeningOn && !req.body.tags) {
      return res.status(400).json({
        message: 'All fields are required',
      });
    }
    // call the create function from models, present req.body as argument i.e data
    const createdMeetup = meetupsModel.create(req.body);
    return res.status(201).json({
      // values to be rendered
      topic: createdMeetup.topic,
      location: createdMeetup.location,
      happeningOn: createdMeetup.happeningOn,
      tags: createdMeetup.tags,
    });
  },

  findOne(req, res) {
    const theMeetup = meetupsModel.getOne(req.params.meetupId);
    // null would return true if used as if decisor
    if (theMeetup.length === 0) {
      return res.status(404).json({
        message: 'Meetup not found',
      });
    }
    return res.status(200).json({
      meetupId: theMeetup.meetupId,
      topic: theMeetup.topic,
      location: theMeetup.location,
      happeningOn: theMeetup.happeningOn,
      tags: theMeetup.tags,
    });
  },

  findAll(req, res) {
    const allMeetups = meetupsModel.getAll();
    if (allMeetups.length === 0) {
      return res.status(200).json({
        message: 'There are no meetups',
      });
    }
    return res.status(200).json({
      meetupId: allMeetups.meetupId,
      title: allMeetups.title,
      location: allMeetups.location,
      happeningOn: allMeetups.happeningOn,
      tags: allMeetups.tags,
    });
  },

  allUpcomings(req, res) {
    const upcomingMeetups = meetupsModel.upcomings();
    if (upcomingMeetups === 0) {
      return res.status(200).json({
        message: 'No upcoming meetups',
      });
    }
    return res.status(200).json({
      meetupId: upcomingMeetups.meetupId,
      title: upcomingMeetups.title,
      location: upcomingMeetups.location,
      happeningOn: upcomingMeetups.happeningOn,
      tags: upcomingMeetups.tags,
    });
  },

  deleteMeetup(req, res) {
    // Is this a real meetup?
    const confirm = meetupsModel.getOne(req.params.meetupId);
    if (confirm.length === 0) {
      return res.status(404).json({
        message: 'Meetup not found',
      });
    }
    return res.status(200).json({
      message: 'Meetup deleted',
    });
  },
};

export default Meetups;
