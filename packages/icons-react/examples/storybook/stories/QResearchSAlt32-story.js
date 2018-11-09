import React from 'react';
import { storiesOf } from '@storybook/react';
import QResearchSAlt32 from '../../../lib/QResearchSAlt/32';

storiesOf('QResearchSAlt32', module)
  .add('default', () => <QResearchSAlt32 />)
  .add('with accessibility label', () => (
    <QResearchSAlt32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <QResearchSAlt32 focusable>
      <title>Icon title</title>
    </QResearchSAlt32>
  ));
