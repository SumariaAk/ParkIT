
import * as bookingActions from '../Actions/booking.action';

//import * as bookingActions from './../Actions/booking.action';

//define the initial state
const initialState = {
  isOrderIdGenerated: false,
  isLoading: false,
  booking: undefined,
  error: undefined,
  isBookingUpdated:undefined,
  isBookingCreated:undefined,
  bookingdetailList : [],
  wasLoadingDone : false,
  isOrderIdGenerated : false,

  };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case bookingActions.ActionType.CREATE_BOOKING_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isBookingCreated : true,
        booking: action.user,
      };
    case bookingActions.ActionType.CREATE_BOOKING_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case bookingActions.ActionType.CREATE_BOOKING_FAILED:
      return {
        ...state,
        isLoading: false,
        isBookingCreated : false,
        error: action.error,
      };
    case bookingActions.ActionType.UPDATE_BOOKING_STATUS:
      return {
        ...state,
        isLoading: false,
        user: undefined,
        
        isBookingUpdated: action.status,
      };
      case bookingActions.ActionType.UPDATE_BOOKING_STATUS_SUCCESS:
        console.log("UPDATE_BOOKING_STATUS_SUCCESS");
        console.log(state.bookingdetailList);
        console.log(action.bookingdetailList);
      return {
        ...state,
        isLoading: false,
        user: undefined,
        wasLoadingDone:false,
        isBookingUpdated: action.status,
        bookingdetailList : state.bookingdetailList.filter(
          (bookingdetail) => bookingdetail._id !== action.bookingdetailList._id
       ),
       
       bookingdetailList : [...state.bookingdetailList,action.bookingdetailList],
      };

      case bookingActions.ActionType.REQUEST_BOOKINGDETAILS:
      return {
        ...state,
        isLoading: true,
        wasLoadingDone : false,
      };
      case bookingActions.ActionType.REQUEST_BOOKINGDETAILS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        bookingdetailList: action.bookingdetailList,
        wasLoadingDone : true,
      };
      case bookingActions.ActionType.REQUEST_BOOKING_DELETE_SUCCESS:
        return {
          ...state,
          isLoading: false,
         // bookingdetailList: action.bookingdetailList,
        };
        case bookingActions.ActionType.REQUEST_BOOKING_DELETE:
      return {
        ...state,
        isLoading: true,
      };
      case bookingActions.ActionType.CREATE_ORDERID_GENERATED:
      return {
        ...state,
        isOrderIdGenerated: true,

      };
      case bookingActions.ActionType.CREATE_ORDERID_GENERATED_SUCCESS:
        return {
          ...state,
          isOrderIdGenerated: false,
  
        };
    default:
      return state;
  }
};

export default reducer;
