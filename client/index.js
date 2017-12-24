import React from 'react';
import ReactDOM, { render } from 'react-dom';
import MyComponent from './components/MyComponent';
import './index.scss';

const props = {
  data: 123
}

render(<MyComponent {...props} />, document.getElementById('root'));
