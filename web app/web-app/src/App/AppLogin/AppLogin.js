import React, { useEffect, useState } from 'react';
import './AppLogin.scss';
import { loginRequest } from '../../Store/Actions/login.actions';
import { connect } from 'react-redux';
import { Container, Form } from 'react-bootstrap';
import AppLoading from '../AppLoading/AppLoading';
import AppNotification from '../AppNotification/AppNotification';
import { useHistory } from 'react-router-dom';
import { updateSignUpStatus } from '../../Store/Actions/signup.actions';

function AppLogin(props) {
  // useEffect(() => {
  //   if (props.userList.length === 0) {
  //     props.getUsers();
  //   }
  // }, [props.user]);

  const [userid, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const onSave = () => {
    const userObject = {
      userid,
      password,
    };

    props.loginRequest(userObject);
  };

  useEffect(() => {
    props.updateSignUpStatus(false);
    // if (localStorage.getItem('token') != null && props.user != undefined) {
    if (sessionStorage.getItem('token') != null) {
      console.log('sessionStorage not null');
      history.push('/');
    }
  }, [props.user]);

  if (props.isLoading) {
    return <AppLoading></AppLoading>;
  }

  return (
    <Container className='login-container'>
      <div className='page-header'>
        <h4 className=''>Log In</h4>
        <AppNotification error={props.error}></AppNotification>
        {/* {props.error && <div>{props.error.message}</div>} */}
      </div>

      <Form>
        <Form.Group className='mb-3' controlId='formBasicEmail'>
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
        </Form.Group>

        <button variant='light' className='btn-signup-submit' onClick={onSave}>
          Submit
        </button>
      </Form>
    </Container>
  );
}

function mapStateToProps(state, ownProps) {
  return {
    isLoading: state.login.isLoading,
    user: state.login.user,
    error: state.login.error,
  };
}
const mapDispatchToProps = {
  loginRequest: loginRequest,
  updateSignUpStatus: updateSignUpStatus,
};

const ConnectedLogin = connect(mapStateToProps, mapDispatchToProps)(AppLogin);
export default ConnectedLogin;
