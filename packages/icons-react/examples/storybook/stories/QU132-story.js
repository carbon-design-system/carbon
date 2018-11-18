import React from 'react';
import { storiesOf } from '@storybook/react';
import QU132 from '../../../es/Q/U1/32.js';

storiesOf('QU132', module)
  .add('default', () => <QU132 />)
  .add('with accessibility label', () => (
    <QU132 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <QU132 aria-label="Icon label">
      <title>Icon title</title>
    </QU132>
  ));
