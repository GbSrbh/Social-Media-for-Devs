import { Link } from "react-router-dom";

import { logout } from '../../actions/auth';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Navbar = (props) => {//props: logout function and auth state

  const guestLinks = (
    <ul>
      <li><a href="#!">Developers</a></li>
      <li><Link to={"/register"}>Register</Link></li>
      <li><Link to={"/login"}>Login</Link></li>
    </ul>
  );

  const authLinks = (
    <ul>
      <li>
        <a onClick={props.logout} href={"#!"}>
          Logout
        </a>
      </li>
    </ul>
  );

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to={"/"}> <i className="fas fa-code" /> DevConnector </Link>
      </h1>

      {(!props.auth.loading) && (props.auth.isAuthenticated ? authLinks : guestLinks)}

    </nav>
  )
}

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { logout })(Navbar);