import React from 'react';
import { storiesOf } from '@storybook/react';
import QResearchCz32 from '../../../lib/QResearchCZ/32';

storiesOf('QResearchCz32', module)
  .add('default', () => <QResearchCz32 />)
  .add('with accessibility label', () => (
    <QResearchCz32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <QResearchCz32 focusable>
      <title>Icon title</title>
    </QResearchCz32>
  ));
