import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealth3DCursor20 from '../../../es/watson-health/3D-Cursor/20.js';

storiesOf('WatsonHealth3DCursor20', module)
  .add('default', () => <WatsonHealth3DCursor20 />)
  .add('with accessibility label', () => (
    <WatsonHealth3DCursor20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealth3DCursor20 aria-label="Icon label">
      <title>Icon title</title>
    </WatsonHealth3DCursor20>
  ));
