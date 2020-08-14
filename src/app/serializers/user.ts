import { User } from "../models/user";

interface UserSerializer {
  email: string;
  firstName: string;
  lastName: string;
}

const show = (user: User): UserSerializer => {
  return {
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName
  };
};

const index = (users: Array<User>): Array<UserSerializer> => {
  return users.map(user => show(user));
};

const create = (user: User): UserSerializer => {
  return {
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName
  };
};

export default {
  show,
  index,
  create
};
