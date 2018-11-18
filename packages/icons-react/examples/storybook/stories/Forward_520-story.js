import React from 'react';
import { storiesOf } from '@storybook/react';
import Forward_520 from '../../../es/forward--5/20.js';

storiesOf('Forward_520', module)
  .add('default', () => <Forward_520 />)
  .add('with accessibility label', () => (
    <Forward_520 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Forward_520 aria-label="Icon label">
      <title>Icon title</title>
    </Forward_520>
  ));
