import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealth3DMprToggle32 from '../../../es/watson-health/3D-MPR-Toggle/32.js';

storiesOf('WatsonHealth3DMprToggle32', module)
  .add('default', () => <WatsonHealth3DMprToggle32 />)
  .add('with accessibility label', () => (
    <WatsonHealth3DMprToggle32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealth3DMprToggle32 aria-label="Icon label">
      <title>Icon title</title>
    </WatsonHealth3DMprToggle32>
  ));
