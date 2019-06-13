import { CheckmarkFilled16 } from '../../../es';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import React from 'react';

storiesOf('Icon', module)
  .add('with text', () => <CheckmarkFilled16 aria-label="yo" tabIndex="0" />)
