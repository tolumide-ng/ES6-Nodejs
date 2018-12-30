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
      user: createdQuestion.user, //! TO BE FETCHED LATER
      meetupId: createdQuestion.meetupId,
      title: createdQuestion.title,
      body: createdQuestion.body,
    });
  },

  upvote(req, res) {
    // create an instance for when the user has already liked question
    /* SOMETHING LIKE IF USER.UPVOTE THEN OVERLOOK ELSE UPVOTE */
    questionsModel.upvote(req.params.questionId);
    const theQuestion = questionsModel.getOne(req.params.questionId);
    res.status(204).json({
      meetupId: theQuestion.meetupId,
      title: theQuestion.title,
      body: theQuestion.body,
      upVotes: theQuestion.upVotes,
    });
    /* CONDITION FOR AN ALREADY UPVOTED QUESTION */
  },

  downvote(req, res) {
    questionsModel.downvote(req.params.questionId);
    const theQuestion = questionsModel.getOne(req.params.questionId);
    res.status(204).json({
      meetupId: theQuestion.meetupId,
      title: theQuestion.title,
      body: theQuestion.body,
      downVotes: theQuestion.downVotes,

    });
  },

  delete(req, res) {
    const exists = questionsModel.getOne(req.params.questionId);
    if (!exists) {
      return res.status(404).json({
        message: 'Question not found',
      });
    }
    questionsModel.delete(req.params.questionId);
    return res.status(204).json({
      message: 'Question deleted',
    });
  },
};

export default Questions;
