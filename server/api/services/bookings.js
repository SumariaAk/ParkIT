
import Bookings from "../models/bookings.js";

/**
 * Search the contacts
 * @param {*} params
 * @returns
 */
export const search = (params = {}) => {
  console.log( params);
  const promise = Bookings.find(params).exec();
  return promise;
};

export const create = (bookings) => {
  const promise = new Bookings(bookings);
  return promise.save();
};

export const get = (id) => {
  const promise = Bookings.findById(id).exec();
  return promise;
};

export const update = (parkingspaces) => {
    bookings._id = bookings.id;
  const promise = Bookings.findByIdAndUpdate(bookings.id, bookings, {
    new: true,
  }).exec();
  return promise;
};

export const remove = (id) => {
  const promise = Bookings.findByIdAndDelete(id).exec();
  return promise;
};
