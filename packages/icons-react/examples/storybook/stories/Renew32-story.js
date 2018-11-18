import React from 'react';
import { storiesOf } from '@storybook/react';
import Renew32 from '../../../es/renew/32.js';

storiesOf('Renew32', module)
  .add('default', () => <Renew32 />)
  .add('with accessibility label', () => (
    <Renew32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Renew32 aria-label="Icon label">
      <title>Icon title</title>
    </Renew32>
  ));
