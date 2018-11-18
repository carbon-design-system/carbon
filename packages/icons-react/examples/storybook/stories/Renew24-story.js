import React from 'react';
import { storiesOf } from '@storybook/react';
import Renew24 from '../../../es/renew/24.js';

storiesOf('Renew24', module)
  .add('default', () => <Renew24 />)
  .add('with accessibility label', () => (
    <Renew24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Renew24 aria-label="Icon label">
      <title>Icon title</title>
    </Renew24>
  ));
