(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'babel-runtime/helpers/toConsumableArray', 'babel-runtime/core-js/object/create', 'babel-runtime/core-js/object/assign', 'babel-runtime/core-js/object/get-prototype-of', 'babel-runtime/helpers/classCallCheck', 'babel-runtime/helpers/createClass', 'babel-runtime/helpers/possibleConstructorReturn', 'babel-runtime/helpers/inherits', '../polyfills/event-matches', '../misc/on'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('babel-runtime/helpers/toConsumableArray'), require('babel-runtime/core-js/object/create'), require('babel-runtime/core-js/object/assign'), require('babel-runtime/core-js/object/get-prototype-of'), require('babel-runtime/helpers/classCallCheck'), require('babel-runtime/helpers/createClass'), require('babel-runtime/helpers/possibleConstructorReturn'), require('babel-runtime/helpers/inherits'), require('../polyfills/event-matches'), require('../misc/on'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.toConsumableArray, global.create, global.assign, global.getPrototypeOf, global.classCallCheck, global.createClass, global.possibleConstructorReturn, global.inherits, global.eventMatches, global.on);
    global.initComponentByLauncher = mod.exports;
  }
})(this, function (exports, _toConsumableArray2, _create, _assign, _getPrototypeOf, _classCallCheck2, _createClass2, _possibleConstructorReturn2, _inherits2, _eventMatches, _on) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function (ToMix) {
    /**
     * Mix-in class to instantiate components events on launcher button.
     * @class InitComponentByLauncher
     */
    var InitComponentByLauncher = function (_ToMix) {
      (0, _inherits3.default)(InitComponentByLauncher, _ToMix);

      function InitComponentByLauncher() {
        (0, _classCallCheck3.default)(this, InitComponentByLauncher);
        return (0, _possibleConstructorReturn3.default)(this, (InitComponentByLauncher.__proto__ || (0, _getPrototypeOf2.default)(InitComponentByLauncher)).apply(this, arguments));
      }

      (0, _createClass3.default)(InitComponentByLauncher, null, [{
        key: 'init',

        /**
         * Instantiates this component in the given element.
         * If the given element indicates that it's an component of this class, instantiates it.
         * Otherwise, instantiates this component by clicking on launcher buttons
         * (buttons with attribute that `options.attribInitTarget` points to) of this component in the given node.
         * @param {Node} target The DOM node to instantiate this component in. Should be a document or an element.
         * @param {Object} [options] The component options.
         * @param {string} [options.selectorInit] The CSS selector to find this component.
         * @param {string} [options.attribInitTarget] The attribute name in the launcher buttons to find target component.
         * @returns {Handle} The handle to remove the event listener to handle clicking.
         */
        value: function init() {
          var _this2 = this;

          var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
          var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

          var effectiveOptions = (0, _assign2.default)((0, _create2.default)(this.options), options);
          if (target.nodeType !== Node.ELEMENT_NODE && target.nodeType !== Node.DOCUMENT_NODE) {
            throw new Error('DOM document or DOM element should be given to search for and initialize this widget.');
          }
          if (target.nodeType === Node.ELEMENT_NODE && target.matches(effectiveOptions.selectorInit)) {
            this.create(target, options);
          } else {
            var handles = effectiveOptions.initEventNames.map(function (name) {
              return (0, _on2.default)(target, name, function (event) {
                var launcher = (0, _eventMatches2.default)(event, '[' + effectiveOptions.attribInitTarget + ']');

                if (launcher) {
                  event.delegateTarget = launcher; // eslint-disable-line

                  var elements = [].concat((0, _toConsumableArray3.default)(launcher.ownerDocument.querySelectorAll(launcher.getAttribute(effectiveOptions.attribInitTarget))));
                  if (elements.length > 1) {
                    throw new Error('Target widget must be unique.');
                  }

                  if (elements.length === 1) {
                    if (launcher.tagName === 'A') {
                      event.preventDefault();
                    }

                    var component = _this2.create(elements[0], options);
                    if (typeof component.createdByLauncher === 'function') {
                      component.createdByLauncher(event);
                    }
                  }
                }
              });
            });
            return {
              release: function release() {
                for (var handle = handles.pop(); handle; handle = handles.pop()) {
                  handle.release();
                }
              }
            };
          }
        }
      }]);
      return InitComponentByLauncher;
    }(ToMix);

    return InitComponentByLauncher;
  };

  var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

  var _create2 = _interopRequireDefault(_create);

  var _assign2 = _interopRequireDefault(_assign);

  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

  var _createClass3 = _interopRequireDefault(_createClass2);

  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

  var _inherits3 = _interopRequireDefault(_inherits2);

  var _eventMatches2 = _interopRequireDefault(_eventMatches);

  var _on2 = _interopRequireDefault(_on);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
});