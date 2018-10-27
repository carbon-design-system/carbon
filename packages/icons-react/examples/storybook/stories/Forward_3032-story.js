import React from 'react';
import { storiesOf } from '@storybook/react';
import Forward_3032 from '../../../lib/forward--30/32';

storiesOf('Forward_3032', module)
  .add('default', () => <Forward_3032 />)
  .add('with accessibility label', () => (
    <Forward_3032 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Forward_3032 focusable>
      <title>Icon title</title>
    </Forward_3032>
  ));
