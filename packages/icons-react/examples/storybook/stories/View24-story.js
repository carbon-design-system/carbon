import React from 'react';
import { storiesOf } from '@storybook/react';
import View24 from '../../../es/view/24.js';

storiesOf('View24', module)
  .add('default', () => <View24 />)
  .add('with accessibility label', () => (
    <View24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <View24 aria-label="Icon label">
      <title>Icon title</title>
    </View24>
  ));
