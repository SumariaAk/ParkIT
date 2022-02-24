import React, { useEffect, useState } from 'react';
import './AppParkingSpace.scss';
import AppMap from '../AppMap/AppMap';
import { connect } from 'react-redux';

import { Container, Form } from 'react-bootstrap';
import {
  createParkingSpace,
  updateSuccessParam,
} from '../../Store/Actions/parkingspace.action';
import AppLoading from '../AppLoading/AppLoading';
import AppNotification from '../AppNotification/AppNotification';
import { useHistory } from 'react-router-dom';
import { Alert } from 'react-bootstrap';

function AppParkingSpace(props) {
  const [parking_name, setParkingName] = useState('');
  const [parking_entrance, setParkingDetails] = useState('');
  const [parking_address, setParkingAddress] = useState('');
  const [city, setCityName] = useState('');
  const [contact_no, setContactNo] = useState('');
  const [rate, setRate] = useState('');
  const [parking_img, setParkingImg] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const history = useHistory();

  const onSave = () => {
    console.log('onSave called ');
    const data = new FormData();
    data.append('userid', sessionStorage.getItem('id'));
    data.append('username', sessionStorage.getItem('userid'));
    data.append('name', parking_name);
    data.append('parking_entrance', parking_entrance);
    data.append('address', parking_address);
    data.append('city', city);
    data.append('phone', contact_no);
    data.append('rate', rate);
    data.append('parking_img', parking_img);
    data.append('coordinates', [longitude, latitude]);
    data.append('latitude', latitude);
    data.append('longitude', longitude);

    props.createParkingSpace(data);
  };

  const setCoordinates = (coordinates) => {
    console.log(coordinates);
    setLatitude(coordinates.lat);
    setLongitude(coordinates.lng);
  };

  const onFileChange = (event) => {
    console.log(event.target.files[0]);
    setParkingImg(event.target.files[0]);
  };

  if (props.isSuccess) {
    setTimeout(() => {
      props.history.push('/search'); // redirect to search page
      props.updateSuccessParam(false); //update the success param so user can create another space
    }, 3000);
    return <Alert variant='success'>Parking Space Successfully Added </Alert>;
  }

  if (props.isLoading) {
    return <AppLoading></AppLoading>;
  }

  if (props.error != undefined) {
    return <AppNotification error={props.error}></AppNotification>;
  }

  return (
    <Container>
      <div className='page-header'>
        <h4>Add Parking Space</h4>
        <AppNotification error={props.error}></AppNotification>
      </div>
      <div className='grid-container-holder'>
        <div className='grid-child'>
          <Form className='form-signup' autoComplete='off'>
            <Form.Group className='mb-3' controlId='formBasicInput'>
              <Form.Label>Parking Space Near:</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Parking Space Locality'
                value={parking_name}
                onChange={(e) => setParkingName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group className='mb-3' controlId='formBasicInput'>
              <Form.Label>Parking Details:</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Parking Space Details '
                value={parking_entrance}
                onChange={(e) => setParkingDetails(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group
              className='mb-3'
              controlId='formBasicInput'
              autocomplete='off'
            >
              <Form.Label>Parking Space Full Address:</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Parking Space Full Address '
                value={parking_address}
                onChange={(e) => setParkingAddress(e.target.value)}
                autoComplete='off'
              ></Form.Control>
            </Form.Group>
            <Form.Group className='mb-3' controlId='formBasicInput'>
              <Form.Label>City:</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter City Name '
                value={city}
                onChange={(e) => setCityName(e.target.value)}
                autoComplete='off'
              ></Form.Control>
            </Form.Group>

            <Form.Group className='mb-3' controlId='formBasicInput'>
              <Form.Label>Contact No:</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Contact No '
                value={contact_no}
                onChange={(e) => setContactNo(e.target.value)}
                autoComplete='off'
              ></Form.Control>
            </Form.Group>

            <Form.Group className='mb-3' controlId='formBasicInput'>
              <Form.Label>Rate:</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Parking Charges (hourly) '
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                autoComplete='off'
              ></Form.Control>
            </Form.Group>

            <Form.Group className='position-relative mb-3'>
              <Form.Label>Upload Parking Space Photo:</Form.Label>
              <Form.Control
                type='file'
                defaultValue={parking_img}
                onChange={(e) => onFileChange(e)}
              />
            </Form.Group>
            <button
              variant='light'
              className='btn-parking-space-submit'
              onClick={onSave}
            >
              Submit
            </button>
          </Form>
        </div>
        <div className='grid-child'>
          <AppMap setCoordinates={setCoordinates}></AppMap>
        </div>
      </div>
    </Container>
  );
}

//add the state data to local props for easy access
function mapStateToProps(state, ownProps) {
  return {
    isLoading: state.parkingspace.isLoading,
    parkingspace: state.parkingspace.parkingspace,
    error: state.parkingspace.error,
    isSuccess: state.parkingspace.isAddedSuccessfully,
  };
}

//maping createUser to props
const mapDispatchToProps = {
  createParkingSpace: createParkingSpace,
  updateSuccessParam: updateSuccessParam,
};

//connect injects dispatch in every object of mapDispatchToProps
const ConnectedParkingSpace = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppParkingSpace);
export default ConnectedParkingSpace;
