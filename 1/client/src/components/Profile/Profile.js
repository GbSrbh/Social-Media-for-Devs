import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams, Link } from 'react-router-dom';

import Spinner from '../../utils/spinner';
import { getProfileById } from '../../actions/profile';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import ProfileGithub from './ProfileGithub';

const Profile = ({ getProfileById, profile, auth }) => {

  const { id } = useParams();

  useEffect(() => {
    getProfileById(id);
  }, [getProfileById, id])

  return (
    <Fragment>
      {profile.profileById === null || profile.loading ?
        (<Spinner />) :
        (<Fragment>
          <Link to="/profiles" className="btn btn-light" >Back To Profiles</Link>
          {auth.isAuthenticated && !auth.loading && auth.user._id === profile.profileById.user._id && <Link to="/edit-profile " className='btn btn-dark'>Edit Profile</Link>}

          <div className="profile-grid my-1">

            <ProfileTop profile={profile.profileById} />

            <ProfileAbout profile={profile.profileById} />

            {/* <!-- Experience --> */}
            <div className="profile-exp bg-white p-2">
              <h2 className="text-primary">Experience</h2>
              {profile.profileById.experience.length > 0 ? (
                <Fragment>
                  {profile.profileById.experience.map((experience) => <ProfileExperience key={experience._id} experience={experience} />)}
                </Fragment>
              ) : (
                <h4>No experience credentials found.</h4>
              )}
            </div>

            {/* <!-- Education --> */}
            <div className="profile-edu bg-white p-2">
              <h2 className="text-primary">Education</h2>
              {profile.profileById.education.length > 0 ? (
                <Fragment>
                  {profile.profileById.education.map((education) => <ProfileEducation key={education._id} education={education} />)}
                </Fragment>
              ) : (
                <h4>No education credentials found.</h4>
              )}
            </div>
            {/* <!-- GITHUB repos --> */}
            {profile.profileById.githubusername && (
              <ProfileGithub userName={profile.profileById.githubusername} />
            )}
          </div>
        </Fragment >
        )
      }
    </Fragment >
  )
}
const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
})
export default connect(mapStateToProps, { getProfileById })(Profile);