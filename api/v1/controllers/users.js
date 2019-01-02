import users from '../models/users';

const User = {
  /* we need to confirm that the email does
  previosly exist */
  signUp(req, res) {
    const data = req.body;
    const theEmail = data.email;
    const theConfirm = users.confirm(theEmail);
    if (!data.firstName && !data.lastName
      && !data.phoneNumber && !data.email
      && !data.password && !data.re_password) {
      return res.status(400).json({
        message: 'All fields are required',
      });
    }
    if (theConfirm) {
      res.status(409).json({
        message: 'Email already exist',
      });
    }
    const theUser = users.signup(data);
    return res.status(201).json({
      firstName: theUser.firstName,
      lastName: theUser.lastName,
      email: theUser.email,
      phoneNumber: theUser.phoneNumber,
      password: theUser.password,
      re_password: theUser.re_password,
    });
  },

  login(req, res) {
    const data = req.body;
    const password = data.password;
    const email = data.email;
    const check = users.users.find(user => user.email === password);
    const login = users.login(password);
    if (check) {
      if(login) {
        return res.status(200).json({
          firstName: available.firstName,
          lastName: available.lastName,
          email: available.email,
          phoneNumber: available.phoneNumber,
        })
      }
      return res.status(401).json({
        message: 'Auth failed: Password/Email does not exist'
      })
    }
    return res.status(401).json({
      message: 'Auth failed'
    });
  },

  userInfo(req, res) {
    const data = req.body;
    const exist = users.findUser(data);
    if(exist) {
      const info = users.userInfor(exist.userId);
      res.status(200).json({
        firstName: info.firstName,
        lastName: info.lastName,
        email: info.email,
        phoneNumber: info.phoneNumber,
      });
    }
    res.status(404).json({
      message: 'User Not Found'
    })
  },
};

export default User;
