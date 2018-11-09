import React from 'react';
import { storiesOf } from '@storybook/react';
import CheckboxUndeterminateFilled32 from '../../../lib/CheckboxUndeterminateFilled/32';

storiesOf('CheckboxUndeterminateFilled32', module)
  .add('default', () => <CheckboxUndeterminateFilled32 />)
  .add('with accessibility label', () => (
    <CheckboxUndeterminateFilled32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <CheckboxUndeterminateFilled32 focusable>
      <title>Icon title</title>
    </CheckboxUndeterminateFilled32>
  ));
