import moment from 'moment';
import uuid from 'uuid';


class User {
  constructor() {
    this.users = [];
  }

  signup(data) {
    const newUser = {
      userId: uuid.v4(),
      registered: moment.now(),
      firstName: data.firstName,
      lastName: data.lastName,
      otherName: data.otherName || '',
      userName: data.userName,
      email: data.email,
      phoneNumber: data.phoneNumber,
      isAdmin: data.isAdmin,
      password: data.password,
      image: data.image || '',
    };
    this.users.push(newUser);
    return newUser;
  }

  findUser(userId) {
    return this.users.find(user => user.userId === userId);
  }

  confirm(email) {
    return this.users.find(user => user.email === email);
  }

  login(data) {
    const theUser = this.confirm(data.email);
    if (theUser.email === data.email && theUser.password === data.password) {
      return theUser;
    }
    return 'Not Found';
  }

  deleteUser(userId) {
    const theUser = this.findUser(userId);
    const index = this.users.IndexOf(theUser);
    this.users.splice(index, 1);
  }

  // To be rendered on the profile page
  userInfor(userId) {
    const theUser = this.findUser(userId);
    return theUser;
  }
}

export default new User();
