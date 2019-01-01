import meetupsModel from '../models/meetup';


const Meetups = {
  createMeetup(req, res) {
    // all the parameters below are required
    if (!req.body.topic && !req.body.location && !req.body.happeningOn && !req.body.tags) {
      return res.status(400).json({
        message: 'All fields are required',
      });
    }
    // call the create function from models, present req.body as argument
    const createdMeetup = meetupsModel.create(req.body);
    return res.status(201).json({
      // values to be rendered
      topic: createdMeetup.topic,
      location: createdMeetup.location,
      happeningOn: createdMeetup.happeningOn,
      tags: createdMeetup.tags,
      cratedOn: createdMeetup.createdOn,
    });
  },

  findOne(req, res) {
    const params = req.params.meetupId;
    const theMeetup = meetupsModel.getOne(params);
    if (!theMeetup) {
      return res.status(404).json({
        message: 'Meetup not found',
      });
    }
    return res.status(200).json({
      meetupId: theMeetup.meetupId,
      createdOn: theMeetup.createdOn,
      topic: theMeetup.topic,
      location: theMeetup.location,
      happeningOn: theMeetup.happeningOn,
      tags: theMeetup.tags,
    });
  },

  findAll(req, res) {
    const allMeetups = meetupsModel.getAll();
    if (allMeetups.length === 0) {
      res.status(200).json({
        message: 'No meetups at the moment',
      });
    }
    res.status(201).json({
      count: allMeetups.length,
      data: allMeetups.map(themeetup => ({
        meetupId: themeetup.meetupId,
        topic: themeetup.meetupId,
        location: themeetup.location,
        happeningOn: themeetup.happeningOn,
        tags: themeetup.tags,
      })),
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
      count: upcomingMeetups.length,
      data: upcomingMeetups.map(upcomingMeetup => ({
        meetupId: upcomingMeetup.meetupId,
        tiopic: upcomingMeetup.topic,
        location: upcomingMeetup.location,
        happeningOn: upcomingMeetup.happeningOn,
        tags: upcomingMeetup.tags,
      })),
    });
  },

  deleteMeetup(req, res) {
    // Is this a real Meetup?
    const confirm = -meetupsModel.getOne(req.params.meetupId);
    if (confirm) {
      meetupsModel.delete(req.params.meetupId);
      res.status(204).json({
        message: 'Deleted',
      });
    }
    res.status(404).json({
      message: 'Meetup not found',
    });
  },
};

export default Meetups;
