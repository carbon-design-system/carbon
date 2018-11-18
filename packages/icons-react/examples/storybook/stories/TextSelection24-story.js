import React from 'react';
import { storiesOf } from '@storybook/react';
import TextSelection24 from '../../../es/text-selection/24.js';

storiesOf('TextSelection24', module)
  .add('default', () => <TextSelection24 />)
  .add('with accessibility label', () => (
    <TextSelection24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <TextSelection24 aria-label="Icon label">
      <title>Icon title</title>
    </TextSelection24>
  ));
