import ParkingSpaces from '../models/parkingspaces.js';

/**
 * Search the contacts
 * @param {*} params
 * @returns
 */
export const search = (params = {}) => {

  const promise = ParkingSpaces.find(params).exec();
  return promise;
};

export const create = (parkingspaces) => {
  const promise = new ParkingSpaces(parkingspaces);
  return promise.save();
};

export const get = (id) => {
  const promise = ParkingSpaces.findById(id).exec();
  return promise;
};

export const update = (parkingspaces) => {
  console.log('update called');
  console.log(parkingspaces);
  parkingspaces._id = parkingspaces.id;
  const promise = ParkingSpaces.findByIdAndUpdate(
    parkingspaces.id,
    parkingspaces,
    {
      new: true,
    }
  ).exec();
  return promise;
};

export const remove = (id) => {
  const promise = ParkingSpaces.findByIdAndDelete(id).exec();
  return promise;
};
