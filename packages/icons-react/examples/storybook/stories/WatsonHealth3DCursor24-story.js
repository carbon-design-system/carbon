import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealth3DCursor24 from '../../../es/watson-health/3D-Cursor/24.js';

storiesOf('WatsonHealth3DCursor24', module)
  .add('default', () => <WatsonHealth3DCursor24 />)
  .add('with accessibility label', () => (
    <WatsonHealth3DCursor24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealth3DCursor24 aria-label="Icon label">
      <title>Icon title</title>
    </WatsonHealth3DCursor24>
  ));
