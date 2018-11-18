import React from 'react';
import { storiesOf } from '@storybook/react';
import View20 from '../../../es/view/20.js';

storiesOf('View20', module)
  .add('default', () => <View20 />)
  .add('with accessibility label', () => (
    <View20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <View20 aria-label="Icon label">
      <title>Icon title</title>
    </View20>
  ));
