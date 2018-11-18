import React from 'react';
import { storiesOf } from '@storybook/react';
import Launch16 from '../../../es/launch/16.js';

storiesOf('Launch16', module)
  .add('default', () => <Launch16 />)
  .add('with accessibility label', () => (
    <Launch16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Launch16 aria-label="Icon label">
      <title>Icon title</title>
    </Launch16>
  ));
