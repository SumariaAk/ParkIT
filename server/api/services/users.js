import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

/**
 * search for email
 * @param {*} email
 */
export const findByEmailId = (email) => {
  const promise = User.findOne({ userid: email });
  return promise;
};

/**
 * Search the contacts
 * @param {*} params
 * @returns
 */
export const search = (params = {}) => {
  console.log('params' + params);
  const promise = User.find(params).exec();
  return promise;
};

/**
 *Create new User
 * @param {*} user
 * @returns new user with ._id
 */
export const create = async (user) => {
  //enrypt user password
  const encryptedPassword = await bcrypt.hash(user.password, 10);
  user.password = encryptedPassword;
  const promise = new User(user);

  console.log('Promise ' + promise);
  //create JWT token
  const token = jwt.sign(
    {
      user_id: promise._id,
      userid: promise.userid,
    },
    process.env.TOKEN_KEY,
    {
      expiresIn: '1h',
    }
  );
  const responseData = { token: token, id: promise._id };
  promise.save();
  return responseData;
};

/**
 * Get user data from ._id
 * Added for testing
 * @param {*} id  user ._id used during creation
 * @returns
 */
export const get = (id) => {
  const promise = User.findById(id).exec();
  return promise;
};

/**
 * Update existing user
 * @param {*} user
 * @returns updated data
 */
export const update = (user) => {
  user._id = user.id;
  const promise = User.findByIdAndUpdate(user.id, user, {
    new: true,
  }).exec();
  return promise;
};

/**
 * Delete existing user
 * @param {*} id ._id of user to be deleted
 * @returns
 */
export const remove = (id) => {
  const promise = User.findByIdAndDelete(id).exec();
  return promise;
};
