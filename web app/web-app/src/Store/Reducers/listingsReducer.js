import * as listingActions from './../Actions/listings.action';

const initialState = {
  isLoading: false,
  wasLoaded: false,
  listings: undefined,
  error: undefined,
};

const reducer = (state = initialState, action) => {
  console.log(action.type);
  switch (action.type) {
    case listingActions.ActionType.REQUEST_LISTINGS:
      return {
        ...state,
        isLoading: true,
        wasLoaded: false,
      };
    case listingActions.ActionType.REQUEST_LISTINGS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        wasLoaded: true,
        listings: action.listings,
      };
    case listingActions.ActionType.REQUEST_LISTINGS_FAILURE:
      return {
        ...state,
        isLoading: false,
        wasLoaded: false,
        error: action.error,
      };
    case listingActions.ActionType.REQUEST_DELETE_LISTING:
      return {
        ...state,
        isLoading: true,
        wasLoaded: false,
        error: action.error,
      };
    case listingActions.ActionType.REQUEST_DELETE_LISTING_SUCCESS:
      console.log('REQUEST_DELETE_LISTING_SUCCESS');
      return {
        ...state,
        listings: state.listings.filter(
          (listing) => listing.id !== action.listings.id
        ),
        isLoading: false,
        wasLoaded: false,
      };
    case listingActions.ActionType.REQUEST_DELETE_LISTING_FAILURE:
      return {
        ...state,
        isLoading: false,
        wasLoaded: false,
        error: action.error,
      };
    case listingActions.ActionType.REQUEST_UPDATE_LISTING:
      return {
        ...state,
        isLoading: true,
        wasLoaded: false,
        error: action.error,
      };
    case listingActions.ActionType.REQUEST_UPDATE_LISTING_SUCCESS:
      console.log('REQUEST_DELETE_LISTING_SUCCESS');
      return {
        ...state,
        listings: state.listings.filter(
          (listing) => listing.id !== action.listings.id
        ),
        listings: [...state.listings, action.listing],
        isLoading: false,
        wasLoaded: false,
      };
    case listingActions.ActionType.REQUEST_UPDATE_LISTING_FAILURE:
      return {
        ...state,
        isLoading: false,
        wasLoaded: false,
        error: action.error,
      };
    case listingActions.ActionType.REFRESH_LISTING_LIST:
      return {
        ...state,
        wasLoaded: false,
      };
    default:
      return state;
  }
};

export default reducer;
