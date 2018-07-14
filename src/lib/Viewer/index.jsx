import React from 'react';
import ReactDOM from 'react-dom';
import PDFJSLib from 'pdfjs-dist';
import * as PDFJSViewer from 'pdfjs-dist/web/pdf_viewer';
import cx from 'classnames';
import 'pdfjs-dist/web/pdf_viewer.css';
import './styles.css';
import { PDF_MESSAGES } from './constants';

class Viewer extends React.Component {
  constructor(props) {
    super(props);
    this.initEventBus();
  }

  state = {
    loading: null,
    error: null,
    document: null,
  };

  componentDidMount() {
    const viewerContainer = ReactDOM.findDOMNode(this);
    console.log(PDFJSViewer.PDFViewer);
    this.pdfViewer = new PDFJSViewer.PDFViewer({
      container: viewerContainer,
    });

    this.setState({ loading: true }, async () => {
      await this.loadDocument();
    });
  }

  loadDocument = async () => {
    try {
      const document = await PDFJSLib.getDocument(this.props.src);
      debugger;
      return this.setState({ document, loading: false });
    } catch (error) {
      this.setState({ error: PDF_MESSAGES.ERROR });
    }
  };

  initEventBus() {
    const eventBus = new PDFJSViewer.EventBus();
    
    eventBus.on('pagesinit', () => {
      console.log('init event bus');
    });

    this.eventBus = eventBus;
  }

  componentDidUpdate() {
    this.pdfViewer.setDocument(this.state.document);
  }

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
