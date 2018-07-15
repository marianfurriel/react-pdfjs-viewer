import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import cx from 'classnames';
import * as PDFJSViewer from 'pdfjs-dist/web/pdf_viewer.js';
import 'pdfjs-dist/web/pdf_viewer.css';

class Viewer extends Component {
  constructor(props) {
    super(props);
    this.initEventBus();
  }

  componentDidMount() {
    const viewerContainer = ReactDOM.findDOMNode(this);
    this.pdfViewer = new PDFJSViewer.PDFViewer({
      container: viewerContainer,
      eventBus: this.eventBus,
    });

    this.pdfFindController = new PDFJSViewer.PDFFindController({
      pdfViewer: this.pdfViewer,
    });
    this.pdfViewer.setFindController(this.pdfFindController);

    this.pdfViewer.setDocument(this.props.document);
  }

  shouldComponentUpdate(nextProps) {
    if (this.props.document !== nextProps.document || this.props.searchText !== nextProps.searchText) {
      return true;
    }
    return false;
  }

  initEventBus() {
    const eventBus = new PDFJSViewer.EventBus();
    
    eventBus.on('pagesinit', args => {
      this.pdfViewer.currentScaleValue = this.props.documentScale;
      if (this.props.onPagesInit) this.props.onPagesInit(args);
    });

    eventBus.on('pagechange', args => {
      if (this.props.onPageChange) this.props.onPageChange(args);
    });

    this.eventBus = eventBus;
  }

  scrollToPage = pageNumber => {
    scrollTo(`[data-page-number="${pageNumber}"]`, this.pdfViewer.container);
  };

  zoomOut = () => {
    this.pdfViewer.currentScale -= 0.1;
  };

  zoomIn = () => {
    this.pdfViewer.currentScale += 0.1;
  };

  render() {
    const containerClassName = cx(this.props.containerClassName);
    const viewerClassName = cx('viewer', this.props.viewerClassName, 'pdfViewer');

    return (
      <div className={containerClassName}>
        <div className={viewerClassName} />
      </div>
    );
  }
}

Viewer.propTypes = {
  document: PropTypes.object,
  onInit: PropTypes.func.isRequired,
};

export default Viewer;
