import {EventEmitter} from 'events';
import Immutable from 'immutable';
import _ from 'lodash';

import TimeSheetAppDispatcher from '../dispatcher/TimeSheetAppDispatcher';
import {CHANGE, TIMESHEET} from '../constants/TimeSheetConstants';

var _timeSheet = Immutable.fromJS({
  0: [{
    'id': _.uniqueId(),
    'Date': null,
    'StartTime': null,
    'EndTime': null,
    'Name': null,
    'HourlyRate': null,
    'TotalHours': 0,
    'TotalOwed': 0
  }]
});

var TimeSheetStore = _.extend({}, EventEmitter.prototype, {

  /*
   * @method getTimeSheetByUser
   * @param {Number} id
   * @returns {Immutable.Map} - state
   */
  getTimeSheetByUser (userId) {
    return _timeSheet.get(userId, null);
  },

  addChangeListener(callback) {
    this.on(CHANGE, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(CHANGE, callback);
  },

  onUpdateLine (userId, lineId, line) {
    var immutableLine = Immutable.fromJS(line);

    _timeSheet = _timeSheet.updateIn([userId], (value) => {
      return value.update(value.findIndex((val) => val.get('id') === lineId ), line => {
        return line.merge(immutableLine);
      });
    });
  },

  onLineAdd (userId, line) {
    var immutableLine = Immutable.fromJS(line);
    immutableLine = immutableLine.set('id', _.uniqueId());

    _timeSheet = _timeSheet.updateIn([userId], Immutable.List(), lines => lines.push(immutableLine));
  },

  onLineRemove (userId, lineId) {
    var userTimeSheetLength = _timeSheet.get(userId).size;

    if (userTimeSheetLength === 1) {
      return;
    }

    _timeSheet = _timeSheet.updateIn([userId], (value) => {
      return value.delete(value.findIndex((val) => val.get('id') === lineId ));
    });
  }
});

TimeSheetAppDispatcher.register(function (action) {
  if (action.actionType === TIMESHEET.LINE_CHANGED) {
    TimeSheetStore.onUpdateLine(action.userId, action.id, action.data);
    TimeSheetStore.emit(CHANGE);
  }
  if (action.actionType === TIMESHEET.LINE_ADDED) {
    TimeSheetStore.onLineAdd(action.userId, action.data);
    TimeSheetStore.emit(CHANGE);
  }
  if (action.actionType === TIMESHEET.LINE_REMOVED) {
    TimeSheetStore.onLineRemove(action.userId, action.lineId);
    TimeSheetStore.emit(CHANGE);
  }
});

export default TimeSheetStore;
