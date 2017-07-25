'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _lodash = require('lodash.debounce');

var _lodash2 = _interopRequireDefault(_lodash);

var _styled = require('./styled');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HorizontalCarousel = function (_React$Component) {
  _inherits(HorizontalCarousel, _React$Component);

  function HorizontalCarousel(props) {
    _classCallCheck(this, HorizontalCarousel);

    var _this = _possibleConstructorReturn(this, (HorizontalCarousel.__proto__ || Object.getPrototypeOf(HorizontalCarousel)).call(this, props));

    _this.renderSlideCanvas = function () {
      var contents = _this.props.contents;

      var liContents = contents.map(function (url, index) {
        return _react2.default.createElement(
          'li',
          { key: 'hc-li-contents-' + url },
          _react2.default.createElement('img', { src: url })
        );
      });

      return _react2.default.createElement(
        'ol',
        null,
        liContents
      );
    };

    _this.animateScrollLeft = function (el, leftCount) {
      var acc = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;

      var time = _this.state.leftActiveCanvas;
      var interval = window.setInterval(function () {
        time += acc;

        el.scrollLeft = time;
        // ============================
        // time <= leftCount && acc < 0
        // Means it's animating scroll right
        // ============================
        // time >= leftCount && acc > 0
        // Means it's animating scroll left
        if (time >= leftCount && acc > 0 || time <= leftCount && acc < 0) {
          el.scrollLeft = leftCount;
          // Reset scroll source onClick
          _this.setState({ scrollOnClick: false });
          return window.clearInterval(interval);
        }
      }, 1);
    };

    _this.handleThumbnailClick = function (event, index) {
      var canvas = document.querySelectorAll('.hc-canvas li')[index];
      _this.setState({ scrollOnClick: true });
      var canvasLeft = canvas.offsetLeft;
      // This is checking whether user want to use animation
      if (_this.props.animation) {
        _this.setState({ leftActiveCanvas: canvasLeft });
      } else {
        var group = document.querySelector('.hc-canvas');
        group.scrollLeft = canvasLeft;
        // Always reset scroll onClick source
        _this.setState({ scrollOnClick: false });
      }
    };

    _this.renderSlideThumbnails = function () {
      var contents = _this.props.contents;

      var divContents = contents.map(function (url, index) {
        return _react2.default.createElement(
          'div',
          {
            onClick: function onClick(e) {
              return _this.handleThumbnailClick(e, index);
            },
            className: 'list',
            key: 'hc-thumbnails-contents-' + url
          },
          _react2.default.createElement('img', { src: url })
        );
      });

      return _react2.default.createElement(
        'div',
        { className: 'hc-wrapper' },
        divContents
      );
    };

    _this.debouncedCanvasScroll = function (event) {
      var canvasLeft = document.querySelector('.hc-canvas').scrollLeft;
      _this.setState({
        leftActiveCanvas: canvasLeft
      });
    };

    _this.handleCanvasScroll = function (event) {
      event.persist();
      _this.debouncedCanvasScroll(event);
    };

    _this.state = {
      // Save current position canvas scroll
      leftActiveCanvas: 0,
      // Detect scroll source from event onClick at Thumbnail lists
      scrollOnClick: false

      // Debounce canvas scroll for performance costs
    };_this.debouncedCanvasScroll = (0, _lodash2.default)(_this.debouncedCanvasScroll.bind(_this), 100);
    return _this;
  }

  _createClass(HorizontalCarousel, [{
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps, nextState) {
      // Just animating scroll if event
      // scroll source from canvas thumbnail onClick
      if (nextState.scrollOnClick) {
        var group = document.querySelector('.hc-canvas');
        if (this.state.leftActiveCanvas > nextState.leftActiveCanvas) {
          this.animateScrollLeft(group, nextState.leftActiveCanvas, -10);
        } else {
          this.animateScrollLeft(group, nextState.leftActiveCanvas);
        }
      }
    }

    /**
     * Render slide preview to Canvas
     * from contents props
     * 
     */


    /**
     * Animating canvas scroll
     * if animate props is true
     * 
     */


    /**
     * Handle something when thumbnail list is clicked
     * From now, it just do scrollLeft
     * 
     */


    /**
     * Render thumbnails lists
     * from contents props
     * 
     */


    /**
     * Debouncing canvas leftActiveCanvas position
     * Performance costs
     * 
     */


    /**
     * Event pooling Performance reason
     * to debouncedCanvasScroll
     * 
     */

  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          contents = _props.contents,
          restProps = _objectWithoutProperties(_props, ['contents']);

      return _react2.default.createElement(
        'div',
        { className: 'hc-container' },
        _react2.default.createElement(
          _styled.HCCanvas,
          _extends({
            className: 'hc-canvas'
          }, restProps, {
            onScroll: this.handleCanvasScroll
          }),
          this.renderSlideCanvas()
        ),
        _react2.default.createElement(
          _styled.HCThumbnails,
          { className: 'hc-thumbnails' },
          this.renderSlideThumbnails()
        )
      );
    }
  }]);

  return HorizontalCarousel;
}(_react2.default.Component);

HorizontalCarousel.propTypes = {
  // List of array images
  // example: ['abc.com/img1.jpg', 'abc.com/img2.jpg']
  contents: _propTypes2.default.array.isRequired,
  width: _propTypes2.default.number,
  height: _propTypes2.default.number,
  gutter: _propTypes2.default.number,
  animation: _propTypes2.default.bool
};
exports.default = HorizontalCarousel;