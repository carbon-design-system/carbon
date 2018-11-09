import React from 'react';
import { storiesOf } from '@storybook/react';
import View16 from '../../../lib/View/16';

storiesOf('View16', module)
  .add('default', () => <View16 />)
  .add('with accessibility label', () => (
    <View16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <View16 focusable>
      <title>Icon title</title>
    </View16>
  ));
