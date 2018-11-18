import React from 'react';
import { storiesOf } from '@storybook/react';
import DataCheck24 from '../../../es/data--check/24.js';

storiesOf('DataCheck24', module)
  .add('default', () => <DataCheck24 />)
  .add('with accessibility label', () => (
    <DataCheck24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <DataCheck24 aria-label="Icon label">
      <title>Icon title</title>
    </DataCheck24>
  ));
