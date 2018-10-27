import React from 'react';
import { storiesOf } from '@storybook/react';
import QResearchX32 from '../../../lib/Q-research--X/32';

storiesOf('QResearchX32', module)
  .add('default', () => <QResearchX32 />)
  .add('with accessibility label', () => (
    <QResearchX32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <QResearchX32 focusable>
      <title>Icon title</title>
    </QResearchX32>
  ));
