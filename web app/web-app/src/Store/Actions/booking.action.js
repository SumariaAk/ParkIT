import axios from 'axios';
import razor_keys from '../../Config/keys';
import Razorpay from 'razorpay';

//const razor_keys = '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'
let receiptnum = 100;

const razorpay =new Razorpay({

  key_id: razor_keys.key_id,
  
  key_secret: razor_keys.key_secret
  
  });

//create actions to be performed by the reducer
export const ActionType = {
  CREATE_BOOKING_REQUEST: 'CREATE_BOOKING_REQUEST', //signup data is sent to the endpoint
  CREATE_BOOKING_SUCCESS: 'CREATE_BOOKING_SUCCESS', // on response the data token is saved
  CREATE_BOOKING_FAILED: 'CREATE_BOOKING_FAILED', //failure message from response
  UPDATE_BOOKING_STATUS: 'UPDATE_BOOKING_STATUS',
  UPDATE_BOOKING_STATUS_SUCCESS: 'UPDATE_BOOKING_STATUS_SUCCESS', //update signup status
  REQUEST_BOOKINGDETAILS : "REQUEST_BOOKINGDETAILS",
  REQUEST_BOOKINGDETAILS_SUCCESS : "REQUEST_BOOKINGDETAILS_SUCCESS",
  REQUEST_BOOKING_DELETE: "REQUEST_BOOKING_DELETE",
  REQUEST_BOOKING_DELETE_SUCCESS : "REQUEST_BOOKING_DELETE_SUCCESS",
  CREATE_ORDERID_GENERATED:"CREATE_ORDERID_GENERATED",
  CREATE_ORDERID_GENERATED_SUCCESS : "CREATE_ORDERID_GENERATED_SUCCESS",
  
};

export const createBooking = (booking) => {
  //thunk to avoid await and async
  return function (dispatch, getState) {
    //dispatch calls the reducer
    dispatch({
      type: ActionType.CREATE_BOOKING_REQUEST,
    });
    const url = 'http://localhost:3002/bookings';
    axios
      .post(url, booking)
      .then((response) => {
       // localStorage.clear();

        console.log(response.data);

        setTimeout(() => {
          //creating a action of type CREATE BOOKING and payload as user and dispatching
          dispatch({
            type: ActionType.CREATE_BOOKING_SUCCESS,
            booking: response.data,
          });
        }, 2000);
      })
      .catch((error) => {
        const e = {
          message: error.response.data.message,
          status: error.response.status,
        };
        setTimeout(() => {
          dispatch({
            type: ActionType.CREATE_BOOKING_FAILED,
            error: e,
          });
        }, 2000);
      });
  };
};

export const checkout =() =>
{
  return function (dispatch, getState) {
    //creating razorpay order id
      razorpay.orders.create({
        amount: 51000,
        currency: "INR",
        receipt: receiptnum,
      },
      function(err, order){
        sessionStorage.setItem('orderid', order.id);
        dispatch({
          type: ActionType.CREATE_ORDERID_GENERATED,

        });
          // console.log(order)
          // console.log(localStorage.getItem('orderid'))
      }
      )
  };
  receiptnum++;
};

export const updateBookingStatus = (req,bookingObject) => {
  return function (dispatch, getState) {
    const url = 'http://localhost:3002/bookings/'+req;
    axios.put(url,bookingObject).then((response) => {
    dispatch({
      type: ActionType.UPDATE_BOOKING_STATUS_SUCCESS,
      bookingdetailList: response.data,
    });
  });
};
};

export const getBookings = (req) => {
  return function (dispatch, getState) {
    const url = 'http://localhost:3002/bookings?userid='+req;
    axios.get(url).then((response) => {
      console.log(response.data);
      dispatch({
        type: ActionType.REQUEST_BOOKINGDETAILS_SUCCESS,
        bookingdetailList: response.data,
      });
    });
  };
};


export const deleteBookings = (req) => {
  return function (dispatch, getState) {
    const url = 'http://localhost:3002/bookings/'+req;
    axios.delete(url).then((response) => {
      dispatch({
        type: ActionType.REQUEST_BOOKING_DELETE_SUCCESS,
        //bookingdetailList: response.data,
      });
    });
  };
};


export const updateOrderID = (req) => {
  return function (dispatch, getState) {
   
      dispatch({
        type: ActionType.CREATE_ORDERID_GENERATED_SUCCESS,
        //bookingdetailList: response.data,
      });
 
  };
};