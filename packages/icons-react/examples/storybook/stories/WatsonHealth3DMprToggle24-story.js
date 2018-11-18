import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealth3DMprToggle24 from '../../../es/watson-health/3D-MPR-Toggle/24.js';

storiesOf('WatsonHealth3DMprToggle24', module)
  .add('default', () => <WatsonHealth3DMprToggle24 />)
  .add('with accessibility label', () => (
    <WatsonHealth3DMprToggle24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealth3DMprToggle24 aria-label="Icon label">
      <title>Icon title</title>
    </WatsonHealth3DMprToggle24>
  ));
