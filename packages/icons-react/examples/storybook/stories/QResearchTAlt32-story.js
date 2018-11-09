import React from 'react';
import { storiesOf } from '@storybook/react';
import QResearchTAlt32 from '../../../lib/QResearchTAlt/32';

storiesOf('QResearchTAlt32', module)
  .add('default', () => <QResearchTAlt32 />)
  .add('with accessibility label', () => (
    <QResearchTAlt32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <QResearchTAlt32 focusable>
      <title>Icon title</title>
    </QResearchTAlt32>
  ));
