import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMClient, { createRoot, hydrateRoot } from 'react-dom/client';
import { Button, FeatureFlags } from '@carbon/react';
import App from './App';

const root = createRoot(document.getElementById('root'));
root.render(
  <FeatureFlags enableV12Release>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </FeatureFlags>
);

ReactDOM.render(<FeatureFlags enableV12Release>
  <App />
</FeatureFlags>, document.getElementById('legacy-root'));

hydrateRoot(document.getElementById('hydrated-root'), <FeatureFlags enableV12Release>
  <App />
</FeatureFlags>);

ReactDOMClient.createRoot(document.getElementById('chained-root')).render(
  <FeatureFlags enableV12Release>
    <App />
  </FeatureFlags>
);

const preview = <App />;
