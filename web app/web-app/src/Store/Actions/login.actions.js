import React from 'react';
import axios from 'axios';
import { useState } from 'react';
export const ActionType = {
  LOGIN_REQUEST: 'LOGIN_REQUEST', //login data is sent to the endpoint
  LOGIN_SUCCESS: 'LOGIN_SUCCESS', // on response data token is saved
  LOGIN_FAILURE: 'LOGIN_FAILURE', //failure message from response
  LOGIN_STATUS: 'LOGIN_STATUS', //update login status when user logs out
};

export const loginRequest = (user) => {
  return function (dispatch, getState) {
    //dispatch calls the reducer
    dispatch({
      type: ActionType.LOGIN_REQUEST,
    });

    const url = 'http://localhost:3002/login';
    axios
      .post(url, user)
      .then((response) => {
        //save token in local storage
        sessionStorage.setItem('token', response.data.token); //JWT token
        sessionStorage.setItem('id', response.data.id); //id
        sessionStorage.setItem('userid', response.data.userid); //email id
        console.log('session id ' + sessionStorage.getItem('id'));
        setTimeout(() => {
          dispatch({
            type: ActionType.LOGIN_SUCCESS,
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
            type: ActionType.LOGIN_FAILURE,
            error: e,
          });
        }, 2000);
      });
  };
};

export const updateLoggedInStatus = (status) => {
  return function (dispatch, getState) {
    dispatch({
      type: ActionType.LOGIN_STATUS,
      status: status,
    });
  };
};
