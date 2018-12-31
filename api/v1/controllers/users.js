import users from '../models/users';

const User = {
  signUp(req, res) {
    if (!req.body.firstName && !req.body.lastName
        && !req.body.phoneNumber && !req.body.email
        && !req.body.password) {
      return res.status(400).json({
        message: 'All fields are required',
      });
    }
    const theUser = users.signup(req.body);
    return res.status(201).json({
      firstName: theUser.firstName,
      lastName: theUser.lastName,
      email: theUser.email,
      phoneNumber: theUser.phoneNumber,
    });
  },

  login(req, res) {
    if (users.confirm(req.body.email)) {
      const available = users.login(req.body);
      return res.status(201).json({
        firstName: available.firstName,
        lastName: available.lastName,
        email: available.email,
        phoneNumber: available.email,
      });
    }
    return res.status(401).json({
      message: 'Auth failed',
    });
  },

  fetchUser(req, res) {
    const info = users.userInfo(req.body.userId);
    res.status(200).json({
      firstName: info.firstName,
      lastName: info.lastName,
      email: info.email,
      phoneNumber: info.email,
      questions: info.qestion.length || '',
      comments: info.comments.length || '',
    });
  },
};

export default User;
