import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

function render(element) {
  ReactDOM.render(element, document.getElementById('root'));
}

render(<App />);

if (module.hot) {
  const NextApp = require('./components/App').default;
  module.hot.dispose(() => {
    render(<NextApp />);
  });
}
