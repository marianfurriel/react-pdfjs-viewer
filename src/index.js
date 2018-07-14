import React from 'react';
import ReactDOM from 'react-dom';
import Viewer from './lib/Viewer';
import documentPDF from './pdf-documents/pdf-sample.pdf';
import './lib/Viewer/styles.css';

ReactDOM.render(
  <Viewer src={documentPDF} />, 
  document.getElementById('root'),
);
