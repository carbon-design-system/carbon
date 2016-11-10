import React from 'react';
import { action, storiesOf } from '@kadira/storybook';
import centered from '@kadira/react-storybook-decorator-centered';
import DetailPageHeader from '../../components/DetailPageHeader';
import Tabs from '../../components/Tabs';
import Tab from '../../components/Tab';
import AppContainer from '../../containers/AppContainer';

storiesOf('DetailPageHeader', module)
  .addDecorator((story) => (
    <AppContainer>
      <div style={{ 'min-width': '60em' }}>
        {story()}
      </div>
    </AppContainer>
  ))
  .addWithInfo('without tabs', () => (
    <DetailPageHeader
      onBackLinkClick={action('backLinkClick')}
      title="Detail Page Header"
    />
  ))
  .addWithInfo('with tabs', () => (
    <DetailPageHeader
      onBackLinkClick={action('backLinkClick')}
      title="Detail Page Header"
      breadcrumbTitle="Go back"
    >
      <Tabs>
        <Tab label="Overview" />
        <Tab label="Apple" />
        <Tab label="Banana" />
        <Tab label="Orange" />
      </Tabs>
    </DetailPageHeader>
  ));
