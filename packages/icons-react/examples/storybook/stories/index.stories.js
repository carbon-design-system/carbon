import { CheckmarkFilled32 } from '../../../es';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import React from 'react';

storiesOf('Icon', module)
  .add('default', () => <CheckmarkFilled32 />)
  .add('with aria-label', () => <CheckmarkFilled32 aria-label="Label" />)
  .add('with focus', () => <CheckmarkFilled32 aria-label="Label" tabIndex="0" />);
