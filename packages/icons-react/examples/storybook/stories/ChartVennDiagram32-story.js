import React from 'react';
import { storiesOf } from '@storybook/react';
import ChartVennDiagram32 from '../../../es/chart--venn-diagram/32.js';

storiesOf('ChartVennDiagram32', module)
  .add('default', () => <ChartVennDiagram32 />)
  .add('with accessibility label', () => (
    <ChartVennDiagram32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ChartVennDiagram32 aria-label="Icon label">
      <title>Icon title</title>
    </ChartVennDiagram32>
  ));
