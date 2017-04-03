import React from 'react';
import { action, storiesOf } from '@kadira/storybook';
import DetailPageHeader from '../../components/DetailPageHeader';
import Tabs from '../../components/Tabs';
import Tab from '../../components/Tab';

const inlineContent = (
  <div style={{ marginLeft: '50px' }}>
    <span>Status:</span>
    <span style={{ marginLeft: '5px' }}>Available</span>
  </div>
);
storiesOf('DetailPageHeader', module)
  .addDecorator((story) => (
    <div style={{ minWidth: '60em' }}>
      {story()}
    </div>
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
  ))
  .addWithInfo('with tabs and inline content', () => (
    <DetailPageHeader
      onBackLinkClick={action('backLinkClick')}
      title="Detail Page Header"
      breadcrumbTitle="Go back"
      inlineContent={inlineContent}
    >
      <Tabs>
        <Tab label="Overview" />
        <Tab label="Apple" />
        <Tab label="Banana" />
        <Tab label="Orange" />
      </Tabs>
    </DetailPageHeader>
  ));
