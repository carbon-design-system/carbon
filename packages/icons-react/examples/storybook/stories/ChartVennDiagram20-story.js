import React from 'react';
import { storiesOf } from '@storybook/react';
import ChartVennDiagram20 from '../../../es/chart--venn-diagram/20.js';

storiesOf('ChartVennDiagram20', module)
  .add('default', () => <ChartVennDiagram20 />)
  .add('with accessibility label', () => (
    <ChartVennDiagram20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ChartVennDiagram20 aria-label="Icon label">
      <title>Icon title</title>
    </ChartVennDiagram20>
  ));
