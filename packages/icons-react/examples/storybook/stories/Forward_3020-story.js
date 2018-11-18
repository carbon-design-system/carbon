import React from 'react';
import { storiesOf } from '@storybook/react';
import Forward_3020 from '../../../es/forward--30/20.js';

storiesOf('Forward_3020', module)
  .add('default', () => <Forward_3020 />)
  .add('with accessibility label', () => (
    <Forward_3020 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Forward_3020 aria-label="Icon label">
      <title>Icon title</title>
    </Forward_3020>
  ));
