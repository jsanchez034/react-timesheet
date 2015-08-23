import React from 'react/addons';
import TimeSheetApp from './components/TimeSheetApp';

//TODO: make this intial very simple like
// https://github.com/facebook/flux/blob/ac1e4970c2a85d5030b65696461c271ba981a2a6/examples/flux-chat/js/app.js
// UserEditComponent will be controller view for UserStore
// TimeSheetComponent will be controller view for TimeSheetStore

/*
 * @class App
 */
class App {

  /*
   * @constructs App
   * @param {Object} options
   */
  constructor(options) {
    //this.userTimeSheetStore = new TimeSheetStore(dispatcher, options.state);
    this.element = null;

  }

  /*
   * @method render
   * @param {DOM} [element]
   * @returns {String|undefined}
   */
   render (element) {
    this.element = element || this.element;

    var appRootElement = React.createElement(TimeSheetApp);

    // render to DOM
    if (this.element) {
      React.render(appRootElement, this.element);
      return;
    }
  }

  /*
   * @method render
   * @param {DOM} element
   */
   renderToDOM (element) {
    this.render(element);
   }

  /*
   * @method renderToString
   * @returns {String}
   */
   renderToString () {
    return this.render();
  }
}

export default App;
