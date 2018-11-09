import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealth_3DMprToggle32 from '../../../lib/WatsonHealth_3DMprToggle/32';

storiesOf('WatsonHealth_3DMprToggle32', module)
  .add('default', () => <WatsonHealth_3DMprToggle32 />)
  .add('with accessibility label', () => (
    <WatsonHealth_3DMprToggle32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealth_3DMprToggle32 focusable>
      <title>Icon title</title>
    </WatsonHealth_3DMprToggle32>
  ));
