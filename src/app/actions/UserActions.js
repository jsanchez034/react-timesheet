import {USER} from '../constants/TimeSheetConstants';
import TimeSheetAppDispatcher from '../dispatcher/TimeSheetAppDispatcher'

export default {

  /*
   * @method updateUser
   * @param {Object} user
   */
  updateUser (id, data) {
    TimeSheetAppDispatcher.dispatch({
      actionType: USER.CHANGE,
      id: id,
      data: data
    });
  }
}
