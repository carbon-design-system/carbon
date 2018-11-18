import React from 'react';
import { storiesOf } from '@storybook/react';
import QID20 from '../../../es/Q/iD/20.js';

storiesOf('QID20', module)
  .add('default', () => <QID20 />)
  .add('with accessibility label', () => (
    <QID20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <QID20 aria-label="Icon label">
      <title>Icon title</title>
    </QID20>
  ));
