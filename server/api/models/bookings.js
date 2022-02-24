import Mongoose from "mongoose";

/**
 * Created To do list schema for database 
 */
const bookingsSchema = new Mongoose.Schema({
    parkingspaceid: {
    type: String,
    required: "parkingspaceid is a required field.",
  },
  userid: {
    type: String,
    required: "userid is a required field.",
  },
  fromtime: {
    type: String,
    required: "fromtime is a required field.",
  },
  totime: {
    type: String,  
    required: "totime is a required field.",
  },
  parkingspaceobject:
  {
    type:Array,

  },
  charges: {
    type: String,  
    
  },
  orderid :
  {
    type:String,

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

bookingsSchema.virtual("id", () => this._id.toHexString());
bookingsSchema.set("toJSON", { virtuals: true });
const bookings = Mongoose.model("userbookings", bookingsSchema);
console.log(bookings);
export default bookings;


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
