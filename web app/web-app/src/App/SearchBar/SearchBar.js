import React, { useEffect, useState } from 'react';
import './SearchBar.scss';
import ViewPage from '../ViewPage/ViewPage';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { createUser } from '../../Store/Actions/signup.actions';
import { getParkingSpace } from '../../Store/Actions/parkingspace.action';
import { connect } from 'react-redux';
import Map from '../Map/Map';
import { useHistory } from 'react-router-dom';
import PopChat from '../ChatBox/ChatBox';

function SearchBar(props) {
  const history = useHistory();
  const [search, setSearch] = useState('');
  const onGet = () => {
    props.getParkingSpace(search);
    history.push('/viewpage/');
  };

  useEffect(() => {
    console.log('useEffect');
  });

  const msgs = ['Hi', 'How r u'];
  const getMessage = (msg) => {
    console.log(msg);
  };

  return (
    <div>
      {/* <form onSubmit={this.onGet()}> */}
      <section class='hero hero--video'>
        <div class='container'>
          <div class='col-12'>
            <h1 class='mb-3'>PARKING JUST GOT A LOT SIMPLER</h1>

            <div class='search'>
              <form>
                <input
                  class='input'
                  type='text'
                  name='s'
                  placeholder='Boston, MA'
                  autocomplete='off'
                  className='input-search-bar'
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  required
                />
                <button type='submit' onClick={onGet}>
                  <i class='fa fa-search'> Search </i>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      {/* </form> */}
      {/* <PopChat messages={msgs} getMessage={getMessage}/> */}
    </div>
  );
}

//add the state data to local props for easy access
function mapStateToProps(state, ownProps) {
  return {
    parkingspaceList: state.parkingspace.parkingspaceList,
    //address: this.search,
    // error: state.signup.error,
  };
}

//maping createUser to props
const mapDispatchToProps = {
  getParkingSpace: getParkingSpace,
};

//connect injects dispatch in every object of mapDispatchToProps
const ConnectedSignup = connect(mapStateToProps, mapDispatchToProps)(SearchBar);
export default ConnectedSignup;
