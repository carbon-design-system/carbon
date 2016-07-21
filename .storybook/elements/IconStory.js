import React from 'react';
import classNames from 'classnames';
import { storiesOf, action } from '@kadira/storybook';
import Icon from '../../elements/Icon';
import AppContainer from '../../containers/AppContainer';

const iconProps = {
  className: 'some-class',
}

storiesOf('Icon', module)
  .addDecorator((story) => (
    <AppContainer>
      {story()}
    </AppContainer>
  ))
  .add('default', () => (
    <Icon name="copy-code" / >
  ))
