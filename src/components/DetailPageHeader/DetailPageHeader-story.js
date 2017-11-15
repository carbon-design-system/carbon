import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Breadcrumb from '../Breadcrumb';
import BreadcrumbItem from '../BreadcrumbItem';
import OverflowMenu from '../OverflowMenu';
import OverflowMenuItem from '../OverflowMenuItem';
import DetailPageHeader from '../DetailPageHeader';
import Tabs from '../Tabs';
import Tab from '../Tab';
import Icon from '../Icon';

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
  .addDecorator(story => <div style={{ minWidth: '60em' }}>{story()}</div>)
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
