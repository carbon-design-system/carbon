import React from 'react';
import { storiesOf } from '@storybook/react';
import QResearchCZ32 from '../../../lib/Q-research--cZ/32';

storiesOf('QResearchCZ32', module)
  .add('default', () => <QResearchCZ32 />)
  .add('with accessibility label', () => (
    <QResearchCZ32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <QResearchCZ32 focusable>
      <title>Icon title</title>
    </QResearchCZ32>
  ));
