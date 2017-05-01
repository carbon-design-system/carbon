import React from 'react';
import { action, storiesOf } from '@kadira/storybook';
import Breadcrumb from '../../components/Breadcrumb';
import BreadcrumbItem from '../../components/BreadcrumbItem';
import OverflowMenu from '../../components/OverflowMenu';
import OverflowMenuItem from '../../components/OverflowMenuItem';
import DetailPageHeader from '../../components/DetailPageHeader';
import Tabs from '../../components/Tabs';
import Tab from '../../components/Tab';
import Icon from '../../components/Icon';

const detailPageHeaderProps = {
  title: 'Detail Page Header',
  statusText: 'Running',
};

const overflowMenuProps = {
  onClick: action('onClick'),
  className: 'some-class',
  flipped: true,
};

const overflowMenuItemProps = {
  onClick: action('onClick'),
  className: 'some-class',
};

storiesOf('DetailPageHeader', module)
  .addDecorator(story => (
    <div style={{ minWidth: '60em' }}>
      {story()}
    </div>
  ))
  .addWithInfo('without tabs', () => (
    <DetailPageHeader {...detailPageHeaderProps}>
      <Icon name="watson" />
      <Breadcrumb>
        <BreadcrumbItem href="www.google.com">Breadcrumb 1</BreadcrumbItem>
        <BreadcrumbItem href="www.google.com">Breadcrumb 2</BreadcrumbItem>
        <BreadcrumbItem href="www.google.com">Breadcrumb 3</BreadcrumbItem>
      </Breadcrumb>
      <OverflowMenu {...overflowMenuProps}>
        <OverflowMenuItem {...overflowMenuItemProps} itemText="Stop App" />
        <OverflowMenuItem {...overflowMenuItemProps} itemText="Restart App" />
        <OverflowMenuItem {...overflowMenuItemProps} itemText="Rename App" />
        <OverflowMenuItem
          {...overflowMenuItemProps}
          itemText="Edit Routes and Access"
        />
        <OverflowMenuItem
          {...overflowMenuItemProps}
          itemText="Delete App"
          isDelete
          isLastItem
        />
      </OverflowMenu>
    </DetailPageHeader>
  ))
  .addWithInfo('with tabs', () => (
    <DetailPageHeader {...detailPageHeaderProps} hasTabs>
      <Icon name="watson" />
      <Breadcrumb>
        <BreadcrumbItem href="www.google.com">Breadcrumb 1</BreadcrumbItem>
        <BreadcrumbItem href="www.google.com">Breadcrumb 2</BreadcrumbItem>
        <BreadcrumbItem href="www.google.com">Breadcrumb 3</BreadcrumbItem>
      </Breadcrumb>
      <OverflowMenu {...overflowMenuProps}>
        <OverflowMenuItem {...overflowMenuItemProps} itemText="Stop App" />
        <OverflowMenuItem {...overflowMenuItemProps} itemText="Restart App" />
        <OverflowMenuItem {...overflowMenuItemProps} itemText="Rename App" />
        <OverflowMenuItem
          {...overflowMenuItemProps}
          itemText="Edit Routes and Access"
        />
        <OverflowMenuItem
          {...overflowMenuItemProps}
          itemText="Delete App"
          isDelete
          isLastItem
        />
      </OverflowMenu>
      <Tabs>
        <Tab label="Overview" />
        <Tab label="Apple" />
        <Tab label="Banana" />
        <Tab label="Orange" />
      </Tabs>
    </DetailPageHeader>
  ));
