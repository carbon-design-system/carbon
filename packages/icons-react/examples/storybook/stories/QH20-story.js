import React from 'react';
import { storiesOf } from '@storybook/react';
import QH20 from '../../../es/Q/H/20.js';

storiesOf('QH20', module)
  .add('default', () => <QH20 />)
  .add('with accessibility label', () => (
    <QH20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <QH20 aria-label="Icon label">
      <title>Icon title</title>
    </QH20>
  ));
