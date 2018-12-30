import moment from 'moment';
import meetupsModel from './meetups';

class Questions {
  constructor() {
    this.questions = [];
  }

  askQuestion(meetupId) {
    const theMeetup = meetupsModel.getOne(meetupId);
    const theQuestion = {
      questionId: Date.now(),
      createdOn: moment.now(),
      createdBy: meetupId.createdBy, // Should be taken from User Model
      meetup: theMeetup.meetup, // Taken from meetup Model
      title: meetupId.title,
      body: meetupId.body,
      votes: meetupId.votes,
    };
    this.questions.push(theQuestion);
  }

  getOne(meetupId) {
    return this.questions.find(question => question.id === meetupId);
  }

  upvote(meetupId) {
    const theQuestion = this.getOne(meetupId);
    const index = this.questions.indexOf(theQuestion);
    this.questions[index].votes += 1;
    return this.questions[index];
  }

  downvote(meetupId) {
    const theQuestion = this.getOne(meetupId);
    const index = this.questions.indexOf(theQuestion);
    this.questions[index].votes += -1;
    return this.questions[index];
  }

  // delete a question formerly asked
  delete(meetupId) {
    const theQuestion = this.getOne(meetupId);
    const index = this.questions.indexOf(theQuestion);
    this.questions.splice(index, 1);
    return {};
  }
}

export default new Questions();
