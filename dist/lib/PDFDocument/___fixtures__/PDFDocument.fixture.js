var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import PDFDocument from '../index';
import PdfSample from '../../../pdf-documents/pdf_sample.pdf';
import './styles.css';

var ZoomWrapper = function (_React$Component) {
  _inherits(ZoomWrapper, _React$Component);

  function ZoomWrapper() {
    _classCallCheck(this, ZoomWrapper);

    return _possibleConstructorReturn(this, (ZoomWrapper.__proto__ || Object.getPrototypeOf(ZoomWrapper)).apply(this, arguments));
  }

  _createClass(ZoomWrapper, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      return React.createElement(
        'div',
        null,
        React.createElement(
          'div',
          null,
          React.createElement(
            'button',
            { onClick: function onClick() {
                return _this2.viewer.zoomIn();
              } },
            'Zoom In'
          ),
          React.createElement(
            'button',
            { onClick: function onClick() {
                return _this2.viewer.zoomOut();
              } },
            'Zoom out'
          )
        ),
        React.createElement(PDFDocument, { src: PdfSample, ref: function ref(node) {
            _this2.viewer = node;
          } })
      );
    }
  }]);

  return ZoomWrapper;
}(React.Component);

;

var PageIndicatorWrapper = function (_React$Component2) {
  _inherits(PageIndicatorWrapper, _React$Component2);

  function PageIndicatorWrapper() {
    var _ref;

    var _temp, _this3, _ret;

    _classCallCheck(this, PageIndicatorWrapper);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this3 = _possibleConstructorReturn(this, (_ref = PageIndicatorWrapper.__proto__ || Object.getPrototypeOf(PageIndicatorWrapper)).call.apply(_ref, [this].concat(args))), _this3), _this3.state = {
      currentPage: 1
    }, _temp), _possibleConstructorReturn(_this3, _ret);
  }

  _createClass(PageIndicatorWrapper, [{
    key: 'render',
    value: function render() {
      var _this4 = this;

      console.log(this.state.currentPage);
      return React.createElement(
        'div',
        null,
        React.createElement(
          'h2',
          null,
          'Page number: ',
          this.state.currentPage
        ),
        React.createElement(PDFDocument, {
          src: PdfSample,
          viewerClassName: "Viewer",
          onPageChange: function onPageChange(_ref2) {
            var pageNumber = _ref2.pageNumber;
            return _this4.setState({ currentPage: pageNumber });
          },
          ref: function ref(node) {
            _this4.viewer = node;
          }
        })
      );
    }
  }]);

  return PageIndicatorWrapper;
}(React.Component);

var FindTextWrapper = function (_React$Component3) {
  _inherits(FindTextWrapper, _React$Component3);

  function FindTextWrapper() {
    var _ref3;

    var _temp2, _this5, _ret2;

    _classCallCheck(this, FindTextWrapper);

    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return _ret2 = (_temp2 = (_this5 = _possibleConstructorReturn(this, (_ref3 = FindTextWrapper.__proto__ || Object.getPrototypeOf(FindTextWrapper)).call.apply(_ref3, [this].concat(args))), _this5), _this5.state = {
      searchText: '',
      pageNumber: 1
    }, _this5.changeText = function (event) {
      return _this5.setState({ searchText: event.target.value });
    }, _this5.changePageNumber = function (event) {
      _this5.setState({ pageNumber: event.target.value }, function () {
        _this5.viewer.scrollToPage(_this5.state.pageNumber);
      });
    }, _temp2), _possibleConstructorReturn(_this5, _ret2);
  }

  _createClass(FindTextWrapper, [{
    key: 'render',
    value: function render() {
      var _this6 = this;

      return React.createElement(
        'div',
        null,
        React.createElement(
          'div',
          null,
          React.createElement(
            'h3',
            null,
            'Find text:'
          ),
          React.createElement('input', { type: 'text', onChange: this.changeText })
        ),
        React.createElement(
          'div',
          null,
          React.createElement(
            'h3',
            null,
            'Scroll To:'
          ),
          React.createElement('input', { type: 'number', value: this.state.pageNumber, onChange: this.changePageNumber })
        ),
        React.createElement(PDFDocument, {
          src: PdfSample,
          pageNumber: this.state.pageNumber,
          searchText: this.state.searchText,
          viewerClassName: "Viewer",
          onPageChange: function onPageChange(_ref4) {
            var pageNumber = _ref4.pageNumber;
            return _this6.setState({ currentPage: pageNumber });
          },
          ref: function ref(node) {
            _this6.viewer = node;
          }
        })
      );
    }
  }]);

  return FindTextWrapper;
}(React.Component);

export default [{
  component: PDFDocument,
  name: 'Basic',
  props: {
    componentOnLoading: function componentOnLoading() {
      return React.createElement(
        'h3',
        null,
        'Loading document. Please wait...'
      );
    },
    src: PdfSample
  }
}, {
  component: ZoomWrapper,
  name: 'Zoom'
}, {
  component: PageIndicatorWrapper,
  name: 'Page Indicator'
}, {
  component: FindTextWrapper,
  name: 'Text finder',
  props: {
    containerClassName: 'Viewer'
  }
}];