import moment from 'moment';
import uuid from 'uuid';

class Meetup {
  constructor() {
    this.meetups = [];
  }

  create(data) {
    const meetup = {
      meetupId: uuid.v4(),
      createdOn: moment.now(),
      location: data.location,
      images: data.images || '',
      topic: data.topic,
      happeningOn: data.happeningOn, //! IMPORTANT mm/dd/yyyy
      tags: data.tags,
    };
    this.meetups.push(meetup);
    return meetup;
  }

  getAll() {
    return this.meetups;
  }

  getOne(meetupId) {
    return this.meetups.find(meetup => meetup.meetupId === meetupId);
  }

  upcomings() {
    const upcoming = this.meetups.filter(meetup => new Date(meetup.happeningOn) > new Date());
    return upcoming;
  }

  delete(meetupId) {
    // use getOne method to get the meetup
    const delMeetup = this.meetups.find(meetup => meetup.meetupId === meetupId);
    // find index of delMeetup for use in splice
    const index = this.meetups.indexOf(delMeetup);
    // Now splice out!
    this.meetups.splice(index, 1);
    return {};
  }
}

export default new Meetup();
