import React, { useState, useEffect } from 'react';
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  InfoWindow,
} from 'react-google-maps';

function AppMap(props) {
  //set default position to state
  const [currentPosition, setCurrentPosition] = useState({
    lat: 42.3398067,
    lng: -71.0913604,
  });

  useEffect(() => {
    props.setCoordinates(currentPosition);
  }, [currentPosition]);

  const success = (position) => {
    const currentPosition = {
      lat: position.latLng.lat(),
      lng: position.latLng.lng(),
    };
    setCurrentPosition(currentPosition);
  };

  return (
    <GoogleMap
      defaultZoom={10}
      center={currentPosition}
      onClick={(e) => success(e)}
    >
      <Marker position={currentPosition} />
    </GoogleMap>
  );
}
const MapWrapped = withScriptjs(withGoogleMap(AppMap));

export default function App(props) {
  return (
    <div style={{ width: '48vw', height: '100vh' }}>
      <MapWrapped
        {...props}
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=YOURAPIKEY`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
  );
}
