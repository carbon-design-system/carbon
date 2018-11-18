import React from 'react';
import { storiesOf } from '@storybook/react';
import PanelExpansion32 from '../../../es/panel-expansion/32.js';

storiesOf('PanelExpansion32', module)
  .add('default', () => <PanelExpansion32 />)
  .add('with accessibility label', () => (
    <PanelExpansion32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <PanelExpansion32 aria-label="Icon label">
      <title>Icon title</title>
    </PanelExpansion32>
  ));
