import { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useNavigate, Link } from 'react-router-dom';

import { createProfile, getProfile } from '../../actions/profile';

const EditProfile = ({ createProfile, profile, getProfile }) => {
  const [formData, setFormData] = useState({
    company: '',
    website: '',
    location: '',
    status: '',
    skills: '',
    githubusername: '',
    bio: '',
    twitter: '',
    facebook: '',
    youtube: '',
    linkedin: '',
    instagram: ''
  });


  const [toggleSocialMedialFields, setToggleSocialMediaFields] = useState(false);
  const { company,
    website,
    location,
    status,
    skills,
    githubusername,
    bio,
    twitter,
    facebook,
    youtube,
    linkedin,
    instagram } = formData;

  useEffect(() => {
    getProfile();
    if (profile.profile) {
      setFormData({
        company: profile.loading || !profile.profile ? '' : profile.profile.company ?? '',
        website: profile.loading || !profile.profile ? '' : profile.profile.website ?? '',
        location: profile.loading || !profile.profile ? '' : profile.profile.location ?? '',
        status: profile.loading || !profile.profile ? '' : profile.profile.status ?? '',
        skills: profile.loading || !profile.profile ? '' : profile.profile.skills ?? '',
        githubusername: profile.loading || !profile.profile ? '' : profile.profile.githubusername ?? '',
        bio: profile.loading || !profile.profile ? '' : profile.profile.bio ?? '',
        twitter: profile.loading || !profile.profile.social ? '' : profile.profile.social.twitter ?? '',
        facebook: profile.loading || !profile.profile.social ? '' : profile.profile.social.facebook ?? '',
        youtube: profile.loading || !profile.profile.social ? '' : profile.profile.social.youtube ?? '',
        linkedin: profile.loading || !profile.profile.social ? '' : profile.profile.social.linkedin ?? '',
        instagram: profile.loading || !profile.profile.social ? '' : profile.profile.social.instagram ?? '',
      })
    }
  }, [profile.loading])

  function onChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const navigate = useNavigate();

  function onSubmit(e) {
    e.preventDefault();
    createProfile(formData, true).then(() => {
      navigate('/dashboard');
    })
  }

  return (
    <Fragment>
      <h1 className="large text-primary">
        Edit Your Profile
      </h1>
      <p className="lead">
        <i className="fas fa-user"></i> Let's get some information to make your
        profile stand out
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <select name="status" value={status} onChange={e => onChange(e)}>
            <option value="0">* Select Professional Status</option>
            <option value="Developer">Developer</option>
            <option value="Junior Developer">Junior Developer</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Manager">Manager</option>
            <option value="Student or Learning">Student or Learning</option>
            <option value="Instructor">Instructor or Teacher</option>
            <option value="Intern">Intern</option>
            <option value="Other">Other</option>
          </select>
          <small className="form-text"
          >Give us an idea of where you are at in your career</small
          >
        </div>
        <div className="form-group">
          <input type="text" placeholder="Company" name="company" value={company} onChange={e => onChange(e)} />
          <small className="form-text"
          >Could be your own company or one you work for</small
          >
        </div>
        <div className="form-group">
          <input type="text" placeholder="Website" name="website" value={website} onChange={e => onChange(e)} />
          <small className="form-text"
          >Could be your own or a company website</small
          >
        </div>
        <div className="form-group">
          <input type="text" placeholder="Location" name="location" value={location} onChange={e => onChange(e)} />
          <small className="form-text"
          >City & state suggested (eg. Boston, MA)</small
          >
        </div>
        <div className="form-group">
          <input type="text" placeholder="* Skills" name="skills" value={skills} onChange={e => onChange(e)} />
          <small className="form-text"
          >Please use comma separated values (eg.
            HTML,CSS,JavaScript,PHP)</small
          >
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Github Username"
            name="githubusername"
            value={githubusername} onChange={e => onChange(e)}
          />
          <small className="form-text"
          >If you want your latest repos and a Github link, include your
            username</small
          >
        </div>
        <div className="form-group">
          <textarea placeholder="A short bio of yourself" name="bio" value={bio} onChange={e => onChange(e)}></textarea>
          <small className="form-text">Tell us a little about yourself</small>
        </div>

        <div className="my-2">
          <button type="button" className="btn btn-light" onClick={() => setToggleSocialMediaFields(!toggleSocialMedialFields)}>
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>

        {toggleSocialMedialFields && (
          <Fragment>
            <div className="form-group social-input">
              <i className="fab fa-twitter fa-2x"></i>
              <input type="text" placeholder="Twitter URL" name="twitter" value={twitter} onChange={e => onChange(e)} />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-facebook fa-2x"></i>
              <input type="text" placeholder="Facebook URL" name="facebook" value={facebook} onChange={e => onChange(e)} />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-youtube fa-2x"></i>
              <input type="text" placeholder="YouTube URL" name="youtube" value={youtube} onChange={e => onChange(e)} />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-linkedin fa-2x"></i>
              <input type="text" placeholder="Linkedin URL" name="linkedin" value={linkedin} onChange={e => onChange(e)} />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-instagram fa-2x"></i>
              <input type="text" placeholder="Instagram URL" name="instagram" value={instagram} onChange={e => onChange(e)} />
            </div>
          </Fragment>
        )}
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
      </form>
    </Fragment>
  )
}

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
}
const mapStateToProps = state => ({
  profile: state.profile,
})
export default connect(mapStateToProps, { createProfile, getProfile })(EditProfile);