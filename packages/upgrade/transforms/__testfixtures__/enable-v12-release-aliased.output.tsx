import * as Carbon from '@carbon/react';
import { createRoot as mountRoot } from 'react-dom/client';
import App from './App';

const root = mountRoot(document.getElementById('root')!);
root.render(
  <Carbon.FeatureFlags {...featureFlags} enableV12Release>
    <App />
  </Carbon.FeatureFlags>
);

const unwrappedRoot = mountRoot(document.getElementById('unwrapped-root')!);
unwrappedRoot.render(<Carbon.FeatureFlags enableV12Release>
  <App />
</Carbon.FeatureFlags>);

const wrappedRoot = mountRoot(document.getElementById('wrapped-root')!);
wrappedRoot.render(
  <Carbon.FeatureFlags enableV12Release>
    <App />
  </Carbon.FeatureFlags>
);
