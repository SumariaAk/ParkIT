import * as parkingSpaceActions from './../Actions/parkingspace.action';
const initialState = {
  parkingspaceList: [],
  parkingName: [],
  isLoading: false,
  parkingspace: undefined,
  isAddedSuccessfully: false,
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case parkingSpaceActions.ActionType.REQUEST_PARKINGSPACE_LIST:
      console.log('login reducer with action REQUEST_PARKINGSPACE_LIST called');
      return state;
    case parkingSpaceActions.ActionType.REQUEST_PARKINGSPACE_SUCCESS:
      return {
        ...state,
        parkingspaceList: action.parkingspaceList,
        isLoading :true,
      };
    case parkingSpaceActions.ActionType.REQUEST_PARKINGNAME_SUCCESS:
      return {
        ...state,
        parkingName: action.parkingName,
      };
    case parkingSpaceActions.ActionType.CREATE_PARKING_SPACE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        parkingspace: action.parkingspace,
        isAddedSuccessfully: true,
      };
    case parkingSpaceActions.ActionType.CREATE_PARKING_SPACE:
      return {
        ...state,
        isLoading: true,
      };
    case parkingSpaceActions.ActionType.CREATE_PARKING_SPACE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    case parkingSpaceActions.ActionType.UPDATE_PARKING_SPACE_SUCCESS_PARAMS:
      return {
        ...state,
        isAddedSuccessfully: action.isAddedSuccessfully,
      };
    default:
      return state;
  }
};

export default reducer;
