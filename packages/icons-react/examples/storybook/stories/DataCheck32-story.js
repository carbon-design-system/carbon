import React from 'react';
import { storiesOf } from '@storybook/react';
import DataCheck32 from '../../../lib/DataCheck/32';

storiesOf('DataCheck32', module)
  .add('default', () => <DataCheck32 />)
  .add('with accessibility label', () => (
    <DataCheck32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <DataCheck32 focusable>
      <title>Icon title</title>
    </DataCheck32>
  ));
