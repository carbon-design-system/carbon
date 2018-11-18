import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealth3DMprToggle20 from '../../../es/watson-health/3D-MPR-Toggle/20.js';

storiesOf('WatsonHealth3DMprToggle20', module)
  .add('default', () => <WatsonHealth3DMprToggle20 />)
  .add('with accessibility label', () => (
    <WatsonHealth3DMprToggle20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealth3DMprToggle20 aria-label="Icon label">
      <title>Icon title</title>
    </WatsonHealth3DMprToggle20>
  ));
