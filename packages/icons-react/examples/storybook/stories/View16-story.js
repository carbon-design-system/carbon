import React from 'react';
import { storiesOf } from '@storybook/react';
import View16 from '../../../es/view/16.js';

storiesOf('View16', module)
  .add('default', () => <View16 />)
  .add('with accessibility label', () => (
    <View16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <View16 aria-label="Icon label">
      <title>Icon title</title>
    </View16>
  ));
