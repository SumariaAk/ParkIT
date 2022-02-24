import React, { useState } from 'react';
import './AppListingDetails.scss';
import { Card, CardGroup, Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { FiEdit3 } from 'react-icons/fi';
import { RiDeleteBin5Line } from 'react-icons/ri';
import {
  deleteListing,
  updateListing,
} from '../../Store/Actions/listings.action';
import { connect } from 'react-redux';
import { Form } from 'react-bootstrap';
import AppNotification from '../AppNotification/AppNotification';

import AppParkingSpace from '../AppParkingSpace/AppParkingSpace';

function AppListingDetails(props) {
  const { item } = props;
  let [isEditable, setEditable] = useState();
  let [parking_name, setParkingName] = useState();
  let [parking_entrance, setParkingDetails] = useState();
  let [parking_address, setParkingAddress] = useState();
  let [city, setCityName] = useState();
  let [contact_no, setContactNo] = useState();
  let [rate, setRate] = useState();
  let [parking_img, setParkingImg] = useState();

  const onFileChange = (event) => {
    console.log(event.target.files[0]);
    setParkingImg(event.target.files[0]);
  };
  const deleteBtnClick = () => {
    console.log(item.id);
    props.deleteListing(item.id);
  };

  const onUpdate = (event) => {
    if (parking_name === undefined) {
      parking_name = item.name;
    }
    if (parking_entrance === undefined) {
      parking_entrance = item.parking_entrance;
    }

    if (parking_address === undefined) {
      parking_address = item.address;
    }

    if (city === undefined) {
      city = item.city;
    }

    if (contact_no === undefined) {
      contact_no = item.phone;
    }

    if (rate === undefined) {
      rate = item.rate;
    }
    const data = new FormData();
    data.append('_id', item.id);
    data.append('userid', sessionStorage.getItem('id'));
    data.append('username', sessionStorage.getItem('userid'));
    data.append('name', parking_name);
    data.append('parking_entrance', parking_entrance);
    data.append('address', parking_address);
    data.append('city', city);
    data.append('phone', contact_no);
    data.append('rate', rate);
    data.append('parking_img', parking_img);

    console.log('onUpdate called');
    console.log(parking_name);
    props.updateListing(data, item.id);
  };

  const imgUrl = `http://localhost:3002/parkingimg/${item.parking_img}`;
  console.log(imgUrl);

  return (
    <Card key={item.id} style={{ width: '30rem' }} className='mb-md-4'>
      <Card.Img variant='top' src={imgUrl} className='card-img-top' />
      <Card.Body>
        <Card.Title>{item.name}</Card.Title>
        <Card.Text>
          <div>Entrance: {item.parking_entrance}</div>
          <div>Contact Details: {item.phone}</div>
          <div>Address: {item.address}</div>
          <div>City: {item.city}</div>
          <div>Rate: {item.rate}</div>
          <div>
            <FiEdit3
              className='mr-md-4 fas fa-expand-alt'
              onClick={(e) => setEditable(!isEditable)}
            />
            <RiDeleteBin5Line
              className='btn-listing-details'
              onClick={deleteBtnClick}
            />
          </div>
        </Card.Text>
        {isEditable && (
          <div>
            <Container>
              <div className='page-header'>
                <u>
                  <h6>Edit Parking Space Details</h6>
                </u>
                <AppNotification error={props.error}></AppNotification>
              </div>
              <Form className='form-signup' autoComplete='off'>
                <Form.Group className='mb-3' controlId='formBasicInput'>
                  <Form.Label>Parking Space Near:</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter Parking Space Locality'
                    defaultValue={item.name}
                    value={parking_name}
                    autoComplete='off'
                    onChange={(e) => setParkingName(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group className='mb-3' controlId='formBasicInput'>
                  <Form.Label>Parking Details:</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter Parking Space Details '
                    defaultValue={item.parking_entrance}
                    value={parking_entrance}
                    autoComplete='off'
                    onChange={(e) => setParkingDetails(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group className='mb-3' controlId='formBasicInput'>
                  <Form.Label>Parking Space Full Address:</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter Parking Space Full Address '
                    defaultValue={item.address}
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
                    defaultValue={item.city}
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
                    defaultValue={item.phone}
                    onChange={(e) => setContactNo(e.target.value)}
                    autoComplete='off'
                  ></Form.Control>
                </Form.Group>

                <Form.Group className='mb-3' controlId='formBasicInput'>
                  <Form.Label>Rate:</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter Parking Charges (hourly) '
                    defaultValue={item.rate}
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
                  onClick={onUpdate}
                >
                  Update
                </button>
              </Form>
            </Container>
          </div>
        )}
      </Card.Body>
    </Card>
  );
}

//add the state data to local props for easy access
function mapStateToProps(state, ownProps) {
  return {};
}

//maping fetchListings to props
const mapDispatchToProps = {
  deleteListing: deleteListing,
  updateListing: updateListing,
};

//map methods to connect and export
const ConnectedListingDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppListingDetails);
export default ConnectedListingDetails;
