import React, { useEffect, useState } from 'react';
import './AppSignup.scss';
import { connect } from 'react-redux';
import { createUser } from '../../Store/Actions/signup.actions';
import { Container, Form } from 'react-bootstrap';
import AppLoading from '../AppLoading/AppLoading';
import AppNotification from '../AppNotification/AppNotification';
import { useHistory } from 'react-router-dom';

function AppSignup(props) {
  // const state = useSelector((state) => state.signup);

  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [userid, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const onSave = () => {
    const userObject = {
      first_name,
      last_name,
      userid,
      password,
    };

    props.createUser(userObject);
  };

  //method

  useEffect(() => {
    console.log('inside useEffect');
    if (props.isSignedUp) {
      history.push('/login');
    }
  }, [props.user]);

  if (props.isLoading) {
    return <AppLoading></AppLoading>;
  }
  return (
    <Container>
      <div className='page-header'>
        <h4>Sign Up</h4>
        <AppNotification error={props.error}></AppNotification>
        {/* {props.error && <div>{props.error.message}</div>} */}
      </div>
      <Form className='form-signup' autoComplete='off'>
        <Form.Group className='mb-3' controlId='formBasicInput'>
          <Form.Label>First Name:</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter First Name'
            value={first_name}
            onChange={(e) => setFirstName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='mb-3' controlId='formBasicInput'>
          <Form.Label>Last Name:</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter Last Name'
            value={last_name}
            onChange={(e) => setLastName(e.target.value)}
          ></Form.Control>
        </Form.Group>

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

        {/* TODO - Add profile picture later */}
        {/* <div className='form-group'>
          <label>File input</label>
          <input type='file' id='exampleInputFile' />
          <p className='help-block'>Example block-level help text here.</p>
        </div> */}
        <button variant='light' className='btn-signup-submit' onClick={onSave}>
          Submit
        </button>
      </Form>
    </Container>
  );
}

//add the state data to local props for easy access
function mapStateToProps(state, ownProps) {
  return {
    isLoading: state.signup.isLoading,
    user: state.signup.user,
    error: state.signup.error,
    isSignedUp: state.signup.isSignedUp,
  };
}

//maping createUser to props
const mapDispatchToProps = {
  createUser: createUser,
};

//connect injects dispatch in every object of mapDispatchToProps
const ConnectedSignup = connect(mapStateToProps, mapDispatchToProps)(AppSignup);
export default ConnectedSignup;
