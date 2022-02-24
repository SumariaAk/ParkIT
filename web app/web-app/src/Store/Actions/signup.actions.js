import axios from 'axios';

//create actions to be performed by the reducer
export const ActionType = {
  CREATE_USER_REQUEST: 'CREATE_USER_REQUEST', //signup data is sent to the endpoint
  CREATE_USER_SUCCESS: 'CREATE_USER_SUCCESS', // on response the data token is saved
  CREATE_USER_FAILED: 'CREATE_USER_FAILED', //failure message from response
  UPDATE_SIGNUP_STATUS: 'UPDATE_SIGNUP_STATUS', //update signup status
};

export const createUser = (user) => {
  //thunk to avoid await and async
  return function (dispatch, getState) {
    //dispatch calls the reducer
    dispatch({
      type: ActionType.CREATE_USER_REQUEST,
    });
    const url = 'http://localhost:3002/users';
    axios
      .post(url, user)
      .then((response) => {
        setTimeout(() => {
          //creating a action of type CREATE_USER_SUCCESS and payload as user and dispatching
          dispatch({
            type: ActionType.CREATE_USER_SUCCESS,
            user: response.data,
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
            type: ActionType.CREATE_USER_FAILED,
            error: e,
          });
        }, 2000);
      });
  };
};

export const updateSignUpStatus = (status) => {
  return function (dispatch, getState) {
    dispatch({
      type: ActionType.UPDATE_SIGNUP_STATUS,
      status: status,
    });
  };
};
