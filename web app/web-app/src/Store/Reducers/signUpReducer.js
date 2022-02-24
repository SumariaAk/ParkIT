import * as signUpActions from './../Actions/signup.actions';

//define the initial state
const initialState = {
  isLoading: false,
  user: undefined,
  error: undefined,
  isSignedUp: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case signUpActions.ActionType.CREATE_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSignedUp: true,
        user: action.user,
      };
    case signUpActions.ActionType.CREATE_USER_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case signUpActions.ActionType.CREATE_USER_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    case signUpActions.ActionType.UPDATE_SIGNUP_STATUS:
      return {
        ...state,
        isLoading: false,
        user: undefined,
        isSignedUp: action.status,
      };
    default:
      return state;
  }
};

export default reducer;
