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
      {profile.profile === null || profile.loading ?
        (<Spinner />) :
        (<Fragment>
          <Link to="/profiles" className="btn btn-light" >Back To Profiles</Link>
          {auth.isAuthenticated && !auth.loading && auth.user._id === profile.profile.user._id && <Link to="/edit-profile " className='btn btn-dark'>Edit Profile</Link>}

          <div className="profile-grid my-1">
            {/* <!-- Profile Top --> */}
            <ProfileTop profile={profile.profile} />
            {/* <!-- Profile About --> */}
            <ProfileAbout profile={profile.profile} />
            {/* <!-- Experience --> */}
            <div className="profile-exp bg-white p-2">
              <h2 className="text-primary">Experience</h2>
              {profile.profile.experience.length > 0 ? (
                <Fragment>
                  {profile.profile.experience.map((experience) => <ProfileExperience key={experience._id} experience={experience} />)}
                </Fragment>
              ) : (
                <h4>No experience credentials found.</h4>
              )}
            </div>
            {/* <!-- Education --> */}
            <div className="profile-edu bg-white p-2">
              <h2 className="text-primary">Education</h2>
              {profile.profile.education.length > 0 ? (
                <Fragment>
                  {profile.profile.education.map((education) => <ProfileEducation key={education._id} education={education} />)}
                </Fragment>
              ) : (
                <h4>No education credentials found.</h4>
              )}
            </div>
            {/* <!-- GITHUB repos --> */}
            {profile.profile.githubusername && (
              <ProfileGithub userName={profile.profile.githubusername} />
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