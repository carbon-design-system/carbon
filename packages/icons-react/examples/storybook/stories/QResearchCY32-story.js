import React from 'react';
import { storiesOf } from '@storybook/react';
import QResearchCy32 from '../../../lib/QResearchCY/32';

storiesOf('QResearchCy32', module)
  .add('default', () => <QResearchCy32 />)
  .add('with accessibility label', () => (
    <QResearchCy32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <QResearchCy32 focusable>
      <title>Icon title</title>
    </QResearchCy32>
  ));
