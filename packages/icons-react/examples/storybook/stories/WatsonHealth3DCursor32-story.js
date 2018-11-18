import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealth3DCursor32 from '../../../es/watson-health/3D-Cursor/32.js';

storiesOf('WatsonHealth3DCursor32', module)
  .add('default', () => <WatsonHealth3DCursor32 />)
  .add('with accessibility label', () => (
    <WatsonHealth3DCursor32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealth3DCursor32 aria-label="Icon label">
      <title>Icon title</title>
    </WatsonHealth3DCursor32>
  ));
