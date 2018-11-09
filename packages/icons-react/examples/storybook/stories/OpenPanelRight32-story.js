import React from 'react';
import { storiesOf } from '@storybook/react';
import OpenPanelRight32 from '../../../lib/OpenPanelRight/32';

storiesOf('OpenPanelRight32', module)
  .add('default', () => <OpenPanelRight32 />)
  .add('with accessibility label', () => (
    <OpenPanelRight32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <OpenPanelRight32 focusable>
      <title>Icon title</title>
    </OpenPanelRight32>
  ));
