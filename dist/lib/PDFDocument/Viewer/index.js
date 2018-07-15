var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import cx from 'classnames';
import * as PDFJSViewer from 'pdfjs-dist/web/pdf_viewer.js';
import 'pdfjs-dist/web/pdf_viewer.css';
import styles from './styles.css';

var Viewer = function (_Component) {
  _inherits(Viewer, _Component);

  function Viewer(props) {
    _classCallCheck(this, Viewer);

    var _this = _possibleConstructorReturn(this, (Viewer.__proto__ || Object.getPrototypeOf(Viewer)).call(this, props));

    _this.zoomOut = function () {
      _this.pdfViewer.currentScale -= 0.1;
    };

    _this.zoomIn = function () {
      _this.pdfViewer.currentScale += 0.1;
    };

    _this.initEventBus();
    return _this;
  }

  _createClass(Viewer, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var viewerContainer = ReactDOM.findDOMNode(this);
      this.pdfViewer = new PDFJSViewer.PDFViewer({
        container: viewerContainer,
        eventBus: this.eventBus
      });

      this.pdfFindController = new PDFJSViewer.PDFFindController({
        pdfViewer: this.pdfViewer
      });
      this.pdfViewer.setFindController(this.pdfFindController);

      this.pdfViewer.setDocument(this.props.document);
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      if (this.props.document !== nextProps.document || this.props.searchText !== nextProps.searchText) {
        return true;
      }
      return false;
    }
  }, {
    key: 'initEventBus',
    value: function initEventBus() {
      var _this2 = this;

      var eventBus = new PDFJSViewer.EventBus();

      eventBus.on('pagesinit', function (args) {
        _this2.pdfViewer.currentScaleValue = _this2.props.documentScale;
        if (_this2.props.onPagesInit) _this2.props.onPagesInit(args);
      });

      eventBus.on('pagechange', function (args) {
        if (_this2.props.onPageChange) _this2.props.onPageChange(args);
      });

      this.eventBus = eventBus;
    }

    // scrollToPage = pageNumber => {
    //   scrollTo(`[data-page-number="${pageNumber}"]`, this.pdfViewer.container);
    // };

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
}(Component);

Viewer.propTypes = {
  document: PropTypes.object,
  onInit: PropTypes.func.isRequired
};

export default Viewer;