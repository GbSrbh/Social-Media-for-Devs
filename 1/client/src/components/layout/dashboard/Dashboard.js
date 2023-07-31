import {useEffect} from'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getProfile} from '../../../actions/profile';

const Dashboard = ({getProfile, profile}) => {
  useEffect(() => {
    getProfile();
  }, [])  
  return (
    <div>DashBoard </div>
  )
}
const mapStateToProps = state => ({
  profile: state.profile
})
Dashboard.porpTypes = {
  getProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
}
export default connect(mapStateToProps, {getProfile})(Dashboard);