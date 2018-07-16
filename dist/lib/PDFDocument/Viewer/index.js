var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import cx from 'classnames';
import * as PDFJSViewer from 'pdfjs-dist/web/pdf_viewer';
import 'pdfjs-dist/web/pdf_viewer.css';

var Viewer = function (_Component) {
  _inherits(Viewer, _Component);

  function Viewer(props) {
    _classCallCheck(this, Viewer);

    var _this = _possibleConstructorReturn(this, (Viewer.__proto__ || Object.getPrototypeOf(Viewer)).call(this, props));

    _this.searchForText = function () {
      if (_this.pdfFindController) {
        _this.pdfFindController.executeCommand('find', {
          query: _this.props.searchText,
          highlightAll: true
        });
      }
    };

    _this.scrollToPage = function (pageNumber) {
      if (_this.pdfViewer.container) {
        _this.pdfViewer.container.querySelector('[data-page-number="' + pageNumber + '"]').scrollIntoView();
      }
    };

    _this.scrollToPosition = function (position) {
      if (_this.pdfViewer.viewer) {
        _this.pdfViewer.viewer.scrollIntoView({ behavior: 'instant', top: position });
      }
    };

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
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if (this.props.enableSearchText && prevProps.searchText !== this.props.searchText) {
        this.searchForText();
      }
    }
  }, {
    key: 'initEventBus',
    value: function initEventBus() {
      var _this2 = this;

      this.eventBus = new PDFJSViewer.EventBus();

      this.eventBus.on('pagesinit', function (args) {
        _this2.pdfViewer.currentScaleValue = _this2.props.documentScale;
        if (_this2.props.onPagesInit) _this2.props.onPagesInit(args);
        if (_this2.props.enableSearchText) _this2.searchForText();
      });

      this.eventBus.on('pagechange', function (args) {
        if (_this2.props.onPageChange) _this2.props.onPageChange(args);
      });
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
}(Component);

export default Viewer;