(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'babel-runtime/core-js/weak-map', 'babel-runtime/helpers/typeof', 'babel-runtime/core-js/object/assign', 'babel-runtime/helpers/classCallCheck', 'babel-runtime/helpers/createClass', 'babel-runtime/helpers/toConsumableArray', '../polyfills/event-matches', '../polyfills/toggle-class', '../polyfills/array-from', '../polyfills/object-assign', '../polyfills/custom-event'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('babel-runtime/core-js/weak-map'), require('babel-runtime/helpers/typeof'), require('babel-runtime/core-js/object/assign'), require('babel-runtime/helpers/classCallCheck'), require('babel-runtime/helpers/createClass'), require('babel-runtime/helpers/toConsumableArray'), require('../polyfills/event-matches'), require('../polyfills/toggle-class'), require('../polyfills/array-from'), require('../polyfills/object-assign'), require('../polyfills/custom-event'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.weakMap, global._typeof, global.assign, global.classCallCheck, global.createClass, global.toConsumableArray, global.eventMatches, global.toggleClass, global.arrayFrom, global.objectAssign, global.customEvent);
    global.modals = mod.exports;
  }
})(this, function (exports, _weakMap, _typeof2, _assign, _classCallCheck2, _createClass2, _toConsumableArray2, _eventMatches, _toggleClass) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _weakMap2 = _interopRequireDefault(_weakMap);

  var _typeof3 = _interopRequireDefault(_typeof2);

  var _assign2 = _interopRequireDefault(_assign);

  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

  var _createClass3 = _interopRequireDefault(_createClass2);

  var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

  var _eventMatches2 = _interopRequireDefault(_eventMatches);

  var _toggleClass2 = _interopRequireDefault(_toggleClass);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * @param {Element} element The element to obtain transition duration from.
   * @returns {number} The transition duration of the given property set in the given element.
   */
  function getTransitionDuration(element) {
    var computedStyle = element.ownerDocument.defaultView.getComputedStyle(element);
    var durations = computedStyle.transitionDuration.split(/,\s*/).map(function (transitionDuration) {
      return parseFloat(transitionDuration);
    }).filter(function (duration) {
      return !isNaN(duration);
    });
    return durations.length > 0 ? Math.max.apply(Math, (0, _toConsumableArray3.default)(durations)) : 0;
  }

  var Modal = function () {
    /**
     * Modal dialog.
     * @implements Component
     * @param {HTMLElement} element The element working as a modal dialog.
     * @param {Object} [options] The component options.
     * @param {string} [options.classVisible] The CSS class for the visible state.
     * @param {string} [options.classNoScroll] The CSS class for hiding scroll bar in body element while modal is shown.
     * @param {string} [options.eventBeforeShown]
     *   The name of the custom event fired before this modal is shown.
     *   Cancellation of this event stops showing the modal.
     * @param {string} [options.eventAfterShown] The name of the custom event fired after this modal is shown.
     * @param {string} [options.eventBeforeHidden]
     *   The name of the custom event fired before this modal is hidden.
     *   Cancellation of this event stops hiding the modal.
     * @param {string} [options.eventAfterHidden] The name of the custom event fired after this modal is hidden.
     */

    function Modal(element) {
      var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
      (0, _classCallCheck3.default)(this, Modal);

      if (!element || element.nodeType !== Node.ELEMENT_NODE) {
        throw new TypeError('DOM element should be given to initialize this widget.');
      }

      this.element = element;

      this.options = (0, _assign2.default)({
        classVisible: 'is-visible',
        classNoScroll: 'bx--noscroll',
        eventBeforeShown: 'modal-beingshown',
        eventAfterShown: 'modal-shown',
        eventBeforeHidden: 'modal-beinghidden',
        eventAfterHidden: 'modal-hidden'
      }, options);

      this.constructor.components.set(this.element, this);

      this.hookCloseActions();
    }

    /**
     * Instantiates modal dialog of the given element.
     * @param {HTMLElement} element The element working as a modal dialog.
     * @param {Object} [options] The component options.
     * @param {string} [options.classVisible] The CSS class for the visible state.
     * @param {string} [options.classNoScroll] The CSS class for hiding scroll bar in body element while modal is shown.
     * @param {string} [options.eventBeforeShown]
     *   The name of the custom event fired before this modal is shown.
     *   Cancellation of this event stops showing the modal.
     * @param {string} [options.eventAfterShown] The name of the custom event fired after this modal is shown.
     * @param {string} [options.eventBeforeHidden]
     *   The name of the custom event fired before this modal is hidden.
     *   Cancellation of this event stops hiding the modal.
     * @param {string} [options.eventAfterHidden] The name of the custom event fired after this modal is hidden.
     */


    (0, _createClass3.default)(Modal, [{
      key: 'hookCloseActions',
      value: function hookCloseActions() {
        var _this = this;

        this.element.addEventListener('click', function (event) {
          if (event.currentTarget === event.target) _this.hide();
        });

        if (this.keydownHandler) {
          this.element.ownerDocument.body.removeEventListener('keydown', this.keydownHandler);
          this.keydownHandler = null;
        }

        this.keydownHandler = function (event) {
          if (event.which === 27) {
            _this.hide();
          }
        };

        this.element.ownerDocument.body.addEventListener('keydown', this.keydownHandler);

        [].concat((0, _toConsumableArray3.default)(this.element.querySelectorAll('[data-modal-close]'))).forEach(function (element) {
          element.addEventListener('click', function () {
            _this.hide();
          });
        });
      }
    }, {
      key: '_changeState',
      value: function _changeState(visible, callback) {
        var _this2 = this;

        var finished = void 0;
        var finishedTransition = function finishedTransition() {
          if (!finished) {
            finished = true;
            _this2.element.removeEventListener('transitionend', finishedTransition);
            callback();
          }
        };

        this.element.addEventListener('transitionend', finishedTransition);
        var transitionDuration = getTransitionDuration(this.element);
        (0, _toggleClass2.default)(this.element, this.options.classVisible, visible);
        (0, _toggleClass2.default)(this.element.ownerDocument.body, this.options.classNoScroll, visible);
        if (transitionDuration === 0) {
          finishedTransition();
        }
      }
    }, {
      key: 'show',
      value: function show(launchingElement, callback) {
        var _this3 = this;

        if (typeof launchingElement === 'function') {
          callback = launchingElement; // eslint-disable-line no-param-reassign
          launchingElement = null; // eslint-disable-line no-param-reassign
        }

        if (launchingElement && !launchingElement.nodeType) {
          throw new TypeError('DOM Node should be given for launchingElement.');
        }

        if (this.element.classList.contains(this.options.classVisible)) {
          if (callback) {
            callback(null, true);
          }
          return;
        }

        var eventStart = new CustomEvent(this.options.eventBeforeShown, {
          bubbles: true,
          cancelable: true,
          detail: { launchingElement: launchingElement }
        });

        // https://connect.microsoft.com/IE/feedback/details/790389/event-defaultprevented-returns-false-after-preventdefault-was-called
        if (this.element.dispatchEvent(eventStart)) {
          this._changeState(true, function () {
            _this3.element.dispatchEvent(new CustomEvent(_this3.options.eventAfterShown, {
              bubbles: true,
              cancelable: true,
              detail: { launchingElement: launchingElement }
            }));
            if (callback) {
              callback();
            }
          });
        } else {
          var error = new Error('Showing dialog has been canceled.');
          error.canceled = true;
          if (callback) {
            callback(error);
          }
        }
      }
    }, {
      key: 'hide',
      value: function hide(callback) {
        var _this4 = this;

        if (!this.element.classList.contains(this.options.classVisible)) {
          if (callback) {
            callback(null, true);
          }
          return;
        }

        var eventStart = new CustomEvent(this.options.eventBeforeHidden, {
          bubbles: true,
          cancelable: true
        });

        // https://connect.microsoft.com/IE/feedback/details/790389/event-defaultprevented-returns-false-after-preventdefault-was-called
        if (this.element.dispatchEvent(eventStart)) {
          this._changeState(false, function () {
            _this4.element.dispatchEvent(new CustomEvent(_this4.options.eventAfterHidden), {
              bubbles: true,
              cancelable: true
            });
            if (callback) {
              callback();
            }
          });
        } else {
          var error = new Error('Hiding dialog has been canceled.');
          error.canceled = true;
          if (callback) {
            callback(error);
          }
        }
      }
    }, {
      key: 'release',
      value: function release() {
        if (this.keydownHandler) {
          this.element.ownerDocument.body.removeEventListener('keydown', this.keydownHandler);
          this.keydownHandler = null;
        }
        this.constructor.components.delete(this.element);
      }
    }], [{
      key: 'create',
      value: function create(element, options) {
        return this.components.get(element) || new this(element, options);
      }
    }, {
      key: 'init',
      value: function init() {
        var _this5 = this;

        var target = arguments.length <= 0 || arguments[0] === undefined ? document : arguments[0];
        var options = arguments[1];

        if (target.nodeType !== Node.ELEMENT_NODE && target.nodeType !== Node.DOCUMENT_NODE) {
          throw new Error('DOM document or DOM element should be given to search for and initialize this widget.');
        }
        if (target.nodeType === Node.ELEMENT_NODE && target.dataset.modal !== undefined) {
          this.create(target, options);
        } else {
          var _ret = function () {
            var handler = function handler(event) {
              var element = (0, _eventMatches2.default)(event, '[data-modal-target]');

              if (element) {
                var modalElements = [].concat((0, _toConsumableArray3.default)(element.ownerDocument.querySelectorAll(element.dataset.modalTarget)));
                if (modalElements.length > 1) {
                  throw new Error('Target modal must be unique.');
                }

                if (modalElements.length === 1) {
                  (function () {
                    if (element.tagName === 'A') {
                      event.preventDefault();
                    }

                    var modal = _this5.create(modalElements[0], options);
                    modal.show(element, function (error, shownAlready) {
                      if (!error && !shownAlready && modal.element.offsetWidth > 0 && modal.element.offsetHeight > 0) {
                        modal.element.focus();
                      }
                    });
                  })();
                }
              }
            };
            target.addEventListener('click', handler);
            return {
              v: {
                release: function release() {
                  return target.removeEventListener('click', handler);
                }
              }
            };
          }();

          if ((typeof _ret === 'undefined' ? 'undefined' : (0, _typeof3.default)(_ret)) === "object") return _ret.v;
        }
      }
    }, {
      key: 'hook',
      value: function hook() {
        console.warn('Modals.hook() is deprecated. Use Modals.init() instead.'); // eslint-disable-line no-console
      }
    }]);
    return Modal;
  }();

  exports.default = Modal;


  /**
   * The component options.
   * @member {Object} Modal#options
   * @property {string} [classVisible] The CSS class for the visible state.
   * @property {string} [classNoScroll] The CSS class for hiding scroll bar in body element while modal is shown.
   * @property {string} [eventBeforeShown]
   *   The name of the custom event fired before this modal is shown.
   *   Cancellation of this event stops showing the modal.
   * @property {string} [eventAfterShown] The name of the custom event fired after this modal is shown.
   * @property {string} [eventBeforeHidden]
   *   The name of the custom event fired before this modal is hidden.
   *   Cancellation of this event stops hiding the modal.
   * @property {string} [eventAfterHidden] The name of the custom event fired after this modal is hidden.
   */

  /**
   * The map associating DOM element and modal instance.
   * @type {WeakMap}
   */
  Modal.components = new _weakMap2.default();
});