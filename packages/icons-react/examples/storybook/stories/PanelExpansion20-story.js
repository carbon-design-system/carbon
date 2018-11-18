import React from 'react';
import { storiesOf } from '@storybook/react';
import PanelExpansion20 from '../../../es/panel-expansion/20.js';

storiesOf('PanelExpansion20', module)
  .add('default', () => <PanelExpansion20 />)
  .add('with accessibility label', () => (
    <PanelExpansion20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <PanelExpansion20 aria-label="Icon label">
      <title>Icon title</title>
    </PanelExpansion20>
  ));
