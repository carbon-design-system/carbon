import React from 'react';
import { storiesOf } from '@storybook/react';
import Awake16 from '../../../lib/awake/16';

storiesOf('Awake16', module)
  .add('default', () => <Awake16 />)
  .add('with accessibility label', () => (
    <Awake16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Awake16 focusable>
      <title>Icon title</title>
    </Awake16>
  ));
