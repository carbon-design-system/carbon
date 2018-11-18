import React from 'react';
import { storiesOf } from '@storybook/react';
import Industry20 from '../../../es/industry/20.js';

storiesOf('Industry20', module)
  .add('default', () => <Industry20 />)
  .add('with accessibility label', () => (
    <Industry20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Industry20 aria-label="Icon label">
      <title>Icon title</title>
    </Industry20>
  ));
