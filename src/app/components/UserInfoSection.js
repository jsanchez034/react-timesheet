import {Map} from 'immutable';
import React from 'react/addons';
import Component from './Component';
import UserActions from '../actions/UserActions';


class UserInfoSection extends Component {

  constructor() {
    super()
    this._handleChange = this._handleChange.bind(this);
  }

  render() {
    let user = this.props.user;

    return (
      <div className="row">
        <div className="row">
          <div className="four columns">
            <label htmlFor="LastName">Tutor&#39;s Last Name</label>
            <input type="text" className="u-full-width" name= "LastName" value={user.get('LastName')} onChange={this._handleChange} />
          </div>
          <div className="four columns">
            <label htmlFor="FirstName">Tutor&#39;s First Name</label>
            <input type="text" className="u-full-width" name="FirstName" value={user.get('FirstName')} onChange={this._handleChange} />
          </div>
          <div className="four columns">
            <label htmlFor="MiddleInitial">M.I.</label>
            <input type="text" className="u-full-width" name="MiddleInitial" value={user.get('MiddleInitial')} onChange={this._handleChange} />
          </div>
        </div>
        <div className="row">
          <div className="six columns">
            <label htmlFor="Address">Tutor&#39;s Address (including city, state and zip code)</label>
            <input type="text" className="u-full-width" name="Address" value={user.get('Address')} onChange={this._handleChange} />
          </div>
          <div className="three columns">
            <label htmlFor="District">District/County</label>
            <input type="text" className="u-full-width" name="District" value={user.get('District')} onChange={this._handleChange} />
          </div>
          <div className="three columns">
            <label htmlFor="State">State</label>
            <input type="text" className="u-full-width" name="State" value={user.get('State')} onChange={this._handleChange} />
          </div>
        </div>
        <div className="row">
          <div className="four columns">
            <label htmlFor="PhoneNumber">Phone Number</label>
            <input type="text" className="u-full-width" name="PhoneNumber" value={user.get('PhoneNumber')} onChange={this._handleChange} />
          </div>
          <div className="two offset-by-two columns">
            <label htmlFor="hasDirectDeposit" className="direct-deposit">
              <input type="checkbox" name="hasDirectDeposit" defaultChecked={user.get('hasDirectDeposit')} onChange={this._handleChange} />
              <span className="label-body">Direct Deposit?</span>
            </label>
          </div>
        </div>
        <div className="twelve columns">
          <label htmlFor="hasDirectDeposit" className="tutor-disclaimer">
            <input type="checkbox" name="hasAgreedDisclaimer" defaultChecked={user.get('hasAgreedDisclaimer')} onChange={this._handleChange} />
            <span className="label-body"> By checking this box, I, the tutor, agree that all given information such as tutoring date, start time, end time, student name, hourly pay
              rate, total hours and total amount owed are true and correct. Any faulty, misleading information or errors will result in my payment for the
              month be withheld until accurate and corrected paperwork is resubmitted and checked for coordinator approval.
            </span>
          </label>
        </div>
      </div>
    );
  }

  _handleChange(e) {
    var edit = {},
        elementType = e.target.type;

    if (elementType === 'text') {
      edit[e.target.name] = e.target.value;
    } else if (elementType === 'checkbox') {
      edit[e.target.name] = e.target.checked;
    }

    UserActions.updateUser(this.props.userId, edit);
  }

}

UserInfoSection.propTypes = {
  userId: React.PropTypes.string.isRequired,
  user: React.PropTypes.instanceOf(Map).isRequired
};

export default UserInfoSection;
