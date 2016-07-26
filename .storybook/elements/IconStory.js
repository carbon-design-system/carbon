import React from 'react';
import classNames from 'classnames';
import { storiesOf, action } from '@kadira/storybook';
import Icon from '../../elements/Icon';
import AppContainer from '../../containers/AppContainer';

storiesOf('Icon', module)
  .addDecorator((story) => (
    <AppContainer>
      {story()}
    </AppContainer>
  ))
  .add('default', () => (
    <Icon
      name="search"
      fill="red"
      description="search microservices"
    />
  ))
