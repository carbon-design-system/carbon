import React from 'react';
import { storiesOf } from '@storybook/react';
import Renew20 from '../../../es/renew/20.js';

storiesOf('Renew20', module)
  .add('default', () => <Renew20 />)
  .add('with accessibility label', () => (
    <Renew20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Renew20 aria-label="Icon label">
      <title>Icon title</title>
    </Renew20>
  ));
