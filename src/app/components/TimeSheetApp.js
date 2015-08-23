import React from 'react/addons';
import Component from './Component';
import UserStore from '../stores/UserStore';
import TimeSheetStore from '../stores/TimeSheetStore';
import UserInfoSection from './UserInfoSection';
import TimeSheetSection from './TimeSheetSection';
import request from 'superagent';

function getStateFromStores() {
  return {
    user: UserStore.getUser("0"),
    timeSheet: TimeSheetStore.getTimeSheetByUser("0")
  };
}

class TimeSheetApp extends Component {
  constructor() {
    super()
    this.state = getStateFromStores();
    this._onChange = this._onChange.bind(this);
    this._sendForm = this._sendForm.bind(this);
  }

  componentDidMount() {
    UserStore.addChangeListener(this._onChange);
    TimeSheetStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    UserStore.removeChangeListener(this._onChange);
    TimeSheetStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    this.setState(getStateFromStores());
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <h2>Time Sheet</h2>
        </div>
        <div className="row">
          <div className="twelve column">
            <form onSubmit={this._sendForm}>
              <label htmlFor="emailTo">Coordinator</label>
              <select ref="emailTo" name="emailTo" className="email-to" defaultValue="">
                <option disabled hidden value=""></option>
                <option value="Test@test.com">Arau</option>
                <option value="Test2@test.com">Rmatos</option>
              </select>
              <UserInfoSection userId="0" user={this.state.user}/>
              <TimeSheetSection userId="0" timeSheet={this.state.timeSheet}/>
              <input type="submit" ref="formSubmit" className="button-primary submit-timesheet" defaultValue="Submit"/>
            </form>
          </div>
        </div>
      </div>

    );
  }

  _sendForm(e) {
    e.stopPropagation();
    e.preventDefault();

    let emailTo = this.refs.emailTo.getDOMNode().value;

    if (!emailTo) {
      return;
    }

    // Submit the form DOM through ajax to php backend
    let submitButton = this.refs.formSubmit.getDOMNode();
    submitButton.disabled = true;
    submitButton.value = 'Sending...';

    request
      .post('/php/emailTimeSheet.php')
      .send({
        data: {
          user: this.state.user.toJSON(),
          timesheet: this.state.timeSheet.toJSON()
        },
        to: emailTo
      })
      .end(function(err, res){
        submitButton.value = 'Sent';
        setTimeout(() =>{
          submitButton.disabled = false;
          submitButton.value = 'Submit';
        }, 1500);
      });
  }

}

export default TimeSheetApp;
