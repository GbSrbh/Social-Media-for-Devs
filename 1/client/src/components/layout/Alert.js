import { connect } from 'react-redux';
import PorpTypes from 'prop-types';

const Alert = (props) => {
  if (props.alerts !== null && props.alerts.length > 0) {
    return (
      <div>
        {props.alerts.map((alert) => (
          <div key={alert.id} className={`alert alert-${alert.alertType}`}>
            {alert.msg}
          </div>
        ))}
      </div>
    )
  }
}

Alert.propTypes = {
  alerts: PorpTypes.array.isRequired
}

const mapStateToProp = state => ({
  alerts: state.alert
})

export default connect(mapStateToProp)(Alert);