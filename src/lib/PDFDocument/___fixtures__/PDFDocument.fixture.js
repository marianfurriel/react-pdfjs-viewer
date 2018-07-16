import React from 'react';
import PDFDocument from '../index';
import PdfSample from '../../../pdf-documents/pdf_sample.pdf';
import './styles.css';

class ZoomWrapper extends React.Component {
  render() {
    return (
      <div>
        <div>
          <button onClick={() => this.viewer.zoomIn()}>Zoom In</button>
          <button onClick={() => this.viewer.zoomOut()}>Zoom out</button>
        </div>
        <PDFDocument src={PdfSample} ref={node => { this.viewer = node }}/>
      </div>
    );
  }
};

class PageIndicatorWrapper extends React.Component {
  state = {
    currentPage: 1,
  };

  render() {
    console.log(this.state.currentPage);
    return (
      <div>
        <h2>Page number: { this.state.currentPage }</h2>
        <PDFDocument 
          src={PdfSample}
          viewerClassName={"Viewer"}
          onPageChange={({ pageNumber }) => this.setState({ currentPage: pageNumber })}
          ref={node => { this.viewer = node }}
        />
      </div>
    );
  }
}

class FindTextWrapper extends React.Component {
  state = {
    searchText: '',
    pageNumber: 1,
  };

  changeText = (event) => this.setState({ searchText: event.target.value }); 

  changePageNumber = (event) => {
    this.setState({ pageNumber: event.target.value }, () => {
      this.viewer.scrollToPage(this.state.pageNumber);
    });
  }

  render() {
    return (
      <div>
        <div>
          <h3>Find text:</h3>
          <input type="text" onChange={this.changeText} />
        </div>
        <div>
          <h3>Scroll To:</h3>
          <input type="number" value={this.state.pageNumber} onChange={this.changePageNumber} />
        </div>
        <PDFDocument 
          src={PdfSample}
          pageNumber={this.state.pageNumber}
          searchText={this.state.searchText}
          viewerClassName={"Viewer"}
          onPageChange={({ pageNumber }) => this.setState({ currentPage: pageNumber })}
          ref={node => { this.viewer = node }}
        />
      </div>  
    );
  }
}

export default [
  {
    component: PDFDocument,
    name: 'Basic',
    props: {
      componentOnLoading: () => <h3>Loading document. Please wait...</h3>,
      src: PdfSample,
    }
  },
  {
    component: ZoomWrapper,
    name: 'Zoom',
  },
  {
    component: PageIndicatorWrapper,
    name: 'Page Indicator',
  },
  {
    component: FindTextWrapper,
    name: 'Text finder',
    props: {
      containerClassName: 'Viewer',
    }
  }
];
