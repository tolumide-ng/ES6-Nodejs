// Fetch Upcoming meetups
export function upcoming(req, res) {
  res.status(200).json({
    message: 'Fetch all upcoming meetups',
  });
}

// Response to meetup RSVP
export function reply(req, res) {
  if (req.params.meetupId === 1234) {
    res.status(201).json({
      message: 'Response to meetup RSVP',
    });
  }
  res.status(400).json({
    message: 'Bad request fella!',
  });
}

// Fetch a specific meetup
export function specific(req, res) {
  res.status(200).json({
    message: 'Fetch a specific meetup record',
  });
}

// Create a meetup record
export function createMeetup(req, res) {
  res.status(201).json({
    message: 'Create  a meetup record',
  });
}

// Fetch all meetups
export function allMeetups(req, res) {
  res.status(200).json({
    message: 'Fetch all meetups',
  });
}
