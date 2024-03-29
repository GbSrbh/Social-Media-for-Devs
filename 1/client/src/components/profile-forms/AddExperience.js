import { Fragment, useState } from 'react';
import { addExperience } from '../../actions/profile';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useNavigate, Link } from 'react-router-dom';
import { setAlert } from '../../actions/alert';

const AddExperience = ({ addExperience, profile }) => {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    from: '',
    to: '',
    current: false,
    description: ''
  });
  const [currentJob, setCurrentJob] = useState(false);

  const {
    title,
    company,
    location,
    from,
    to,
    current,
    description
  } = formData;

  function onChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const navigate = useNavigate();
  function onSubmit(e) {
    e.preventDefault();
    addExperience(formData);
    navigate('/dashboard');
  }

  return (
    <Fragment>
      <h1 className="large text-primary">
        Add An Experience
      </h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Add any developer/programming
        positions that you have had in the past
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={e => onSubmit(e)} >
        <div className="form-group">
          <input type="text" placeholder="* Job Title" name="title" value={title} onChange={e => onChange(e)} required />
        </div>
        <div className="form-group">
          <input type="text" placeholder="* Company" name="company" required value={company} onChange={e => onChange(e)} />
        </div>
        <div className="form-group">
          <input type="text" placeholder="Location" name="location" value={location} onChange={e => onChange(e)} />
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input type="date" name="from" value={from} onChange={e => onChange(e)} />
        </div>
        <div className="form-group">
          <p><input type="checkbox" name="current" value={current} onChange={e => {
            setCurrentJob(!currentJob);
            setFormData({ ...formData, current: !current });
          }} /> Current Job</p>
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input type="date" name="to" value={to} onChange={e => onChange(e)} disabled={currentJob ? 'disabled' : ''} />
        </div>
        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Job Description"
            value={description} onChange={e => onChange(e)}
          ></textarea>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
      </form>
    </Fragment>
  )
}

const mapStateToProps = state => ({
  profile: state.profile
})

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
}

export default connect(mapStateToProps, { addExperience })(AddExperience);