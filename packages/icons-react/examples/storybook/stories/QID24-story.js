import React from 'react';
import { storiesOf } from '@storybook/react';
import QID24 from '../../../es/Q/iD/24.js';

storiesOf('QID24', module)
  .add('default', () => <QID24 />)
  .add('with accessibility label', () => (
    <QID24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <QID24 aria-label="Icon label">
      <title>Icon title</title>
    </QID24>
  ));
