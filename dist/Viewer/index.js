import _regeneratorRuntime from 'babel-runtime/regenerator';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import ReactDOM from 'react-dom';
import PDFJSLib from 'pdfjs-dist';
import * as PDFJSViewer from 'pdfjs-dist/web/pdf_viewer';
import cx from 'classnames';
import 'pdfjs-dist/web/pdf_viewer.css';
import './styles.css';
import { PDF_MESSAGES } from './constants';

var Viewer = function (_React$Component) {
  _inherits(Viewer, _React$Component);

  function Viewer(props) {
    var _this2 = this;

    _classCallCheck(this, Viewer);

    var _this = _possibleConstructorReturn(this, (Viewer.__proto__ || Object.getPrototypeOf(Viewer)).call(this, props));

    _this.state = {
      loading: null,
      error: null,
      document: null
    };
    _this.loadDocument = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
      var document;
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return PDFJSLib.getDocument(_this.props.src);

            case 3:
              document = _context.sent;

              debugger;
              return _context.abrupt('return', _this.setState({ document: document, loading: false }));

            case 8:
              _context.prev = 8;
              _context.t0 = _context['catch'](0);

              _this.setState({ error: PDF_MESSAGES.ERROR });

            case 11:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this2, [[0, 8]]);
    }));

    _this.initEventBus();
    return _this;
  }

  _createClass(Viewer, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this3 = this;

      var viewerContainer = ReactDOM.findDOMNode(this);
      console.log(PDFJSViewer.PDFViewer);
      this.pdfViewer = new PDFJSViewer.PDFViewer({
        container: viewerContainer
      });

      this.setState({ loading: true }, _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2() {
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _this3.loadDocument();

              case 2:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, _this3);
      })));
    }
  }, {
    key: 'initEventBus',
    value: function initEventBus() {
      var eventBus = new PDFJSViewer.EventBus();

      eventBus.on('pagesinit', function () {
        console.log('init event bus');
      });

      this.eventBus = eventBus;
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.pdfViewer.setDocument(this.state.document);
    }
  }, {
    key: 'render',
    value: function render() {
      var containerClassName = cx(this.props.containerClassName);
      var viewerClassName = cx('viewer', this.props.viewerClassName, 'pdfViewer');

      return React.createElement(
        'div',
        { className: containerClassName },
        React.createElement('div', { className: viewerClassName })
      );
    }
  }]);

  return Viewer;
}(React.Component);

export default Viewer;