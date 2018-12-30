import moment from 'moment';
import meetupsModel from './meetups';

class Questions {
  constructor() {
    this.questions = [];
  }

  askQuestion(data) {
    const theMeetup = meetupsModel.getOne(data.meetupId);
    const theQuestion = {
      questionId: Date.now(),
      createdOn: moment.now(),
      createdBy: data.createdBy, // Should be taken from User Model
      meetup: theMeetup.meetup, // Taken from meetup Model
      title: data.title,
      body: data.body,
      upVotes: data.upVotes,
      downVotes: data.downVotes,
    };
    this.questions.push(theQuestion);
  }

  getOne(meetupId) {
    return this.questions.find(question => question.id === meetupId);
  }

  upvote(questionId) {
    const theQuestion = this.getOne(questionId);
    const index = this.questions.indexOf(theQuestion);
    this.questions[index].upVotes += 1;
    return this.questions[index];
  }

  downvote(questionId) {
    const theQuestion = this.getOne(questionId);
    const index = this.questions.indexOf(theQuestion);
    this.questions[index].downVotes += -1;
    return this.questions[index];
  }

  // delete a question formerly asked
  delete(questionId) {
    const theQuestion = this.getOne(questionId);
    const index = this.questions.indexOf(theQuestion);
    this.questions.splice(index, 1);
    return {};
  }
}

export default new Questions();
