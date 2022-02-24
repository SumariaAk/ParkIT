import './ViewPage.scss';
import MapView from '../MapView/MapView';
import { View, StyleSheet, Text } from 'react-native';
import Map from '../Map/Map';
import { connect } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { getParkingSpace } from '../../Store/Actions/parkingspace.action.js';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import BookingPage from '../BookingPage/BookingPage';
import { Container, Form, Row, Col, FormLabel } from 'react-bootstrap';

function ViewPage(props) {
  const [parkingname, setParkingName] = useState('');

  useEffect(() => {
    console.log('View Page use Effect');
    // if (props.parkingspaceList.length === 0) {
    //    // history.push('/search/');
    //  }
    // return () =>
    // {

    // };
  });

  const onGet = () => {
    console.log(parkingname);
    props.getParkingSpace(parkingname);
  };

  const history = useHistory();

  const tobookingPage = (event) => {
    //this.props.params.address;
    //return(<BookingPage ></BookingPage>)
    sessionStorage.setItem('parkingspaceid', event.target.id);
    history.push('/bookingpage/', event);
    // <Link to="/bookingpage">About</Link>
    // <BookingPage >Add a trip</BookingPage>

    //   alert(search);
    //   <Link className='btn-link-nav' to='viewpage'>
    //   Search
    //  </Link>
    //added new line
    //asdasdads
    //added new line
  };

  const parkingspaceElements = props.parkingspaceList.map((post) => (
    <div class='card-body'>
      <img
        src={`http://localhost:3002/parkingimg/${post.parking_img}`}
        width='400px'
        height='400px'
        className='card-img-top'
      ></img>
      <h5 class='card-title' value={post.name}>
        {post.name}
      </h5>
      <p class='card-text'>{post.address}</p>
      <a
        variant='light'
        className='btn-view-page btn'
        to='login'
        id={post.id}
        value={post.id}
        onClick={tobookingPage}
      >
        Book
      </a>
    </div>
  ));

  return (
    <div>
      <nav class='navbar navbar-light bg-light'>
        <div class='container-fluid'>
          <form>
            <div class='form-row align-items-center'>
              <div class='col-auto'>
                <label class='sr-only' for='inlineFormInput'>
                  Place
                </label>
                <lable class='sr-only'>City :</lable>
                <input
                  type='text'
                  onChange={(e) => setParkingName(e.target.value)}
                  placeholder='Boston,MA'
                />
                From Time :
                <input type='datetime-local' />
                To Time :
                <input type='datetime-local' />
              </div>

              <div class='col-auto'>
                <Button className='btn-view-page' onClick={onGet}>
                  Search
                </Button>
                {/* <Button variant='light' className='btn-nav'>
                                    <Link className='btn-link-nav' to='viewpage'>
                                        Search
                                    </Link>
                                </Button> */}
                {/* <button type="submit" class="btn btn-primary mb-2">Search</button> */}
              </div>
            </div>
          </form>
        </div>
      </nav>

      <div class='container-main'>
        {props.params}
        <div class='card'></div>{' '}
        <div class='card-body'>{parkingspaceElements} </div>{' '}
      </div>
      <div class='container-main'>
        <Map parkingspaceList={props.parkingspaceList}> </Map>
      </div>
    </div>
  );
}

function mapStateToProps(state, ownProps) {
  return {
    parkingspaceList: state.parkingspace.parkingspaceList,
    //parkingname :parkingname ,
  };
}
const mapDispatchToProps = {
  getParkingSpace: getParkingSpace,
};

const ConnectedViewPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewPage);
export default ConnectedViewPage;
