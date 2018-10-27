import React from 'react';
import { storiesOf } from '@storybook/react';
import Renew32 from '../../../lib/renew/32';

storiesOf('Renew32', module)
  .add('default', () => <Renew32 />)
  .add('with accessibility label', () => (
    <Renew32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Renew32 focusable>
      <title>Icon title</title>
    </Renew32>
  ));
