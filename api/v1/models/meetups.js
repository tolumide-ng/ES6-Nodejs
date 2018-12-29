import moment from 'moment';

class Meetup {
  constructor() {
    this.meetups = [];
  }

  create(data) {
    const meetup = {
      meetupId: Date.now(),
      createdOn: moment.now(),
      location: data.location,
      images: data.images || '',
      topic: data.topic,
      happeningOn: data.happeningOn, //! IMPORTANT mm/dd/yyyy
      Tags: data.tags,
    };
    this.meetups.push(meetup);
    return meetup;
  }

  getOne(meetupId) {
    return this.meetups.find(meetup => meetup.meetupId === meetupId);
  }

  getAll() {
    return this.meetups;
  }

  upcomings() {
    const upcoming = this.meetups.filter(meetup => new Date(meetup.happeningOn) > new Date());
    return upcoming;
  }
}

export default new Meetup();
