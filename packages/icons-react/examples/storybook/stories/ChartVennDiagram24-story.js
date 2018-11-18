import React from 'react';
import { storiesOf } from '@storybook/react';
import ChartVennDiagram24 from '../../../es/chart--venn-diagram/24.js';

storiesOf('ChartVennDiagram24', module)
  .add('default', () => <ChartVennDiagram24 />)
  .add('with accessibility label', () => (
    <ChartVennDiagram24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ChartVennDiagram24 aria-label="Icon label">
      <title>Icon title</title>
    </ChartVennDiagram24>
  ));
