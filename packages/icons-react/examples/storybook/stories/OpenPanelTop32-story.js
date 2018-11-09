import React from 'react';
import { storiesOf } from '@storybook/react';
import OpenPanelTop32 from '../../../lib/OpenPanelTop/32';

storiesOf('OpenPanelTop32', module)
  .add('default', () => <OpenPanelTop32 />)
  .add('with accessibility label', () => (
    <OpenPanelTop32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <OpenPanelTop32 focusable>
      <title>Icon title</title>
    </OpenPanelTop32>
  ));
