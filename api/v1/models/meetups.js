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

  delete(meetupId) {
    // use getOne method to get the meetup
    const delMeetup = this.meetups.getOne(meetupId);
    // find index of delMeetup for use in splice
    const index = this.meetups.indexOf(delMeetup);
    // Now splice out!
    this.meetups.splice(index, 1);
    return {};
  }
}

export default new Meetup();
