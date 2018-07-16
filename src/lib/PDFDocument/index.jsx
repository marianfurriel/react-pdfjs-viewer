import React from 'react';
import PropTypes from 'prop-types';
import PDFJSLib from 'pdfjs-dist';
import Viewer from './Viewer';
import 'pdfjs-dist/web/pdf_viewer.css';
import './styles.css';

export const PDF_MESSAGES = {
  LOADING: 'Loading the document. Please wait...',
  ERROR: 'Error: The document could not be loaded.',
};
class PDFDocument extends React.Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    src: PropTypes.string,
    searchText: PropTypes.string,
    enableSearchText: PropTypes.bool,
    documentScale: PropTypes.string,
    zoomFactor: PropTypes.number,
    containerClassName: PropTypes.string,
    viewerClassName: PropTypes.string,
    onPagesInit: PropTypes.func,
    onPageChange: PropTypes.func,
  };

  static defaultProps = {
    zoomFactor: 0.1,
    enableSearchText: true,
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
    this.setState({ loading: true }, async () => {
      await this.loadDocument();
    });
  }

  loadDocument = async () => {
    console.log(PDFJSLib)
    try {
      const document = await PDFJSLib.getDocument(this.props.src);
      return this.setState({ document, loading: false });
    } catch (error) {
      const errorComponent = this.props.componentOnError;
      this.setState({ loading: false, error: errorComponent });
    }
  };

  scrollToPage = pageNumber => this.viewer.scrollToPage(pageNumber);

  scrollToPosition = position => this.viewer.scrollToPosition(position);

  zoomIn = () => this.viewer.zoomIn();

  zoomOut = () => this.viewer.zoomOut();

  render() {
    const ComponentOnLoading = this.props.componentOnLoading || 'div';
    const ComponentOnError = this.props.componentOnError ||'div';

    if (this.state.loading) return <ComponentOnLoading />;
    
    if (this.state.error) return <ComponentOnError />;

    if (!this.state.document) return <ComponentOnLoading />;

    return (
      <Viewer
        document={this.state.document}
        searchText={this.props.searchText}
        enableSearchText={this.props.enableSearchText}
        documentScale={this.props.documentScale}
        containerClassName={this.props.containerClassName}
        viewerClassName={this.props.viewerClassName}
        onPageChange={this.props.onPageChange}
        onPagesInit={this.props.onPagesInit}
        ref={node => this.viewer = node}
      />  
    );
  }
}

export default PDFDocument;
