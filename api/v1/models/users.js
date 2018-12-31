import moment from 'moment';
import uuid from 'uuid';

class User {
  constructor() {
    this.users = [];
  }

  signup(data) {
    const newUser = {
      userId: uuid.v4(),
      firstName: data.firstName,
      lastName: data.lastName,
      otherName: data.otherName || '',
      userName: data.userName,
      email: data.email,
      registered: moment.now(),
      phoneNumber: data.phoneNumber,
      isAdmin: data.isAdmin || '',
      password: data.password,
      image: data.image || '',
      question: [] || '',
      comments: [] || '',
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
    const theUser = this.findUser(data.userId);
    if (theUser.email === data.email && theUser.password === data.password) {
      return theUser;
    }
    return '';
  }

  deleteUser(userId) {
    const theUser = this.findUser(userId);
    const index = this.users.findIndex(theUser);
    this.users.splice(index, 1);
  }

  // To be rendered on profile page
  userInfo(userId) {
    const theUser = this.findUser(userId);
    return theUser;
  }
}

export default new User();