import moment from 'moment';
import uuid from 'uuid';
import meetupsModel from './meetups';

class Questions {
  constructor() {
    this.questions = [];
  }

  askQuestion(data) {
    const theMeetup = meetupsModel.getOne(data.meetupId);
    const theQuestion = {
      questionId: uuid.v4(),
      createdOn: moment.now(),
      createdBy: data.createdBy, // Should be taken from User Model
      meetupId: theMeetup.meetupId, // Taken from meetup Model
      title: data.title,
      body: data.body,
      upVotes: data.upVotes,
      downVotes: data.downVotes,
    };
    this.questions.push(theQuestion);
    return theQuestion;
  }

  getOne(meetupId) {
    return this.questions.find(question => question.meetupId === meetupId);
  }

  upvote(questionId) {
    const upvote = this.questions.find(question => question.questionId === questionId);
    upvote.upVotes += 1;
    return upvote.upVotes;
  }

  downvote(questionId) {
    const upvote = this.questions.find(question => question.questionId === questionId);
    const downvoted = upvote.upVotes - 1;
    return downvoted;
  }

  forDel(questionId) {
    return this.questions.find(question => question.questionId === questionId);
  }

  // delete a question formerly asked
  /* delete(questionId) {
    const theQuestion = this.forDel(questionId);
    const index = this.questions.indexOf(theQuestion);
    this.questions.splice(index, 1);
    return {};
  } */
}

export default new Questions();
