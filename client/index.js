import React from 'react';
import ReactDOM, { render } from 'react-dom';
import App from './components/App';
import './index.scss';

const props = {
  data: 123
}

render(<App {...props} />, document.getElementById('root'));
