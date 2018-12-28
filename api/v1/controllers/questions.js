// Create a question for a specific meetup
export function createQuestion(req, res) {
  res.status(200).json({
    message: 'Fetch all upcoming meetup records',
  });
}

// Upvotes
export function upvote(req, res) {
  res.status(201).json({
    message: 'Increase votes by 1',
  });
}

// Downvotes
export function downvote(req, res) {
  res.status(200).json({
    message: 'decreases votes by 1 for a specific question',
  });
}
