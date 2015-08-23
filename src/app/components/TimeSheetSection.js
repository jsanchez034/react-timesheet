import {List} from 'immutable';
import React from 'react/addons';
import Component from './Component';
import TimeSheetRow from './TimeSheetRow';
import HourlyRateGroup from './HourlyRateGroup';
import TimeSheetActions from '../actions/TimeSheetActions';


class TimeSheetSection extends Component {

  constructor() {
    super()
    this.onAddRow = this.onAddRow.bind(this);
    this.onRemoveRow = this.onRemoveRow.bind(this);
  }

  render() {
    let timeSheet = this.props.timeSheet.map((line) => {
          let lineId = line.get('id');

          return (
            <TimeSheetRow
              key={lineId}
              userId={this.props.userId}
              timeSheetLine={line}
              onRemoveRow={this.onRemoveRow.bind(this, lineId)}
              onAddRow={this.onAddRow}
            />
          );
        }, this),
        hourlyRateGroups = this._hoursByHourlRate(this.props.timeSheet).map((rateTotal, rate) => {
          if (!rate) {
            return;
          }
          return <HourlyRateGroup
            key={rate}
            hourlyRate={rate}
            hourlyRateTotalHours={rateTotal}
          />
        }),
        totalOwed = this._totalOwed(this.props.timeSheet);

    return (
      <div className="row">
        <div className="row">
          <div className="twelve columns">
            <table>
              <colgroup>
                <col span="1" style={{width: '13%'}}/>
                <col span="1" style={{width: '13%'}}/>
                <col span="1" style={{width: '13%'}}/>
                <col span="1" style={{width: '37%'}}/>
                <col span="1" style={{width: '9%'}}/>
                <col span="1" style={{width: '5%'}}/>
                <col span="1" style={{width: '5%'}}/>
                <col span="1" style={{width: '5%'}}/>
              </colgroup>
              <thead>
                <tr>
                  <th>Date Of Tutoring</th>
                  <th>Start Time</th>
                  <th>End Time</th>
                  <th>First Initial And Last Name Only</th>
                  <th>Hourly Pay Rate</th>
                  <th>Total Hours</th>
                  <th>Total Amount Owed</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {timeSheet}
                <tr>
                  <td colSpan="6" className="grand-total-label">
                    Monthly Totals
                  </td>
                  <td colSpan="2" className="grand-total">
                    {totalOwed}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="row">
          <div className="four columns">
              <table>
                <colgroup>
                  <col span="1" style={{width: '50%'}}/>
                  <col span="1" style={{width: '50%'}}/>
                </colgroup>
                <thead>
                  <tr>
                    <th>Hourly Rate Groups</th>
                    <th>Total Hours</th>
                  </tr>
                </thead>
                <tbody>
                  {hourlyRateGroups}
                </tbody>
              </table>
            </div>
        </div>
      </div>
    );
  }

  _totalOwed(timeSheet) {
    let total = timeSheet.reduce((reduction, timeSheetLine) => {
          return reduction += (timeSheetLine.get('TotalOwed') || 0);
        }, 0);

    return "$" + Math.round(total * 100) / 100;
  }

  _hoursByHourlRate(timeSheet) {
    return timeSheet.groupBy((timeSheetLine) => timeSheetLine.get('HourlyRate'), this)
                    .map((timeSheetLine, hourlyRate, iterable) => {
                      return timeSheetLine.reduce((reduction, line) => {
                        return Math.round((reduction + (line.get('TotalHours') || 0)) * 100) / 100;
                      }, 0);
                    });
  }

  onRemoveRow(rowId) {
    TimeSheetActions.removeLine(this.props.userId, rowId);
  }

  onAddRow() {
    TimeSheetActions.addLine(this.props.userId, {
      'Date': null,
      'StartTime': null,
      'EndTime': null,
      'Name': null,
      'HourlyRate': null,
      'TotalHours': 0,
      'TotalOwed': 0
    });
  }

}

TimeSheetSection.propTypes = {
  userId: React.PropTypes.string.isRequired,
  timeSheet: React.PropTypes.instanceOf(List).isRequired
};

export default TimeSheetSection;
