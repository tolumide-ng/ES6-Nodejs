import meetupModel from '../models/meetups';

const Meetups = {
  createMeetup(req, res) {
    // all the parameters below are required
    // The OR condition checks if the date is past and rejects
    const data = req.body;
    const dateHappening = (new Date(data.happeningOn) < new Date());
    if (!data.topic && !data.location && !data.tags
      && !data.happeningOn && dateHappening) {
      return res.status(204).json({
        message: 'All fields are required',
        topic: req.body.topic,
      });
    }

    // call the create function from models, present req.body as argument
    const createdMeetup = meetupModel.create(data);
    return res.status(201).json({
      // render the following values
      topic: createdMeetup.topic,
      location: createdMeetup.location,
      happeningOn: createdMeetup.happeningOn,
      tags: createdMeetup.tags,
      createdOn: createdMeetup.createdOn,
    });
  },

  findOne(req, res) {
    const params = req.params.meetupId;
    const theMeetup = meetupModel.getOne(params);
    if (!theMeetup) {
      return res.status(404).json({
        message: 'Meetup Not Found',
      });
    }
    return res.status(200).json({
      meetup: theMeetup.meetupId,
      createdOn: theMeetup.createdOn,
      topic: theMeetup.topic,
      location: theMeetup.location,
      happeningOn: theMeetup.happeningOn,
      tags: theMeetup.tags,
    });
  },

  findAll(req, res) {
    const allMeetups = meetupModel.getAll();
    const count = allMeetups.length;
    // check if there are meetups at all
    if (count) {
      res.status(200).json({
        Meetups: count,
        data: allMeetups.map(meetup => ({
          meetup: meetup.meetupId,
          topic: meetup.topic,
          location: meetup.location,
          happeningOn: meetup.happeningOn,
          tags: meetup.tags,
        })),
      });
    }
    res.status(204).json({
      message: 'No content',
    });
  },

  allUpcomings(req, res) {
    const upcomingMeetups = meetupModel.upcomings();
    const theLength = upcomingMeetups.length;
    if (theLength === 0) {
      return res.status(204).json({
        message: 'No upcoming meetup',
      });
    }
    return res.status(200).json({
      count: upcomingMeetups.length,
      data: upcomingMeetups.map(upcomingMeetup => ({
        meetupId: upcomingMeetup.meetupId,
        topic: upcomingMeetup.topic,
        location: upcomingMeetup.location,
        happeningOn: upcomingMeetup.happeningOn,
        tags: upcomingMeetup.tags,
      })),
    });
  },

  deleteMeetup(req, res) {
    // Is this a real meetup?
    const confirm = meetupModel.getOne(req.body.meetupId);
    if (confirm) {
      meetupModel.delete(req.body.meetupId);
      res.status(204).json({
        message: 'Deleted',
      });
    }
    res.status(404).json({
      message: 'Meedtup not found',
    });
  },

  // NEW HERE
  edit(req, res) {
    const confirm = meetupModel.getOne(req.body.meetupId);/*
    const toEdit = meetupModel.edit(req.params.meetupId); */
    if (!confirm) {
      return res.status(404).json({
        message: 'Meetup not found',
      });
    }
    meetupModel.edit(req.body);
    return res.status(200).json({
      message: 'Update successful!',
    });
  },

  // NEW HERE
  findAttending(req, res) {
    // FIRST CONFIRM IF MEETUP EXIST IN MEETUPS
    // CONFIRM IF MEETUPS EXIST IN ATTENDING
    // RETURN LENGTH AND USERID (SINCE QUERY WOULD BE BY MEETUP)
    const meetupExist = meetupModel.getOne(req.params.meetupId);
    const confirm = meetupModel.attending.find(meetup => meetup.meetupId === req.params.meetupId);
    if (!meetupExist || !confirm) {
      return res.status(404).json({
        message: 'Meetup does not exist',
      });
    }
    return res.status(200).json({
      count: confirm.length,
      data: confirm.map(people => ({
        meetupId: people.meetupId,
        userId: people.userId,
      })),
    });
  },
};

export default Meetups;
