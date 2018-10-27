import React from 'react';
import { storiesOf } from '@storybook/react';
import ChartVennDiagram32 from '../../../lib/chart--venn-diagram/32';

storiesOf('ChartVennDiagram32', module)
  .add('default', () => <ChartVennDiagram32 />)
  .add('with accessibility label', () => (
    <ChartVennDiagram32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ChartVennDiagram32 focusable>
      <title>Icon title</title>
    </ChartVennDiagram32>
  ));
