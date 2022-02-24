import React from 'react';
import axios from 'axios';

export const ActionType = {
  REQUEST_LISTINGS: 'REQUEST_LISTINGS', //request lisitings by logged in user
  REQUEST_LISTINGS_SUCCESS: 'REQUEST_LISTINGS_SUCCESS', // on response data is saved in state
  REQUEST_LISTINGS_FAILURE: 'REQUEST_LISTINGS_FAILURE', //failure message from response
  REQUEST_DELETE_LISTING: 'REQUEST_DELETE_LISTING', //delete a particular listing
  REQUEST_DELETE_LISTING_SUCCESS: 'REQUEST_DELETE_LISTING_SUCCESS', //delete listing success
  REQUEST_DELETE_LISTING_FAILURE: 'REQUEST_DELETE_LISTING_FAILURE', //delete listing failure
  REFRESH_LISTING_LIST: 'REFRESH_LISTING_LIST', //refresh pre fetched list
  REQUEST_UPDATE_LISTING: 'REQUEST_UPDATE_LISTING', //update listing
  REQUEST_UPDATE_LISTING_SUCCESS: 'REQUEST_UPDATE_LISTING_SUCCESS', //listing updated successfully
  REQUEST_UPDATE_LISTING_FAILURE: 'REQUEST_UPDATE_LISTING_FAILURE', //listing update failure
};

export const fetchListings = () => {
  return function (dispatch, getState) {
    //dispatch calls the reducer
    dispatch({
      type: ActionType.REQUEST_LISTINGS,
    });

    const userid = sessionStorage.getItem('id');
    const url = 'http://localhost:3002/parkingspaces?userid=' + userid;

    axios
      .get(url, {
        headers: {
          'x-access-token': sessionStorage.getItem('token'),
        },
      })
      .then((response) => {
        console.log(response.data);

        setTimeout(() => {
          //creating a action of type REQUEST_LISTINGS_SUCCESS and payload as listings and dispatching
          dispatch({
            type: ActionType.REQUEST_LISTINGS_SUCCESS,
            listings: response.data,
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
            type: ActionType.REQUEST_LISTINGS_FAILURE,
            error: e,
          });
        }, 2000);
      });
  };
};

export const deleteListing = (id) => {
  return function (dispatch, getState) {
    //dispatch calls the reducer
    dispatch({
      type: ActionType.REQUEST_DELETE_LISTING,
    });

    const url = 'http://localhost:3002/parkingspaces/' + id;

    axios
      .delete(url)
      .then((response) => {
        console.log('listings delete ');
        console.log(response.data);

        //creating a action of type REQUEST_DELETE_LISTING_SUCCESS and payload as user and dispatching
        setTimeout(() => {
          dispatch({
            type: ActionType.REQUEST_DELETE_LISTING_SUCCESS,
            listings: response.data,
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
            type: ActionType.REQUEST_DELETE_LISTING_FAILURE,
            error: e,
          });
        }, 2000);
      });
  };
};

export const updateListing = (listing, id) => {
  return function (dispatch, getState) {
    //dispatch calls the reducer
    dispatch({
      type: ActionType.REQUEST_UPDATE_LISTING,
    });

    const url = 'http://localhost:3002/parkingspaces/' + id;
    axios
      .put(url, listing)
      .then((response) => {
        console.log(response.data);

        //creating a action of type REQUEST_DELETE_LISTING_SUCCESS and payload as user and dispatching
        setTimeout(() => {
          dispatch({
            type: ActionType.REQUEST_UPDATE_LISTING_SUCCESS,
            listings: response.data,
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
            type: ActionType.REQUEST_UPDATE_LISTING_FAILURE,
            error: e,
          });
        }, 2000);
      });
  };
};

export const refreshListingsList = () => {
  return function (dispatch, getState) {
    dispatch({
      type: ActionType.REFRESH_LISTING_LIST,
    });
  };
};
