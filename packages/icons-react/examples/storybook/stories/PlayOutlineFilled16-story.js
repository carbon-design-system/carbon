import React from 'react';
import { storiesOf } from '@storybook/react';
import PlayOutlineFilled16 from '../../../lib/PlayOutlineFilled/16';

storiesOf('PlayOutlineFilled16', module)
  .add('default', () => <PlayOutlineFilled16 />)
  .add('with accessibility label', () => (
    <PlayOutlineFilled16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <PlayOutlineFilled16 focusable>
      <title>Icon title</title>
    </PlayOutlineFilled16>
  ));
