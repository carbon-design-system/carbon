import React from 'react';
import { storiesOf } from '@storybook/react';
import PanelExpansion24 from '../../../es/panel-expansion/24.js';

storiesOf('PanelExpansion24', module)
  .add('default', () => <PanelExpansion24 />)
  .add('with accessibility label', () => (
    <PanelExpansion24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <PanelExpansion24 aria-label="Icon label">
      <title>Icon title</title>
    </PanelExpansion24>
  ));
