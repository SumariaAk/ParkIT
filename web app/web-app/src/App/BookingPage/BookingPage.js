import React, { useEffect, useState } from 'react';
import './BookingPage.scss';
import { connect } from 'react-redux';
import {
  createBooking,
  checkout,
  updateOrderID,
} from '../../Store/Actions/booking.action';
import { Container, Form, Card } from 'react-bootstrap';
import AppLoading from '../AppLoading/AppLoading';
import AppNotification from '../AppNotification/AppNotification';
import { useHistory } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import { getParkingName } from '../../Store/Actions/parkingspace.action.js';
import axios from 'axios';
import razor_keys from '../../Config/keys';
import Razorpay from 'razorpay';
//const Razorpay = require('razorpay');

function BookingPage(props) {
  // const state = useSelector((state) => state.signup);
  //console.log(...props);
  const [fromtime, setfromTime] = useState('');
  const [totime, settoTimee] = useState('');
  const [userid, setUserid] = useState('');
  const [orderid, setOrderId] = useState('');
  const [parkingspaceid, setparkingspaceid] = useState('');
  const [parkingspaceobject, setParkingSpaceObject] = useState('');

  const history = useHistory();
  console.log(sessionStorage.getItem('parkingspaceid'));
  console.log(sessionStorage.getItem('id'));

  const onSave = () => {
    setparkingspaceid(props.parkingName.id);
    setUserid(sessionStorage.getItem('id'));
    setParkingSpaceObject(props.parkingName);
    setOrderId(sessionStorage.getItem('orderid'));

    //   const bookingObject = {
    //     fromtime,
    //     totime,
    //     userid,
    //     parkingspaceid,
    //     parkingspaceobject,
    //   };
    // props.createBooking(bookingObject);
    if (totime && fromtime) {
      props.checkout();
    }

    // if (props.isBookingCreated) {
    //  history.push('/userbookingdetails');
    // }

    console.log('after fetching order id');
  };

  if (props.isOrderIdGenerated) {
    console.log('if Order id genrated');
    props.updateOrderID();
    displayRazorpayy();
  }

  //};

  //function to load the razorpay script
  function loadScript(src) {
    return new Promise((resolve) => {
      //create a script element
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      //append the script to the document
      document.body.appendChild(script);
    });
  }

  // Display the razorpay payment API
  async function displayRazorpayy() {
    console.log('displayRazorpayy');
    //loading the page with razorpay script
    const res = await loadScript(
      'https://checkout.razorpay.com/v1/checkout.js'
    );

    if (!res) {
      alert('Razorpay SDK failed to load. Are you online?');
      return;
    }

    console.log('displayRazorpayy  2');
    //creating an options with all the payment details
    const options = {
      key: razor_keys.key_id, // Enter the Key ID generated from the Dashboard
      amount: props.parkingName.rate * 100,
      currency: 'INR',
      name: 'Parking 6150',
      description: 'Booking parking!',
      image: {},
      order_id: sessionStorage.getItem('orderid'),
      handler: async function (response) {
        alert('Payment successful!, ORDER ID-' + response.razorpay_order_id); //order_EncHzzi3wdb9zt");
        console.log('displayRazorpayy response');
        const bookingObject = {
          fromtime,
          totime,
          userid,
          orderid,
          parkingspaceid,
          parkingspaceobject,
        };
        props.createBooking(bookingObject);
        setTimeout(() => {
          if (props.isBookingCreated) {
            history.push('/userbookingdetails');
          }
        }, 2000);
      },
      prefill: {
        name: 'AkashSumaria',
        email: 'akashsumaria@example.com',
        contact: '9876543210',
      },
      notes: {
        address: 'Churchil 101',
      },
      theme: {
        color: '#61dafb',
      },
    };
    //creating the razorpay api
    var razorpay_window = new window.Razorpay(options);
    //open the razorpay window
    razorpay_window.open();
    console.log('displayRazorpayy END');
  }

  useEffect(() => {
    setparkingspaceid(sessionStorage.getItem('parkingspaceid'));
    setUserid(sessionStorage.getItem('id'));
    setParkingSpaceObject(props.parkingName);

    if (props.isBookingCreated) {
      history.push('/userbookingdetails');
    }

    if (props.parkingName.length == 0) {
      props.getParkingName(sessionStorage.getItem('parkingspaceid'));
    }
  }, [props.parkingName]);

  const parkingspaceElements = (
    <div>
      <Card
        key={props.parkingName.id}
        style={{ width: '30rem' }}
        className='mb-md-4'
      >
        <Card.Body>
          <Card.Title>{props.parkingName.name}</Card.Title>
          <Card.Text>
            <h5>Address : {props.parkingName.address}</h5>
            <h5>Phone : {props.parkingName.phone}</h5>
            <h5>Status : {props.parkingName.status}</h5>
            <h5>Rate : {props.parkingName.rate}</h5>
          </Card.Text>
        </Card.Body>
      </Card>
      <input
        type='hidden'
        id='parkingid'
        name='parkingid'
        value={props.parkingName.id}
      ></input>
    </div>
  );

  if (props.isLoading) {
    return <AppLoading></AppLoading>;
  }
  return (
    <Container>
      <div className='page-header'>
        <h4>Booking Page</h4>
        <h3>{parkingspaceElements}</h3>

        <AppNotification error={props.error}></AppNotification>
        {/* {props.error && <div>{props.error.message}</div>} */}
      </div>
      <Form className='form-signup' autoComplete='off'>
        <Form.Group className='mb-3' controlId='formBasicInput'>
          <Form.Label>From Time</Form.Label>
          <Form.Control
            type='datetime-local'
            placeholder='From Time'
            value={fromtime}
            onChange={(e) => setfromTime(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='mb-3' controlId='formBasicInput'>
          <Form.Label>To Time:</Form.Label>
          <Form.Control
            type='datetime-local'
            placeholder='Enter to time'
            value={totime}
            onChange={(e) => settoTimee(e.target.value)}
          ></Form.Control>
        </Form.Group>

        {/* <Form.Group className='mb-3' controlId='formBasicEmail'>
          <Form.Label>Email Id:</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter Email'
            value={userid}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete='off'
          ></Form.Control>
        </Form.Group>

        <Form.Group className='mb-3' controlId='formBasicPassword'>
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group> */}

        {/* TODO - Add profile picture later */}
        {/* <div className='form-group'>
          <label>File input</label>
          <input type='file' id='exampleInputFile' />
          <p className='help-block'>Example block-level help text here.</p>
        </div> */}

        <button variant='light' className='btn-signup-submit' onClick={onSave}>
          Book
        </button>
      </Form>

      <div>No Cancellation: This booking will start immediately</div>
    </Container>
  );
}

//add the state data to local props for easy access
function mapStateToProps(state, ownProps) {
  return {
    // isLoading: state.signup.isLoading,
    parkingspaceList: state.parkingspace.parkingspaceList,
    isBookingCreated: state.bookings.isBookingCreated,
    parkingName: state.parkingspace.parkingName,
    isLoading: state.bookings.isLoading,
    // error: state.signup.error,
    // isSignedUp: state.signup.isSignedUp,
    isOrderIdGenerated: state.bookings.isOrderIdGenerated,
  };
}

//maping createUser to props
const mapDispatchToProps = {
  getParkingName: getParkingName,
  createBooking: createBooking,
  checkout: checkout,
  updateOrderID: updateOrderID,
};

//connect injects dispatch in every object of mapDispatchToProps
const ConnectedSignup = connect(
  mapStateToProps,
  mapDispatchToProps
)(BookingPage);
export default ConnectedSignup;
