import React from 'react';
import { storiesOf } from '@kadira/storybook';
import centered from '@kadira/react-storybook-decorator-centered';
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
  .addDecorator(centered)
  .add('default', () => (
    <Loading {...loadingProps} />
  ));
