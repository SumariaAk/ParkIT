import * as loginActions from './../Actions/login.actions';
const initialState = {
  isLoading: false,
  user: undefined,
  error: undefined,
  isLoggedIn: false,
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case loginActions.ActionType.LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: true,
        user: action.user,
      };
    case loginActions.ActionType.LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case loginActions.ActionType.LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    case loginActions.ActionType.LOGIN_STATUS:
      return {
        isLoggedIn: action.status,
      };
    default:
      return state;
  }
};

export default reducer;
