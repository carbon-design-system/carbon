import React from 'react';
import { storiesOf } from '@storybook/react';
import QResearchId32 from '../../../lib/QResearchID/32';

storiesOf('QResearchId32', module)
  .add('default', () => <QResearchId32 />)
  .add('with accessibility label', () => (
    <QResearchId32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <QResearchId32 focusable>
      <title>Icon title</title>
    </QResearchId32>
  ));
