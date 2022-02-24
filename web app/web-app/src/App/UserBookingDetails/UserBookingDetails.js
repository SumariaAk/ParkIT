
import './UserBookingDetails.scss';
import MapView from '../MapView/MapView';
import { View, StyleSheet, Text } from 'react-native';
import Map from '../Map/Map';
import { connect } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { getParkingSpace } from '../../Store/Actions/parkingspace.action.js';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import BookingPage from '../BookingPage/BookingPage'
import { getBookings, deleteBookings,updateBookingStatus } from '../../Store/Actions/booking.action';
import { getParkingName } from '../../Store/Actions/parkingspace.action.js';
import { Table } from 'react-bootstrap';
import { Container, Form } from 'react-bootstrap';
import  Model  from '../Model/Model';
import AppNotification from '../AppNotification/AppNotification';
import Moment from 'react-moment';
import moment from 'moment';
//import 'moment-timezone';



function UserBookingDetails(props) {

    const [parkingname, setParkingName] = useState('');
    const [modal, setModal] = useState(false);
    const [modalname, setname] = useState('');
    const [modalInputName,setModalInputName] = useState('');
    const [isUpdating,setIsUpdating] = useState(false);    
    const [parkingdetailsupdate, setparkingdetailsupdate] = useState('');
    const [fromtime, setfromTime] = useState('');
  const [totime, settoTimee] = useState('');


    useEffect(() => {
       console.log("useEffeet");
       console.log(props.bookingdetailList);
        // //    alert( props.state.search);
       // if (!props.wasLoadingDone) {
           if (props.bookingdetailList.length === 0) {
               props.getBookings(sessionStorage.getItem('id'));
           }
       // }

        //   if (props.parkingName.length == 0) {
        //     props.getParkingName(sessionStorage.getItem("parkingspaceid"));
        //   }
    }, [props.bookingdetailList]);

    const onSave = (id) => {

        const bookingObject = {
            fromtime,
            totime
          };

        props.updateBookingStatus(id,bookingObject);
          
        setIsUpdating(false);
        window.location.reload(true)
        //setTimeout(() => { window.location.reload(true)}, 100);
       


    //     setparkingspaceid(document.getElementById("parkingid").value);
    //     setUserid(document.getElementById("parkingid").value);
    
    //     const bookingObject = {
    //       fromtime,
    //       totime,
    //       userid,
    //       parkingspaceid,
    //       parkingspaceobject,
    //     };
    //     props.createBooking(bookingObject);
    
        
    
    //     // if (props.isBookingCreated) {
    //        history.push('/userbookingdetails');
    //     // }
    
    //     console.log("after fetching order id");
    //   };
    //   if(props.isOrderIdGenerated){
    //     displayRazorpayy();
    
      };

    //props.bookingdetailList.map((post => post.parkingspaceobject.map((post2 => post2.name))))
    const bookingupdate = (post) => {

        setIsUpdating(true)
        setparkingdetailsupdate(post);
        setfromTime(post.fromtime);
        settoTimee(post.totime);
        
        alert(post.id);
        // <BookingPage parkingName={props.parkingName}> Hi</BookingPage>

    
    }

    const deleteBooking = (id) => 
    {
        props.deleteBookings(id);
        window.location.reload();
    }




    const parkingspaceElements = props.bookingdetailList.map((post,i) =>
    
        <tbody>
            <tr>
                <td>{i+1}</td>
                <td>{sessionStorage.getItem('userid')}</td>
                <td>{post.parkingspaceobject.map((parking) => parking.name)}</td>
                <td>{moment(new Date(post.fromtime)).format("DD/MM/YYYY HH:MM:SS")}</td>
                <td>{moment(new Date(post.totime)).format("DD/MM/YYYY HH:MM:SS")}</td>
                <td>{post.orderid}</td>
                <td><Button variant='light' className='btn-nav' onClick={e => bookingupdate(post)} >Update</Button></td>
                <td><Button variant='light' className='btn-nav' onClick={() => deleteBooking(post.id)}>Delete</Button></td>

            </tr>
        </tbody>
    );


    return (<div>

        {<Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>UserId</th>
                    <th>ParkingSpace</th>
                    <th>FromTime</th> 
                    <th>ToTime</th> 
                    <th>OrderId</th> 
                    <th>Update</th>
                    <th>Delete</th>
                </tr>
            </thead>
            {parkingspaceElements}

        </Table>}
        {/* {isUpdating && <BookingPage parkingName={props.parkingdetailsupdate} isUpdating={props.isUpdating}></BookingPage>} */}
        {isUpdating &&
            <Container>
            <div className='page-header'>
              <h4>Booking Page</h4>
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
              <button variant='light' className='btn-signup-submit' onClick={() => onSave(parkingdetailsupdate.id,parkingdetailsupdate)}>
                Update
                </button>
                 </Form>
                 
          </Container>
        }
        

    </div>);
}

function mapStateToProps(state, ownProps) {
    return {
        bookingdetailList: state.bookings.bookingdetailList,
        isLoading: state.bookings.isLoading,
        wasLoadingDone: state.bookings.wasLoadingDone,
        parkingName: state.parkingspace.parkingName,


        //parkingname :parkingname ,
    };
}
const mapDispatchToProps = {
    getBookings: getBookings,
    getParkingName: getParkingName,
    deleteBookings: deleteBookings,
    updateBookingStatus:updateBookingStatus,
};

const ConnectedViewPage = connect(mapStateToProps, mapDispatchToProps)(UserBookingDetails);
export default ConnectedViewPage;
