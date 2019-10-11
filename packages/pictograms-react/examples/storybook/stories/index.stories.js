import { Airplane } from '../../../es';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import React from 'react';

storiesOf('Icon', module)
  .add('default', () => <Airplane />)
  .add('with aria-label', () => <Airplane aria-label="Label" />)
  .add('with focus', () => <Airplane aria-label="Label" tabIndex="0" />);
