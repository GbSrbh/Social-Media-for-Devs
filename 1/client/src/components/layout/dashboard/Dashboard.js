import { Fragment, useEffect } from 'react';
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

      {profile.profile ? 'has' : 'hasNot'}

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