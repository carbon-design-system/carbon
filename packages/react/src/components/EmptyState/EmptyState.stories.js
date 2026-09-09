/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import './empty-state-story.scss';
import { Search as SearchIcon } from '@carbon/icons-react';
import {
  Content,
  Header,
  HeaderContainer,
  HeaderMenuButton,
  HeaderName,
  HeaderNavigation,
  HeaderMenuItem,
  HeaderGlobalBar,
  HeaderGlobalAction,
  SideNav,
  SideNavItems,
  SideNavLink,
  SkipToContent,
} from '../UIShell';
import { Tile } from '../Tile';
import Button from '../Button';
import { Column, Grid } from '../Grid';
import {
  DataTable,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
  TableToolbar,
  TableToolbarContent,
  TableToolbarSearch,
  TableToolbarMenu,
  TableToolbarAction,
} from '../DataTable';
import { EmptyState } from './EmptyState';
import noDataIllustration from './story-assets/no-data.svg';
import notFoundIllustration from './story-assets/not-found.svg';
import unauthorizedIllustration from './story-assets/unauthorized.svg';
import errorIllustration from './story-assets/error.svg';
import notificationIllustration from './story-assets/notification.svg';

const illustrationMap = {
  'No data': noDataIllustration,
  'Not found': notFoundIllustration,
  Unauthorized: unauthorizedIllustration,
  Error: errorIllustration,
  Notification: notificationIllustration,
};

const tableHeaders = [
  { key: 'name', header: 'Name' },
  { key: 'protocol', header: 'Protocol' },
  { key: 'port', header: 'Port' },
  { key: 'rule', header: 'Rule' },
];

const tableRows = [
  {
    id: 'a',
    name: 'Load Balancer 1',
    protocol: 'HTTP',
    port: 443,
    rule: 'Round robin',
  },
  {
    id: 'b',
    name: 'Load Balancer 2',
    protocol: 'HTTP',
    port: 80,
    rule: 'DNS delegation',
  },
  {
    id: 'c',
    name: 'Load Balancer 3',
    protocol: 'HTTP',
    port: 3000,
    rule: 'Round robin',
  },
];

const sideNavLinks = [
  'Overview',
  'Assets',
  'Monitoring',
  'Activity',
  'Configuration',
  'Access',
  'Billing',
];

