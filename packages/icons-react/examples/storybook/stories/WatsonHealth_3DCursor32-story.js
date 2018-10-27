import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealth_3DCursor32 from '../../../lib/watson-health--3D-Cursor/32';

storiesOf('WatsonHealth_3DCursor32', module)
  .add('default', () => <WatsonHealth_3DCursor32 />)
  .add('with accessibility label', () => (
    <WatsonHealth_3DCursor32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealth_3DCursor32 focusable>
      <title>Icon title</title>
    </WatsonHealth_3DCursor32>
  ));
