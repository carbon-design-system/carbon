import React from 'react';
import { storiesOf } from '@storybook/react';
import OpenPanelBottom32 from '../../../lib/OpenPanelBottom/32';

storiesOf('OpenPanelBottom32', module)
  .add('default', () => <OpenPanelBottom32 />)
  .add('with accessibility label', () => (
    <OpenPanelBottom32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <OpenPanelBottom32 focusable>
      <title>Icon title</title>
    </OpenPanelBottom32>
  ));
