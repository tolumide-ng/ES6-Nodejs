import questionsModel from '../models/questions';

const Questions = {

  createQuestion(req, res) {
    /* const exist = questionsModel.getOne(req.body.meetupId) */
    if (!req.body.title && !req.body.body) {
      return res.status(400).json({
        message: 'All fields are required',
      });
    }
    const createdQuestion = questionsModel.askQuestion(req.body);
    return res.status(201).json({
      user: createdQuestion.createdBy, //! TO BE FETCHED LATER
      meetupId: createdQuestion.meetupId,
      questionId: createdQuestion.questionId,
      title: createdQuestion.title,
      body: createdQuestion.body,
      upVotes: createdQuestion.upVotes,
      downVotes: createdQuestion.downVotes,
      Post: {
        type: 'GET',
        url: `http://localhost:3000/v1/meetups/${createdQuestion.meetupId}`,
      },
      upVote_Question: {
        type: 'PATCH',
        url: `http://localhost:3000/v1/questions/${createdQuestion.questionId}/upvote`,
      },
      downVote_Question: {
        type: 'PATCH',
        url: `http://localhost:3000/v1/questions/${createdQuestion.questionId}/downvote`,
      },
    });
  },

  upvote(req, res) {
    // create an instance for when the user has already liked question
    /* SOMETHING LIKE IF USER.UPVOTE THEN OVERLOOK ELSE UPVOTE */
    /* questionsModel.upvote(req.params.questionId); */
    const theQuestion = questionsModel.upvote(req.params.questionId);
    return res.status(200).json({
      message: 'delaware',
      upVotes: theQuestion,
    });
    /* CONDITION FOR AN ALREADY UPVOTED QUESTION */
  },

  downvote(req, res) {
    // create an instance for when the user has already liked question
    /* SOMETHING LIKE IF USER.UPVOTE THEN OVERLOOK ELSE UPVOTE */
    /* questionsModel.upvote(req.params.questionId); */
    const theQuestion = questionsModel.downvote(req.params.questionId);
    return res.status(200).json({
      message: 'delaware',
      downVotes: theQuestion,
    });
    /* CONDITION FOR AN ALREADY UPVOTED QUESTION */
  },

  // get all questions for this meetup
  getAllQuestion(req, res) {
    const allquestions = questionsModel.getAll(req.params.meetupId);
    return res.status(200).json({
      data: allquestions.map(question => ({
        createdBy: question.createdBy,
        meetupId: question.meetupId,
        title: question.title,
        body: question.body,
        upVotes: question.upVotes,
        downVotes: question.downVotes,
      })),
    });
  },

  delete(req, res) {
    const deleted = questionsModel.delete(req.params.questionId);
    if (Array.isArray(deleted)) {
      return res.status(202).json({
        count: deleted.length,
        data: deleted.map(undeleted => ({
          createdBy: undeleted.createdBy,
          meetupId: undeleted.meetupId,
          title: undeleted.title,
          body: undeleted.body,
          upVotes: undeleted.upVotes,
          downVotes: undeleted.downVotes,
        })),
      });
    }
    return res.status(404).json({
      message: 'Question not found',
    });
  },
};

export default Questions;
