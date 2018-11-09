import React from 'react';
import { storiesOf } from '@storybook/react';
import TextBold32 from '../../../lib/TextBold/32';

storiesOf('TextBold32', module)
  .add('default', () => <TextBold32 />)
  .add('with accessibility label', () => (
    <TextBold32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <TextBold32 focusable>
      <title>Icon title</title>
    </TextBold32>
  ));
