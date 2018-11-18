import React from 'react';
import { storiesOf } from '@storybook/react';
import Identification24 from '../../../es/identification/24.js';

storiesOf('Identification24', module)
  .add('default', () => <Identification24 />)
  .add('with accessibility label', () => (
    <Identification24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Identification24 aria-label="Icon label">
      <title>Icon title</title>
    </Identification24>
  ));
