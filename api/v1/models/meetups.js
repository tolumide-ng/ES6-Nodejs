import moment from 'moment';
import uuid from 'uuid';


class Meetup {
  constructor() {
    this.meetups = [];
    this.attending = [];
  }

  create(data) {
    const meetup = {
      meetupId: uuid.nv4(),
      createdOn: moment.now(),
      location: data.location,
      images: data.images || '',
      topic: data.topic,
      happeningOn: data.happeningOn, // MUST BE IN THR ORDER mm/dd/yyy
      tags: data.tags,
      attending: this.attending.length,
    };
    this.meetups.push(meetup);
    return meetup;
  }

  // NEW HERE
  attend(data) {
    const attend = {
      meetupId: data.meetupId,
      userId: data.userId,
    };
    this.attending.push(attend);
    return attend;
  }

  // NEW HERE
  findAttendingMeetup(meetupId) {
    return this.attending.filter(attends => attends.meetupId === meetupId);
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

  // NEW HERE --REMEMBER TO ADD THE EDIT METHOD FOR THE MEETUP
  edit(data) {
    // use the getOne method to find the meetup
    const theMeetup = this.getOne(data.meetupId);
    const index = this.meetups.indexOf(theMeetup);
    // Now you can do whatever you so wish on controllers endpoint
    this.meetups[index].images = data.images || theMeetup.images;
    this.meetups[index].topic = data.topic || theMeetup.topic;
    this.meetups[index].location = data.location || theMeetup.location;
    this.meetups[index].happeningOn = data.happeningOn || theMeetup.happeningOn;
    this.meetups[index].tags = data.tags || theMeetup.tags;
  }

  delete(meetupId) {
    // use getOne method to get the meetup, so let's find the meetup
    const delMeetup = this.meetups.find(meetup => meetup.meetupId === meetupId);
    // find index of delMeetup in meetups for use in splice
    const index = this.meetups.indexOf(delMeetup);
    // Now splice out!
    this.meetups.splice(index, 1);
    return {};
  }
}

export default new Meetup();
