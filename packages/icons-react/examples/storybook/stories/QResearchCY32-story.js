import React from 'react';
import { storiesOf } from '@storybook/react';
import QResearchCY32 from '../../../lib/Q-research--cY/32';

storiesOf('QResearchCY32', module)
  .add('default', () => <QResearchCY32 />)
  .add('with accessibility label', () => (
    <QResearchCY32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <QResearchCY32 focusable>
      <title>Icon title</title>
    </QResearchCY32>
  ));
