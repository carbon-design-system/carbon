import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Loading from '../../components/Loading';
import AppContainer from '../../containers/AppContainer';

const loadingProps = {
  active: true,
  className: 'some-class',
};

storiesOf('Loading', module)
  .addDecorator((story) => (
    <AppContainer>
      {story()}
    </AppContainer>
  ))
  .add('default', () => (
    <Loading {...loadingProps} />
  ));
