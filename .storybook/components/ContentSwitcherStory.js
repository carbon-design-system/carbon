import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import centered from '@kadira/react-storybook-decorator-centered';
import ContentSwitcher from '../../components/ContentSwitcher';
import Switch from '../../components/Switch';
import AppContainer from '../../containers/AppContainer';

storiesOf('ContentSwitcher', module)
  .addDecorator((story) => (
    <AppContainer>
      {story()}
    </AppContainer>
  ))
  .addDecorator(centered)
  .add('default', () => (
    <ContentSwitcher onChange={action('onChange')}>
      <Switch kind="anchor" name="one" text='First section' />
      <Switch kind="anchor" name="two" text='Second section' />
      <Switch kind="anchor" name="three" text='Third section' />
    </ContentSwitcher>
  ));
