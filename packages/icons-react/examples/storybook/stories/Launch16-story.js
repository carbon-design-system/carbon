import React from 'react';
import { storiesOf } from '@storybook/react';
import Launch16 from '../../../lib/Launch/16';

storiesOf('Launch16', module)
  .add('default', () => <Launch16 />)
  .add('with accessibility label', () => (
    <Launch16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Launch16 focusable>
      <title>Icon title</title>
    </Launch16>
  ));
