import Mongoose from 'mongoose';

/**
 * Created To do list schema for database
 */
const userSchema = new Mongoose.Schema({
  first_name: {
    type: String,
    required: 'first Name is a required field.',
  },
  last_name: {
    type: String,
    required: 'last name is a required field.',
  },
  userid: {
    type: String,
    required: 'Email (Userid) is a required field.',
  },
  password: {
    type: String,
    required: 'Password is a required field',
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

userSchema.virtual('id', () => this._id.toHexString());
userSchema.set('toJSON', { virtuals: true });
const user = Mongoose.model('user', userSchema);
console.log(user);
export default user;
