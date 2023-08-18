import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { getProfileById } from '../../actions/profile';
import Spinner from '../../utils/spinner';

const Profile = ({ getProfileById, profile, auth }) => {

  const { id } = useParams();

  useEffect(() => {
    getProfileById(id);
  }, [getProfileById])

  return (
    <Fragment>
      {profile.profile === null || profile.loading ? (<Spinner />) : (
        <Fragment>
          <Link to="/profiles" className="btn btn-light" >Back To Profiles</Link>
          {auth.isAuthenticated && !auth.loading && auth.user._id === profile.profile.user._id && <Link to="/edit-profile " className='btn btn-dark'>Edit Profile</Link>}
        </Fragment>
      )}
    </Fragment>
  )
}
const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
})
export default connect(mapStateToProps, { getProfileById })(Profile);