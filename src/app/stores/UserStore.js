import {EventEmitter} from 'events';
import Immutable from 'immutable';
import _ from 'lodash';

import TimeSheetAppDispatcher from '../dispatcher/TimeSheetAppDispatcher'
import {USER, CHANGE} from '../constants/TimeSheetConstants';


var _users = Immutable.fromJS({
  0: {
    LastName: null,
    FirstName: null,
    MiddleInitial: null,
    Address: null,
    hasDirectDeposit: null,
    hasAgreedDisclaimer: null,
    District: null,
    State: null,
    PhoneNumber: null
  }
});

var UserStore = _.extend({}, EventEmitter.prototype, {
  /*
   * @method getState
   * @param {Number} id
   * @returns {Immutable.Map} - state
   */
  getUser (id) {
    return _users.get(id, null);
  },

  onUserChange(id, data) {
    var immutableUserData = Immutable.fromJS(data);

    _users = _users.mergeDeepIn([id], immutableUserData);
  },

  addChangeListener(callback) {
    this.on(CHANGE, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(CHANGE, callback);
  }
});

TimeSheetAppDispatcher.register(function (action) {
  if (action.actionType === USER.CHANGE) {
    UserStore.onUserChange(action.id, action.data);
    UserStore.emit(CHANGE);
  }
});

export default UserStore;
