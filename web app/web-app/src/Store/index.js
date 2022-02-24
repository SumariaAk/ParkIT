import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import signUpReducer from './Reducers/signUpReducer';
import loginReducer from './Reducers/loginReducer';
import parkingspaceReducer from './Reducers/parkingspaceReducer';
import listingsReducer from './Reducers/listingsReducer';
import bookingReducer from './Reducers/bookingReducer';

//import bookingReducer from './Reducers/bookingReducer'

//add all the reducers here
const reducers = combineReducers({
  signup: signUpReducer,
  login: loginReducer,
  parkingspace: parkingspaceReducer,
  listings: listingsReducer,
  bookings : bookingReducer,


  //bookings : bookingReducer


});

//create store and pass the reducers .
//middleware thunk is used and devtools are enabled for debugging purpose
const store = createStore(
  reducers,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
