import Menu from '../../../next/Menu';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import React from 'react';

storiesOf('Icon', module)
  .add('default', () => <Menu />)
  .add('with aria-label', () => <Menu aria-label="Label" />)
  .add('with focus', () => <Menu aria-label="Label" tabIndex="0" />);
