import questionsModels from '../models/questions';

const Questions = {

  createQuestion(req, res) {
    const data = req.body;
    if (!data.title && !data.body
      && !data.meetupId && !data.user
      && !data.questionId && !data.upVotes
      && !data.downVotes) {
      return res.status(400).json({
        message: 'All fields are required',
      });
    }
    const createdQuestion = questionsModels.askQuestion(req.body);
    return res.status(201).json({
      createdBy: createdQuestion.createdBy,
      meetupId: createdQuestion.meetupId,
      questionId: createdQuestion.questionId,
      body: createdQuestion.body,
      title: createdQuestion.title,
      upvote: createdQuestion.upvote,
      downvote: createdQuestion.downvote,
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
    // smile we solved this part on the models part
    const theQuestion = questionsModels.requestUpvote(req.body);
    if (theQuestion) {
      return res.status(200).json({
        message: 'delaware',
        downvotes: theQuestion.downvote,
        upvotes: theQuestion.upvote,
      });
    }
    return res.status(404).json({
      message: 'Not found',
    });
  },

  downvote(req, res) {
    // smile we solved this part on the models part
    const theQuestion = questionsModels.requestDownvote(req.body);
    if (theQuestion) {
      return res.status(200).json({
        message: 'delaware',
        downvotes: theQuestion.downvote,
        upvotes: theQuestion.upvote,
      });
    }
    return res.status(404).json({
      message: 'Not found',
    });
  },

  getAllQuestions(req, res) {
    const data = req.params.meetupId;
    const allquestions = questionsModels.getMeetupQuestions(data);
    const count = allquestions.length;
    if (count > 0) {
      return res.status(200).json({
        data: allquestions.map(question => ({
          createdBy: question.createdBy,
          meetupId: question.meetupId,
          title: question.title,
          body: question.body,
          upvotes: question.upvotes,
          downvotes: question.downvotes,
        })),
      });
    }
    return res.status(204).json({
      message: 'No content',
    });
  },

  delete(req, res) {
    const deleted = questionsModels.delete(req.params.questionId);
    if (Array.isArray(deleted)) {
      return res.status(202).json({
        count: deleted.length,
        data: deleted.map(undeleted => ({
          createdBy: undeleted.createdBy,
          meetupId: undeleted.meetupId,
          title: undeleted.title,
          body: undeleted.body,
          upvotes: undeleted.upvotes,
          downvotes: undeleted.downvotes,
        })),
      });
    }
    return res.status(404).json({
      message: 'Question not found',
    });
  },
};

export default Questions;
