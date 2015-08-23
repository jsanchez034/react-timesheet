import React from 'react/addons';
import Component from './Component';

class HourlyRateGroup extends Component {

  constructor() {
    super()
  }

  render() {
    let hourlyRateGroup = this.props.hourlyRateGroup;

    return (
      <tr className="hourly-rate-group-row">
        <td>
          {this.props.hourlyRate}
        </td>
        <td>
          {this.props.hourlyRateTotalHours}
        </td>
      </tr>
    );
  }

}

HourlyRateGroup.propTypes = {
  hourlyRate: React.PropTypes.number.isRequired,
  hourlyRateTotalHours: React.PropTypes.number.isRequired
};

export default HourlyRateGroup;
