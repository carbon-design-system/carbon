import React from 'react';
import { storiesOf } from '@storybook/react';
import DataCheck20 from '../../../es/data--check/20.js';

storiesOf('DataCheck20', module)
  .add('default', () => <DataCheck20 />)
  .add('with accessibility label', () => (
    <DataCheck20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <DataCheck20 aria-label="Icon label">
      <title>Icon title</title>
    </DataCheck20>
  ));
