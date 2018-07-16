import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import cx from 'classnames';
import * as PDFJSViewer from 'pdfjs-dist/web/pdf_viewer';
import 'pdfjs-dist/web/pdf_viewer.css';

class Viewer extends Component {
  constructor(props) {
    super(props);
    this.initEventBus();
  }

  static defaultProps = {
    searchText: '',
  };

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

  componentDidUpdate(prevProps) {
    if (this.props.enableSearchText && prevProps.searchText !== this.props.searchText) {
      this.searchForText();
    }
  }

  initEventBus() {
    this.eventBus = new PDFJSViewer.EventBus();
    
    this.eventBus.on('pagesinit', args => {
      this.pdfViewer.currentScaleValue = this.props.documentScale;
      if (this.props.onPagesInit) this.props.onPagesInit(args);
      if (this.props.enableSearchText) this.searchForText();
    });

    this.eventBus.on('pagechange', args => {
      if (this.props.onPageChange) this.props.onPageChange(args);
    });
  }

  searchForText = () => {
    if (this.pdfFindController) {
      this.pdfFindController.executeCommand('find', {
        query: this.props.searchText,
        highlightAll: true,
      });
    }
  }

  scrollToPage = pageNumber => {
    if (this.pdfViewer.container) {
      this.pdfViewer.container.querySelector(`[data-page-number="${pageNumber}"]`).scrollIntoView();
    }
  };

  scrollToPosition = position => {
    if (this.pdfViewer.viewer) {
      this.pdfViewer.viewer.scrollIntoView({ behavior: 'instant', top: position });
    }
  }

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

export default Viewer;
