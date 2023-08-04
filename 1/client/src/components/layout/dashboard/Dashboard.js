import { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getProfile } from '../../../actions/profile';
import Spinner from '../../../utils/spinner';

const Dashboard = ({ getProfile, profile, auth }) => {
  useEffect(() => {
    getProfile();
  }, [])

  return profile.loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Dashboard</h1>
      <p className='lead'>
        <i className='fas fa-user' />{' '}
        Welcome Abroad {auth.user && auth.user.name}
      </p>

      {profile.profile ? 'has' : (
        <Fragment>
          <p>Looks like, you have not set up your profile yet, please add some info</p>
          <Link to="/create-profile" className="btn btn-primary my-1">Create Profile</Link>
        </Fragment>
      )}

    </Fragment>
  )
}
const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth,
})
Dashboard.porpTypes = {
  getProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
}
export default connect(mapStateToProps, { getProfile })(Dashboard);