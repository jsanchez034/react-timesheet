import {Map} from 'immutable';
import React from 'react/addons';
import Component from './Component';
import TimeSheetActions from '../actions/TimeSheetActions';
import MaskedInput from 'react-maskedinput';

let isNaN = window.isNaN || Number.isNaN;

class TimeSheetRow extends Component {

  constructor() {
    super()
    this._handleChange = this._handleChange.bind(this);
  }

  render() {
    let timeSheetLine = this.props.timeSheetLine;

    return (
      <tr className="time-sheet-row">
        <td>
          <MaskedInput type="text" pattern="11/11/11" name="Date" size="8" placeholder="MM/DD/YY" defaultValue={timeSheetLine.get('Date')} onChange={this._handleChange} />
        </td>
        <td>
          <MaskedInput type="text" pattern="11:11 AA" name="StartTime" size="8" placeholder="HH:MM PM" defaultValue={timeSheetLine.get('StartTime')} onChange={this._handleChange} />
        </td>
        <td>
          <MaskedInput type="text" pattern="11:11 AA" name="EndTime" size="8" placeholder="HH:MM PM" defaultValue={timeSheetLine.get('EndTime')} onChange={this._handleChange} />
        </td>
        <td>
          <input type="text" name="Name" defaultValue={timeSheetLine.get('Name')} onChange={this._handleChange} />
        </td>
        <td>
          <input type="text" name="HourlyRate" defaultValue={timeSheetLine.get('HourlyRate')} onChange={this._handleChange} />
        </td>
        <td>{timeSheetLine.get('TotalHours')}</td>
        <td>{timeSheetLine.get('TotalOwed')}</td>
        <td className="edit-row">
          <span className="remove-row" onClick={this.props.onRemoveRow}>-</span>
          <span className="add-row" onClick={this.props.onAddRow}>+</span>
        </td>
      </tr>
    );
  }

  _handleChange(e) {
    var edit = {},
        elementType = e.target.type,
        targetName = e.target.name,
        targetValue = e.target.value;

    if (targetName === 'HourlyRate') {
      targetValue = parseFloat(targetValue);
    }

    if (elementType === 'text') {
      edit[targetName] = targetValue;
    }

    TimeSheetActions.updateLine(this.props.userId, this.props.timeSheetLine.get('id'), edit);
  }

}

TimeSheetRow.propTypes = {
  userId: React.PropTypes.string.isRequired,
  timeSheetLine: React.PropTypes.instanceOf(Map).isRequired
};

export default TimeSheetRow;
