import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { PropTypes } from 'prop-types';

const PrivateRoute = ({ auth, children }) => {
  if (!auth.isAuthenticated && !auth.loading) {
    return <Navigate to="/login" />
  }
  return children;
}

const mapStateToProps = state => ({
  auth: state.auth
})

PrivateRoute.porpTypes = {
  auth: PropTypes.object.isRequired,
}

export default connect(mapStateToProps)(PrivateRoute);