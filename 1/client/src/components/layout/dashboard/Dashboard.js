import { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteAccount, getProfile } from '../../../actions/profile';
import Spinner from '../../../utils/spinner';
import Experience from '../../profile-forms/Experience';
import Education from '../../profile-forms/Education';

const Dashboard = ({ getProfile, profile, auth, deleteAccount }) => {
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

      {profile.profile ? (
        <Fragment>
          <div className="dash-buttons">
            <Link to="/edit-profile" className="btn btn-light"
            ><i className="fas fa-user-circle text-primary"></i> Edit Profile</Link>
            <Link to="/add-experience" className="btn btn-light"
            ><i className="fab fa-black-tie text-primary"></i> Add Experience</Link>
            <Link to="/add-education" className="btn btn-light"
            ><i className="fas fa-graduation-cap text-primary"></i> Add Education</Link>
          </div>
          <Experience experience={profile.profile.experience} />
          <Education education={profile.profile.education} />
          <div className="my-2">
            <button onClick={() => deleteAccount()} className='btn btn-danger'>
              <i className='fas fa-user-minus'></i>  Delete my Account
            </button>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <p>Looks like, you have not set up your profile yet, please add some info</p>
          <Link to="/create-profile" className="btn btn-primary my-1">Create Profile</Link>
          <div className="my-2">
            <button onClick={() => deleteAccount()} className='btn btn-danger'>
              <i className='fas fa-user-minus'></i>  Delete my Account
            </button>
          </div>
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
  deleteAccount: PropTypes.func.isRequired,
}
export default connect(mapStateToProps, { getProfile, deleteAccount })(Dashboard);