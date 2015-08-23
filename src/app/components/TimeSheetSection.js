import {Map} from 'immutable';
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
    let timeSheetLineItems = this.props.timeSheet.get('LineItems'),
        timeSheetRows = timeSheetLineItems.map((line) => {
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
        hourlyRateGroups = this.props.timeSheet.get('HourlyRateGroups'),
        rateGroupRows = null,
        totalOwed = this.props.timeSheet.get('GrandTotalOwed');

    if (hourlyRateGroups) {
      rateGroupRows = hourlyRateGroups.sortBy((rateTotal, rate) => rate)
                                      .map((rateTotal, rate) => {
                                        if (!rate) {
                                          return;
                                        }
                                        return (
                                          <HourlyRateGroup
                                            key={rate}
                                            hourlyRate={rate}
                                            hourlyRateTotalHours={rateTotal}
                                          />
                                        );
                                      });
    }

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
                {timeSheetRows}
                <tr>
                  <td colSpan="6" className="grand-total-label">
                    Monthly Totals
                  </td>
                  <td colSpan="2" className="grand-total">
                    $ {totalOwed}
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
                  {rateGroupRows}
                </tbody>
              </table>
            </div>
        </div>
      </div>
    );
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
  timeSheet: React.PropTypes.instanceOf(Map).isRequired
};

export default TimeSheetSection;
