import React, { useState, useEffect } from 'react';
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  InfoWindow,
} from 'react-google-maps';
import * as parkData from './skateboard-parks.json';
import mapStyles from './mapStyles';
import { connect } from 'react-redux';
import { getParkingSpace } from '../../Store/Actions/parkingspace.action.js';

//import * as parkingSpace from ''

function Map(props) {
  console.log(props.parkingspaceList);

  // console.log(props.parkingspaceList);
  // console.log(JSON.parse( sessionStorage.getItem("parkingSpaceList")));
  const [selectedPark, setSelectedPark] = useState('');
  const [isListEmpty, setIsListEmpty] = useState(false);

  const onMarkerClick = (evt) => {
    console.log(evt);
  };

  useEffect(() => {
    //   if(props.parkingspaceList.length ==0)
    //   {
    //     setIsListEmpty(true);
    //     if(isListEmpty)
    //     {
    //       setIsListEmpty(false);
    //      // window.location.reload(true);
    //     }
    //     //setIsListEmpty(false);
    //   }
    //   return()=>
    //   {
    //     setIsListEmpty(false);
    //   };
    //  // var name = document.getElementById("inlineFormInput").value;
  }, props.parkingspaceLis);

  //const parkingspacedata = JSON.parse( sessionStorage.getItem("parkingSpaceList"));

  return (
    <GoogleMap defaultZoom={10} defaultCenter={{ lat: 45.4211, lng: -75.6903 }}>
      {/* <Marker
    title={'The marker`s title will appear as a tooltip.'}
    name={'SOMA'}
    position={{lat: 37.778519, lng: -122.405640}} /> */}
      <Marker onClick={onMarkerClick} {...props} />

      {props.parkingspaceList.map((post) => (
        <Marker
          key={post.id}
          position={{
            lat: post.coordinates[1],
            lng: post.coordinates[0],
          }}
          onClick={() => {
            setSelectedPark(post);
          }}
        />
      ))}

      {!isListEmpty && <Marker />}

      {/* {parkData.features.map(park => (
        <Marker
          key={park.properties.PARK_ID}
          position={{
            lat: park.geometry.coordinates[1],
            lng: park.geometry.coordinates[0]
          }}
          onClick={() => {
            setSelectedPark(park);
          }}

        />
      ))} */}

      {selectedPark && (
        <InfoWindow
          position={{
            lat: selectedPark.coordinates[1],
            lng: selectedPark.coordinates[0],
          }}
        >
          <div>
            <h2>{selectedPark.name}</h2>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}

function mapStateToProps(state, ownProps) {
  return {
    parkingspaceList: state.parkingspace.parkingspaceList,
  };
}
const mapDispatchToProps = {
  getParkingSpace: getParkingSpace,
};

const ConnectedViewPage = connect(mapStateToProps, mapDispatchToProps)(Map);

const MapWrapped = withScriptjs(withGoogleMap(Map));

export default function App(props) {
  console.log('Map');
  console.log(props.parkingspaceList);
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <MapWrapped
        {...props}
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyBc9qYnP-7TMl61AJdV4tCjTlU1qDd6oiM`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
  );
}
