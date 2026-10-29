import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMClient, { createRoot, hydrateRoot } from 'react-dom/client';
import { Button } from '@carbon/react';
import App from './App';

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

ReactDOM.render(<App />, document.getElementById('legacy-root'));

hydrateRoot(document.getElementById('hydrated-root'), <App />);

ReactDOMClient.createRoot(document.getElementById('chained-root')).render(
  <App />
);

const preview = <App />;
