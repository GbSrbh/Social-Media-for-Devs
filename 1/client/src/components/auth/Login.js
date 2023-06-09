import { Link } from "react-router-dom";
import { useState } from "react";
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const { email, password } = formData;

  function formChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  function formSubmit(e) {
    e.preventDefault();
    console.log(formData);
  }
  return (
    <section >
      <div className="alert alert-danger">
        Invalid credentials
      </div>
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead"><i className="fas fa-user"></i> Sign into Your Account</p>
      <form className="form" onSubmit={formSubmit}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={formChange}
            required
          />
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
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to={"/register"}>Sign Up</Link>
      </p>
    </section>
  )
}

export default Login;