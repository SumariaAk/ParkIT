import Mongoose from 'mongoose';

/**
 * Created To do list schema for database
 */
const parkingspaceSchema = new Mongoose.Schema({
  userid: {
    type: String,
    required: 'User is not signed in ',
  },

  username: {
    type: String,
    required: 'User is not signed in ',
  },

  name: {
    type: String,
    required: 'Name is a required field.',
  },
  parking_entrance: {
    type: String,
    required: 'Parking Space is a required field.',
  },
  address: {
    type: String,
    required: 'address is a required field.',
  },
  phone: {
    type: String,
    required: 'Phone is a required field.',
  },
  type: {
    type: String,
    // required: "Type is a required field.",
  },

  parking_img: {
    type: String,
  },

  coordinates: {
    type: Array,
  },
  latitude: {
    type: String,
    // required,
  },

  longitude: {
    type: String,
    // required,
  },
  city: {
    type: String,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  lastModifiedDate: {
    type: Date,
    default: Date.now,
  },

  versionKey: false,
});

parkingspaceSchema.virtual('id', () => this._id.toHexString());
parkingspaceSchema.set('toJSON', { virtuals: true });
const parkingspaces = Mongoose.model('parkingspace', parkingspaceSchema);
console.log(parkingspaces);
export default parkingspaces;

// ObjectId
// name
// :
// NEWBURY COLLECTION PARKING
// String
// parking_entrance
// :
// 115 Newbury Street
// String
// address
// :
// 115 Newbury Stree Boston, MA 02116
// String
// hours
// :
// 24/7
// String
// phone
// :
// 123456
// String
// type
// :
// free
