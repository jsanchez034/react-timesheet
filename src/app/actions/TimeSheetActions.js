import {TIMESHEET} from '../constants/TimeSheetConstants';
import TimeSheetAppDispatcher from '../dispatcher/TimeSheetAppDispatcher'

export default {

  /*
   * @method updateLine
   * @param {Object} line
   */
  updateLine (userId, id, data) {
    TimeSheetAppDispatcher.dispatch({
      actionType: TIMESHEET.LINE_CHANGED,
      userId: userId,
      id: id,
      data: data
    });
  },

  addLine (userId, data) {
    TimeSheetAppDispatcher.dispatch({
      actionType: TIMESHEET.LINE_ADDED,
      userId: userId,
      data: data
    });
  },

  removeLine (userId, lineId) {
    TimeSheetAppDispatcher.dispatch({
      actionType: TIMESHEET.LINE_REMOVED,
      userId: userId,
      lineId: lineId
    });
  }
}
