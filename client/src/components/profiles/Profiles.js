import { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { getProfiles, setSkills } from '../../actions/profile';
import PropTypes from 'prop-types';
import Spinner from '../../utils/spinner';
import ProfileItem from './ProfileItem';

const Profiles = ({ getProfiles, setSkills, profile }) => {

  useEffect(() => {
    setSkills();
    getProfiles();
  }, [setSkills, getProfiles])

  let i = 0;
  return (
    <Fragment>
      {profile.loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className="large text-primary">Developers</h1>
          <p className="lead">
            <i className="fab fa-connectdevelop"></i> Browse and connect with developers
          </p>
          <div className="profiles">
            {profile.profiles.length > 0 ? (
              profile.profiles.map((item) => <ProfileItem key={item._id} profile={item} i={i++} />) //item is profile
            ) : (
              <h4>No Profile Found...</h4>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  )
}

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  setSkills: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  profile: state.profile,
})

export default connect(mapStateToProps, { getProfiles, setSkills })(Profiles);