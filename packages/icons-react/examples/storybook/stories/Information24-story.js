import React from 'react';
import { storiesOf } from '@storybook/react';
import Information24 from '../../../es/information/24.js';

storiesOf('Information24', module)
  .add('default', () => <Information24 />)
  .add('with accessibility label', () => (
    <Information24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Information24 aria-label="Icon label">
      <title>Icon title</title>
    </Information24>
  ));
