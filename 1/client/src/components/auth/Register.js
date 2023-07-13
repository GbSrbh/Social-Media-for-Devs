import { Link } from "react-router-dom";
import { useState } from "react";
//For redux
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';

function Register(props) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: ""
  });
  const { name, email, password, password2 } = formData;//Fetch all these fileds from formData

  function formChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function formSubmit(e) {
    e.preventDefault();
    if (password !== password2) {
      console.log("Different Password");
      props.setAlert('Passwords do not match', 'danger');
    } else {
      props.register({name, email, password});
    }
  }

  return (
    <section >
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>

      <form className="form" onSubmit={formSubmit}>
        <div className="form-group">
          <input type="text" placeholder="Name" name="name" value={name} onChange={formChange} />
        </div>
        <div className="form-group">
          <input type="email" placeholder="Email Address" name="email" value={email} onChange={formChange} />
          <small className="form-text"
          >This site uses Gravatar so if you want a profile image, use a
            Gravatar email</small
          >
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={formChange}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={password2}
            onChange={formChange}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>

      <p className="my-1">
        Already have an account? <Link to={"/login"}>Sign In</Link>
      </p>
    </section>
  );
}

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired
}

export default connect(null, { setAlert, register })(Register);