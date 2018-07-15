import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import PDFJSLib from 'pdfjs-dist';
import * as PDFJSViewer from 'pdfjs-dist/web/pdf_viewer';
import cx from 'classnames';
import { PDF_MESSAGES } from './constants';
import 'pdfjs-dist/web/pdf_viewer.css';
import './styles.css';

class PDFDocument extends React.Component {
  constructor(props) {
    super(props);
    this.initEventBus();
  }

  static propTypes = {
    src: PropTypes.string,
    documentScale: PropTypes.string,
    zoomFactor: PropTypes.number,
    containerClassName: PropTypes.string,
    viewerClassName: PropTypes.string,
    onPagesInit: PropTypes.func,
    onPageChange: PropTypes.func,
  };

  static defaultProps = {
    zoomFactor: 0.1,
    documentScale: 'page-width',
  }

  state = {
    loading: null,
    error: null,
    document: null,
  };

  shouldComponentUpdate(nextProps) {
    if (this.props.document !== nextProps.document) return false;
    return true;
  }

  componentDidMount() {
    const container = ReactDOM.findDOMNode(this);

    this.pdfViewer = new PDFJSViewer.PDFViewer({
      container,
      eventBus: this.eventBus,
    });

    this.setState({ loading: true }, async () => {
      await this.loadDocument();
    });
  }

  loadDocument = async () => {
    try {
      const document = await PDFJSLib.getDocument(this.props.src);
      return this.setState({ document, loading: false });
    } catch (error) {
      const errorComponent = this.props.componentOnError;
      this.setState({ loading: false, error: errorComponent });
    }
  };

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

  componentDidUpdate() {
    this.pdfViewer.setDocument(this.state.document);
  }

  zoomIn = () => {
    this.pdfViewer.currentScale += this.props.zoomFactor;
  }

  zoomOut = () => {
    this.pdfViewer.currentScale -= this.props.zoomFactor;
  }

  render() {
    const containerClassName = cx(this.props.containerClassName);
    const viewerClassName = cx('viewer', this.props.viewerClassName, 'pdfViewer');

    const ComponentOnLoading = this.props.componentOnLoading || 'div';
    const ComponentOnError = this.props.componentOnError ||'div';


    return (
      <div className={containerClassName} >
        { 
          this.state.loading && <ComponentOnLoading />
        }
        { 
          this.state.error && <ComponentOnError />
        }
        <div className={viewerClassName} />
      </div>
    );
  }
}

export default PDFDocument;
