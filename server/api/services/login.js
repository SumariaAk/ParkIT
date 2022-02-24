import User from '../models/user.js';

/**
 * search for email
 * @param {*} email
 */
export const findByEmailId = (userid) => {
  const promise = User.findOne({ userid });
  return promise;
};
