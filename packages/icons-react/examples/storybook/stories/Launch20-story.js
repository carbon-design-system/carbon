import React from 'react';
import { storiesOf } from '@storybook/react';
import Launch20 from '../../../es/launch/20.js';

storiesOf('Launch20', module)
  .add('default', () => <Launch20 />)
  .add('with accessibility label', () => (
    <Launch20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Launch20 aria-label="Icon label">
      <title>Icon title</title>
    </Launch20>
  ));
