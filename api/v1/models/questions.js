/* to create a question, a user must exist and have an ID ...then we rip the id
and use in the create method */


import moment from 'moment';
import uuid from 'uuid';
import meetupModel from './meetups'; // has an array of the meetups
import userModel from './users'; // has an array of the users

class Question {
  constructor() {
    this.question = [];
    this.votes = [];
  }

  askQuestion(data) {
    const theMeetup = meetupModel.getOne(data.meetupId);
    const theUser = meetupModel.getOne(data.userId);
    const theQuestion = {
      questionId: uuid.v4(),
      createdOn: moment.now(),
      createdBy: `${theUser.firstName} ${theUser.lastName}`,
      userId: theUser.userId,
      meetupId: theMeetup.meetupId,
      title: data.title,
      body: data.body,
      upvote: data.upvote,
      downvote: data.downvote,
    };
    this.questions.push(theQuestion);
    return theQuestion;
  }

  // get all questions related to the meetupId
  getMeetupQuestions(meetupId) {
    return this.question.filter(question => question.meetupId === meetupId);
  }

  //get all question this user has answered
  getUserQuestions(userId) {
    return this.question.filter(questions => questions.userId === userId);
  }

  requestUpvote(data) {
    // Does the question to be upvoted exist?
    const theQuestion = this.question.find(question => question.questionId === data.questionId);

    if (theQuestion) {
      /* CHECK IF THE USER, MEETUP & QUESTION EXIST IN THE VOTES ARRAY */
      const userExist = this.votes.filter(user => user.userId === data.userId);
      const meetupExist = this.votes.filter(meetup => meetup.meetupId === data.meetupId);
      const questionExist = this.votes.filter(question => question.questionId === data.questionId);
      // Has the user already upvoted this question before?
      if (userExist) {
        if (userExist.questionId === data.questionId && userExist.type === 'upvote'
        && userExist.meetupId === data.meetupId) {
          return;
        }
        if (userExist.questionId === data.questionId && userExist.type === 'downvote') {
          // FIND THE QUESTION IN THE ARRAY
          // REMOVE THE DOWNVOTE AND UPVOTE
          theQuestion.downvote -= 1;
          theQuestion.upvote += 1;
          return theQuestion;
        }
        return;
      }

      if (meetupExist) {
        /* IF THE MEETUP EXIST IN THE VOTES ARRAY */
        if (meetupExist.questionId === data.questionId && meetupExist.meetupId === data.meetupId
          && meetupExist.type === 'upvote') {
          return;
        }
        if (meetupExist.questionId === data.questionId && meetup.type === 'downvote'
          && meetupExist.meetupId === data.meetupId) {
          theQuestion.downvote -= 1;
          theQuestion.upvote += 1;
          return theQuestion;
        }
        return;
      }

      if (questionExist) {
        if (questionExist.questionId === data.questionId && questionExist.meetupId === data.meetupId
          && questionExist.type === 'upvote') {

        } else if (questionExist.questionId === data.questionId && questionExist.meetupId === data.meetupId
            && questionExist.type === 'downvote') {
          theQuestion.downvote -= 1;
          theQuestion.upvote += 1;
          return theQuestion;
        }
        return;
      }
      //QUESTION EXISTS! BUT USER HAS NEVER VOTED FOR THIS QUESTION BEFORE ..ALLOW HIM
      const guy = {
        userId: data.userId,
        questionId: data.questionId,
        meetupId: data.meetupId,
        type: 'upvote'
      }
      this.votes.push(guy);
      theQuestion.upvote +=1;
      return theQuestion;
    }
    return;
  }

  forDel(questionId) {
    return this.question.find(question => question.questionId === questionId);
  }

  requestDownvote(data) {
    // Does the question to be upvoted exist?
    const theQuestion = this.question.find(question => question.questionId === data.questionId);

    if (theQuestion) {
      /* CHECK IF THE USER, MEETUP & QUESTION EXIST IN THE VOTES ARRAY */
      const userExist = this.votes.filter(user => user.userId === data.userId);
      const meetupExist = this.votes.filter(meetup => meetup.meetupId === data.meetupId);
      const questionExist = this.votes.filter(question => question.questionId === data.questionId);
      // Has the user already upvoted this question before?
      if (userExist) {
        if (userExist.questionId === data.questionId && userExist.type === 'downvote'
        && userExist.meetupId === data.meetupId) {
          return;
        }
        if (userExist.questionId === data.questionId && userExist.type === 'upvote') {
          // FIND THE QUESTION IN THE ARRAY
          // REMOVE THE DOWNVOTE AND UPVOTE
          theQuestion.upvote -= 1;
          theQuestion.downvote += 1;
          return theQuestion;
        }
        return;
      }

      if (meetupExist) {
        /* IF THE MEETUP EXIST IN THE VOTES ARRAY */
        if (meetupExist.questionId === data.questionId && meetupExist.meetupId === data.meetupId
          && meetupExist.type === 'downvote') {
          return;
        }
        if (meetupExist.questionId === data.questionId && meetup.type === 'upvote'
          && meetupExist.meetupId === data.meetupId) {
          theQuestion.upvote -= 1;
          theQuestion.downvote += 1;
          return theQuestion;
        }
        return;
      }

      if (questionExist) {
        if (questionExist.questionId === data.questionId && questionExist.meetupId === data.meetupId
          && questionExist.type === 'downvote') {

        } else if (questionExist.questionId === data.questionId && questionExist.meetupId === data.meetupId
            && questionExist.type === 'upvote') {
          theQuestion.upvote -= 1;
          theQuestion.downvote += 1;
          return theQuestion;
        }
        return;
      }
      //QUESTION EXISTS! BUT USER HAS NEVER VOTED FOR THIS QUESTION BEFORE ..ALLOW HIM
      const guy = {
        userId: data.userId,
        questionId: data.questionId,
        meetupId: data.meetupId,
        type: 'downvote'
      }
      this.votes.push(guy);
      theQuestion.downvote +=1;
      return theQuestion;
    }
    return;
  }

  //delete a question formerly asked
  delete(questionId) {
    const theQuestion = this.forDel(questionId);
    if(theQuestion) {
      const index = this.question.indexOf(theQuestion);
      this.questions.splice(index, 1);
      return this.questions; 
    }
    return 'Question doesn\'t exist'
  }

}
export default new Question();
