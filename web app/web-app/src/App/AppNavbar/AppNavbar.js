import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import './AppNavbar.scss';
import { Col, Image, NavDropdown } from 'react-bootstrap';
import Figure from 'react-bootstrap/Figure';
import { connect } from 'react-redux';
import { updateLoggedInStatus } from '../../Store/Actions/login.actions';
import { useHistory } from 'react-router-dom';

function AppNavbar(props) {
  const history = useHistory();
  let [isUserLoggedIn, setLogInStatus] = useState();

  if (sessionStorage.getItem('id') != null) {
    isUserLoggedIn = true;
  }

  const logoutUser = () => {
    isUserLoggedIn = false;
    sessionStorage.removeItem('token'); //JWT token
    sessionStorage.removeItem('id'); //id
    sessionStorage.removeItem('userid'); //email id

    props.updateLoggedInStatus(false);
  };

  const addSpace = () => {
    history.push('/addspace');
  };

  const bookingDetails = () => {
    history.push('/userbookingdetails');
  };

  return (
    <Navbar className='app-navbar' expand='lg' fixed='top'>
      <div className='container-fluid'>
        <div className='navbar-header'>
          <Navbar.Brand href='#' className='text-nav'>
            Park It
          </Navbar.Brand>
          <img
            src='/assets/parking_it_icon_1.png'
            width='48px'
            height='45px'
            alt='Icon'
          ></img>
        </div>
        <Navbar.Toggle />

        {!isUserLoggedIn && (
          <Navbar.Collapse className='justify-content-end'>
            <Button variant='light' className='btn-nav'>
              <Link className='btn-link-nav' to='login'>
                Sign In
              </Link>
            </Button>

            <Button variant='light' className='btn-nav'>
              <Link className='btn-link-nav' to='signup'>
                Sign Up
              </Link>
            </Button>
          </Navbar.Collapse>
        )}
        {isUserLoggedIn && (
          <NavDropdown
            title='User'
            id='basic-nav-dropdown'
            className='nav-dropdown-user'
          >
            <NavDropdown.Item>
              <Link className='btn-link-nav' to='/listings'>
                Listings
              </Link>
            </NavDropdown.Item>
          </NavDropdown>
        )}
        {isUserLoggedIn && (
          <Navbar.Collapse className='justify-content-end'>
            <Button
              variant='light'
              className='btn-nav'
              onClick={bookingDetails}
            >
              Booking Details
            </Button>
            <Button variant='light' className='btn-nav' onClick={addSpace}>
              Add Space
            </Button>

            <Button variant='light' className='btn-nav' onClick={logoutUser}>
              Logout
            </Button>

            <Image
              src='assets/user-profile.png'
              height='35px'
              width='35px'
              roundedCircle
            />
          </Navbar.Collapse>
        )}
      </div>
    </Navbar>
  );
}

function mapStateToProps(state, ownProps) {
  return {
    isLoggedIn: state.login.isLoggedIn,
  };
}
const mapDispatchToProps = {
  updateLoggedInStatus: updateLoggedInStatus,
};

const ConnectedNavbar = connect(mapStateToProps, mapDispatchToProps)(AppNavbar);
export default ConnectedNavbar;