// ─── Inner page content — owns search state so HeaderContainer never remounts it ──
const UIShellContent = ({ placement }) => {
  const isCentre = placement === 'centre';
  const placementMod = isCentre ? '--centre' : '--left';
  const [searchValue, setSearchValue] = useState('');
  const [searchKey, setSearchKey] = useState(0);

  const filteredRows = tableRows.filter((row) => {
    const q = searchValue.trim().toLowerCase();
    if (!q) return true;
    return Object.values(row).some((v) => String(v).toLowerCase().includes(q));
  });

  return (
    <Content>
      <Grid withRowGap>
        {/* DataTable  */}
        <Column sm={4} md={6} lg={12}>
          <DataTable rows={filteredRows} headers={tableHeaders}>
            {({
              rows,
              headers,
              getHeaderProps,
              getRowProps,
              getTableProps,
              getToolbarProps,
              getTableContainerProps,
              getCellProps,
            }) => {
              const showEmptyState = filteredRows.length === 0;
              return (
                <TableContainer
                  title="DataTable"
                  description="With toolbar"
                  {...getTableContainerProps()}>
                  <TableToolbar
                    {...getToolbarProps()}
                    aria-label="data table toolbar">
                    <TableToolbarContent>
                      <TableToolbarSearch
                        key={searchKey}
                        onChange={(_evt, value) => setSearchValue(value ?? '')}
                        persistent
                      />
                      <TableToolbarMenu>
                        <TableToolbarAction onClick={() => {}}>
                          Action 1
                        </TableToolbarAction>
                        <TableToolbarAction onClick={() => {}}>
                          Action 2
                        </TableToolbarAction>
                        <TableToolbarAction onClick={() => {}}>
                          Action 3
                        </TableToolbarAction>
                      </TableToolbarMenu>
                      <Button kind="primary" onClick={() => {}}>
                        Add asset
                      </Button>
                    </TableToolbarContent>
                  </TableToolbar>
                  <Table {...getTableProps()} aria-label="sample table">
                    <TableHead>
                      <TableRow>
                        {headers.map((header) => (
                          <TableHeader
                            key={header.key}
                            {...getHeaderProps({ header })}>
                            {header.header}
                          </TableHeader>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {showEmptyState
                        ? null
                        : rows.map((row) => (
                            <TableRow key={row.id} {...getRowProps({ row })}>
                              {row.cells.map((cell) => (
                                <TableCell
                                  key={cell.id}
                                  {...getCellProps({ cell })}>
                                  {cell.value}
                                </TableCell>
                              ))}
                            </TableRow>
                          ))}
                    </TableBody>
                  </Table>
                  {showEmptyState && (
                    <div
                      className={`es-story__empty-wrap es-story__empty-wrap${placementMod}`}>
                      <EmptyState
                        illustration={notFoundIllustration}
                        illustrationDescription="Not found illustration"
                        title="No results match the current search"
                        subtitle="Clear the search field to see all results, or try a different search term."
                        action={{
                          text: 'Clear search',
                          kind: 'tertiary',
                          onClick: () => {
                            setSearchValue('');
                            setSearchKey((k) => k + 1);
                          },
                        }}
                      />
                    </div>
                  )}
                </TableContainer>
              );
            }}
          </DataTable>
        </Column>

        {/* Right-hand tile */}
        <Column sm={4} md={2} lg={4} className="es-story__col--span-2">
          <Tile className="es-story__tile">
            <p className="es-story__tile-label">Label</p>
            <p className="es-story__tile-title">Title</p>
            <div
              className={`es-story__tile-empty--vertical${isCentre ? ' es-story__tile-empty--vertical--centre' : ''}`}>
              <EmptyState
                size="sm"
                illustration={errorIllustration}
                illustrationDescription="Error illustration"
                title="This insight is unavailable"
                subtitle="Try loading the page once again after adding an asset."
                link={{
                  text: 'Learn more',
                  href: 'https://carbondesignsystem.com/patterns/empty-states-pattern/',
                }}
              />
            </div>
          </Tile>
        </Column>

        {/* Bottom tiles */}
        <Column sm={2} md={3} lg={6}>
          <Tile className="es-story__tile">
            <p className="es-story__tile-label">Label</p>
            <p className="es-story__tile-title">Title</p>
            <div
              className={`es-story__tile-empty--horizontal${isCentre ? ' es-story__tile-empty--horizontal--centre' : ''}`}>
              <EmptyState
                size="sm"
                illustration={unauthorizedIllustration}
                illustrationDescription="Unauthorized illustration"
                title="You do not have access"
                subtitle="Unlock product insights by requesting view access from your admin."
                action={{
                  text: 'Request access',
                  kind: 'tertiary',
                  onClick: () => {},
                }}
              />
            </div>
          </Tile>
        </Column>
        <Column sm={2} md={3} lg={6}>
          <Tile className="es-story__tile">
            <p className="es-story__tile-label">Label</p>
            <p className="es-story__tile-title">Title</p>
            <div
              className={`es-story__tile-empty--horizontal${isCentre ? ' es-story__tile-empty--horizontal--centre' : ''}`}>
              <EmptyState
                size="sm"
                illustration={unauthorizedIllustration}
                illustrationDescription="Unauthorized illustration"
                title="You do not have access"
                subtitle="Unlock product insights by requesting view access from your admin."
                action={{
                  text: 'Request access',
                  kind: 'tertiary',
                  onClick: () => {},
                }}
              />
            </div>
          </Tile>
        </Column>
      </Grid>
    </Content>
  );
};

// ─── UI Shell layout ─────────────────────────────────────────────────────────
const UIShellLayout = ({ placement = 'left' }) => (
  <HeaderContainer
    render={({ isSideNavExpanded, onClickSideNavExpand }) => (
      <>
        <Header aria-label="IBM Platform">
          <SkipToContent />
          <HeaderMenuButton
            aria-label={isSideNavExpanded ? 'Close menu' : 'Open menu'}
            onClick={onClickSideNavExpand}
            isActive={isSideNavExpanded}
          />
          <HeaderName href="#" prefix="IBM">
            [Platform]
          </HeaderName>
          <HeaderNavigation aria-label="IBM Platform">
            <HeaderMenuItem href="#">Link</HeaderMenuItem>
            <HeaderMenuItem href="#">Link</HeaderMenuItem>
            <HeaderMenuItem href="#">Link</HeaderMenuItem>
            <HeaderMenuItem href="#">Link</HeaderMenuItem>
          </HeaderNavigation>
          <HeaderGlobalBar>
            <HeaderGlobalAction aria-label="Search" onClick={() => {}}>
              <SearchIcon size={20} />
            </HeaderGlobalAction>
          </HeaderGlobalBar>
          <SideNav
            aria-label="Side navigation"
            expanded={isSideNavExpanded}
            isPersistent={false}>
            <SideNavItems>
              {sideNavLinks.map((label) => (
                <SideNavLink key={label} href="#">
                  {label}
                </SideNavLink>
              ))}
            </SideNavItems>
          </SideNav>
        </Header>
        <UIShellContent placement={placement} />
      </>
    )}
  />
);

export default {
  title: 'Examples/EmptyState',
  component: EmptyState,
  parameters: {
    layout: 'fullscreen',
  },
};

export const EmptyStateUnit = ({ illustrationKey, ...args }) => (
  <EmptyState
    {...args}
    illustration={illustrationMap[illustrationKey]}
    illustrationDescription={illustrationKey + ' pictogram'}
  />
);
EmptyStateUnit.storyName = 'Empty state unit';
EmptyStateUnit.parameters = { layout: 'padded' };
EmptyStateUnit.args = {
  illustrationKey: 'No data',
  size: 'md',
  title: 'Get started by adding an asset',
  subtitle:
    'Unlock product insights by adding assets from your system or cloud environment.',
  action: {
    text: 'Add asset',
    kind: 'primary',
  },
  link: {
    text: 'Learn more',
    href: 'https://carbondesignsystem.com/patterns/empty-states-pattern/',
  },
};
EmptyStateUnit.argTypes = {
  illustrationKey: {
    name: 'illustration type',
    description: 'Isometric illustration to display.',
    control: { type: 'select' },
    options: Object.keys(illustrationMap),
  },
  illustration: { table: { disable: true } },
  illustrationDescription: { table: { disable: true } },
  className: { table: { disable: true } },
};

export const EmptyStateInUI = ({ placement }) => (
  <UIShellLayout placement={placement} />
);
EmptyStateInUI.storyName = 'Empty state in a UI';
EmptyStateInUI.args = { placement: 'left' };
EmptyStateInUI.argTypes = {
  // surface only placement, hide all EmptyState component props
  placement: {
    control: { type: 'radio' },
    options: ['left', 'centre'],
    description:
      'Alignment of every empty state relative to its own container.',
  },
  size: { table: { disable: true } },
  align: { table: { disable: true } },
  action: { table: { disable: true } },
  link: { table: { disable: true } },
  illustration: { table: { disable: true } },
  illustrationDescription: { table: { disable: true } },
  title: { table: { disable: true } },
  subtitle: { table: { disable: true } },
  className: { table: { disable: true } },
};
