import _regeneratorRuntime from 'babel-runtime/regenerator';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';
import PDFJSLib from 'pdfjs-dist';
import Viewer from './Viewer';
import 'pdfjs-dist/web/pdf_viewer.css';
import './styles.css';

export var PDF_MESSAGES = {
  LOADING: 'Loading the document. Please wait...',
  ERROR: 'Error: The document could not be loaded.'
};

var PDFDocument = function (_React$Component) {
  _inherits(PDFDocument, _React$Component);

  function PDFDocument(props) {
    var _this2 = this;

    _classCallCheck(this, PDFDocument);

    var _this = _possibleConstructorReturn(this, (PDFDocument.__proto__ || Object.getPrototypeOf(PDFDocument)).call(this, props));

    _this.state = {
      loading: null,
      error: null,
      document: null
    };
    _this.loadDocument = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
      var document, errorComponent;
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              console.log(PDFJSLib);
              _context.prev = 1;
              _context.next = 4;
              return PDFJSLib.getDocument(_this.props.src);

            case 4:
              document = _context.sent;
              return _context.abrupt('return', _this.setState({ document: document, loading: false }));

            case 8:
              _context.prev = 8;
              _context.t0 = _context['catch'](1);
              errorComponent = _this.props.componentOnError;

              _this.setState({ loading: false, error: errorComponent });

            case 12:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this2, [[1, 8]]);
    }));

    _this.scrollToPage = function (pageNumber) {
      return _this.viewer.scrollToPage(pageNumber);
    };

    _this.scrollToPosition = function (position) {
      return _this.viewer.scrollToPosition(position);
    };

    _this.zoomIn = function () {
      return _this.viewer.zoomIn();
    };

    _this.zoomOut = function () {
      return _this.viewer.zoomOut();
    };

    return _this;
  }

  _createClass(PDFDocument, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      if (this.props.document !== nextProps.document) return false;
      return true;
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this3 = this;

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
    key: 'render',
    value: function render() {
      var _this4 = this;

      var ComponentOnLoading = this.props.componentOnLoading || 'div';
      var ComponentOnError = this.props.componentOnError || 'div';

      if (this.state.loading) return React.createElement(ComponentOnLoading, null);

      if (this.state.error) return React.createElement(ComponentOnError, null);

      if (!this.state.document) return React.createElement(ComponentOnLoading, null);

      return React.createElement(Viewer, {
        document: this.state.document,
        searchText: this.props.searchText,
        enableSearchText: this.props.enableSearchText,
        documentScale: this.props.documentScale,
        containerClassName: this.props.containerClassName,
        viewerClassName: this.props.viewerClassName,
        onPageChange: this.props.onPageChange,
        onPagesInit: this.props.onPagesInit,
        ref: function ref(node) {
          return _this4.viewer = node;
        }
      });
    }
  }]);

  return PDFDocument;
}(React.Component);

PDFDocument.propTypes = {
  src: PropTypes.string,
  searchText: PropTypes.string,
  enableSearchText: PropTypes.bool,
  documentScale: PropTypes.string,
  zoomFactor: PropTypes.number,
  containerClassName: PropTypes.string,
  viewerClassName: PropTypes.string,
  onPagesInit: PropTypes.func,
  onPageChange: PropTypes.func
};
PDFDocument.defaultProps = {
  zoomFactor: 0.1,
  enableSearchText: true,
  documentScale: 'page-width'
};


export default PDFDocument;