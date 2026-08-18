/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
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

// ─── Pictograms (inlined SVG) ────────────────────────────────────────────────

// visual--inspection.svg
const VisualInspectionPictogram = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    aria-hidden="true"
    focusable="false"
    {...props}>
    <path d="M16,26.3604c-6.8062,0-12.1055-3.5283-15.3242-10.2041-.0479-.0986-.0479-.2139,0-.3125,3.2188-6.6753,8.5181-10.2036,15.3242-10.2036s12.1064,3.5283,15.3242,10.2036l-.6484.3125c-3.1338-6.5005-8.0713-9.7964-14.6758-9.7964-6.5503,0-11.4614,3.2432-14.5996,9.6401,3.1382,6.3965,8.0493,9.6396,14.5996,9.6396v.7207ZM23.7451,24.2549l-4.2197-4.2207c-.9434.8252-2.1768,1.3262-3.5254,1.3262-2.9556,0-5.3599-2.4053-5.3599-5.3604s2.4043-5.3599,5.3599-5.3599,5.3604,2.4043,5.3604,5.3599c0,1.3486-.501,2.582-1.3262,3.5254l4.2207,4.2197-.5098.5098ZM16,11.3599c-2.5586,0-4.6401,2.0815-4.6401,4.6401s2.0815,4.6396,4.6401,4.6396,4.6396-2.0811,4.6396-4.6396-2.0811-4.6401-4.6396-4.6401Z" />
    <rect style={{ fill: 'none' }} width="32" height="32" />
  </svg>
);

// container.svg
const ContainerPictogram = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    aria-hidden="true"
    focusable="false"
    {...props}>
    <path d="M16,31.36c-0.059,0-0.117-0.015-0.171-0.043l-13-7C2.713,24.254,2.64,24.133,2.64,24V8c0-0.132,0.073-0.254,0.189-0.317l13-7c0.107-0.058,0.234-0.058,0.342,0l13,7C29.287,7.746,29.36,7.868,29.36,8v16c0,0.133-0.073,0.254-0.189,0.317l-13,7C16.117,31.346,16.059,31.36,16,31.36z M16.36,15.215v15.183l12.28-6.612V8.603L16.36,15.215z M3.36,23.785l12.28,6.612V15.215L3.36,8.603V23.785z M3.759,8L16,14.591L28.24,8L16,1.409L3.759,8z" />
    <rect style={{ fill: 'none' }} width="32" height="32" />
  </svg>
);

// lock--02.svg
const LockPictogram = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    aria-hidden="true"
    focusable="false"
    {...props}>
    <path d="M17.5,21.5c0,0.704-0.487,1.29-1.14,1.452V25c0,0.199-0.161,0.36-0.36,0.36s-0.36-0.161-0.36-0.36v-2.048c-0.654-0.162-1.14-0.748-1.14-1.452c0-0.828,0.672-1.5,1.5-1.5C16.828,20,17.5,20.672,17.5,21.5z M26.355,13v18c0,0.196-0.159,0.355-0.355,0.355H6c-0.196,0-0.355-0.159-0.355-0.355V13c0-0.196,0.159-0.355,0.355-0.355h4.64V6c0-2.956,2.404-5.36,5.36-5.36c2.955,0,5.36,2.404,5.36,5.36v6.645H26C26.196,12.645,26.355,12.804,26.355,13z M11.359,12.645h9.28V6c0-2.559-2.081-4.64-4.64-4.64S11.36,3.441,11.36,6L11.359,12.645z M6.355,13.355v17.289h19.289V13.355H6.355z" />
    <rect style={{ fill: 'none' }} width="32" height="32" />
  </svg>
);

// refresh.svg
const RefreshPictogram = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    aria-hidden="true"
    focusable="false"
    {...props}>
    <path d="M28,31.36H4c-1.301,0-2.36-1.059-2.36-2.36V16h0.72v13c0,0.904,0.736,1.64,1.64,1.64h24c0.904,0,1.64-0.735,1.64-1.64V9c0-0.904-0.735-1.64-1.64-1.64H7.869l5.385,5.386l-0.509,0.509L6.491,7l6.255-6.254l0.509,0.509L7.869,6.64H28c1.302,0,2.36,1.059,2.36,2.36v20C30.36,30.302,29.302,31.36,28,31.36z" />
    <rect style={{ fill: 'none' }} width="32" height="32" />
  </svg>
);

// ─── Data (3 rows only — keeps story compact) ────────────────────────────────

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

// ─── UI Shell layout ─────────────────────────────────────────────────────────
const UIShellLayout = ({ placement = 'left' }) => {
  const isCentre = placement === 'centre';
  const centreWrapStyle = {
    display: 'flex',
    justifyContent: isCentre ? 'center' : 'flex-start',
    padding: '2rem 1rem',
    backgroundColor: 'var(--cds-layer)',
  };
  const tileHWrapStyle = {
    width: '100%',
    display: 'flex',
    justifyContent: isCentre ? 'center' : 'flex-start',
  };
  const tileVWrapStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: isCentre ? 'center' : 'flex-start',
  };

  return (
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

          <Content>
            <Grid>
              <Column sm={4} md={6} lg={12}>
                <DataTable rows={tableRows} headers={tableHeaders}>
                  {({
                    rows,
                    headers,
                    getHeaderProps,
                    getRowProps,
                    getTableProps,
                    getToolbarProps,
                    getTableContainerProps,
                    onInputChange,
                    getCellProps,
                  }) => {
                    const showEmptyState = rows.length === 0;
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
                              onChange={(evt) => onInputChange(evt)}
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
                                  <TableRow
                                    key={row.id}
                                    {...getRowProps({ row })}>
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
                          <div style={centreWrapStyle}>
                            <EmptyState
                              illustration={VisualInspectionPictogram}
                              illustrationDescription="Visual inspection pictogram"
                              title="No results match the current search"
                              subtitle="Clear the search field to see all results, or try a different search term."
                              action={{
                                text: 'Clear search',
                                kind: 'tertiary',
                                onClick: () =>
                                  onInputChange({ target: { value: '' } }),
                              }}
                            />
                          </div>
                        )}
                      </TableContainer>
                    );
                  }}
                </DataTable>

                {/* Bottom tiles */}
                <Grid style={{ marginTop: '1rem' }}>
                  <Column sm={2} md={3} lg={6}>
                    <Tile
                      style={{
                        padding: '1rem',
                        display: 'flex',
                        flexDirection: 'column',
                      }}>
                      <p
                        style={{
                          fontSize: '0.75rem',
                          marginBottom: '0.25rem',
                          color: '#525252',
                        }}>
                        Label
                      </p>
                      <p style={{ fontWeight: 600, marginBottom: '1rem' }}>
                        Title
                      </p>
                      <div style={tileHWrapStyle}>
                        <EmptyState
                          size="sm"
                          illustration={LockPictogram}
                          illustrationDescription="Lock pictogram"
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
                    <Tile
                      style={{
                        padding: '1rem',
                        display: 'flex',
                        flexDirection: 'column',
                      }}>
                      <p
                        style={{
                          fontSize: '0.75rem',
                          marginBottom: '0.25rem',
                          color: '#525252',
                        }}>
                        Label
                      </p>
                      <p style={{ fontWeight: 600, marginBottom: '1rem' }}>
                        Title
                      </p>
                      <div style={tileHWrapStyle}>
                        <EmptyState
                          size="sm"
                          illustration={LockPictogram}
                          illustrationDescription="Lock pictogram"
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
              </Column>

              {/* Right-hand tile */}
              <Column
                sm={4}
                md={2}
                lg={4}
                style={{ display: 'flex', flexDirection: 'column' }}>
                <Tile
                  style={{
                    padding: '1rem',
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                  }}>
                  <p
                    style={{
                      fontSize: '0.75rem',
                      marginBottom: '0.25rem',
                      color: '#525252',
                    }}>
                    Label
                  </p>
                  <p style={{ fontWeight: 600, marginBottom: '1rem' }}>Title</p>
                  <div style={tileVWrapStyle}>
                    <EmptyState
                      size="sm"
                      illustration={RefreshPictogram}
                      illustrationDescription="Refresh pictogram"
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
            </Grid>
          </Content>
        </>
      )}
    />
  );
};

// ─── Story config ─────────────────────────────────────────────────────────────

export default {
  title: 'Examples/EmptyState',
  component: EmptyState,
  parameters: {
    layout: 'fullscreen',
  },
};

// ─── Story: unit ──────────────────────────────────────────────────────────────
// All EmptyState props are surfaced as Storybook controls automatically via
// component: EmptyState above. Hardcode only content/illustration defaults.

export const EmptyStateUnit = (args) => (
  <EmptyState
    {...args}
    illustration={ContainerPictogram}
    illustrationDescription="Container pictogram"
  />
);
EmptyStateUnit.storyName = 'Empty state unit';
EmptyStateUnit.parameters = { layout: 'padded' };
EmptyStateUnit.args = {
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
  headingAs: { table: { disable: true } },
  className: { table: { disable: true } },
};

// ─── Story: in a UI ───────────────────────────────────────────────────────────
// Only the placement control is relevant here.

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
  headingAs: { table: { disable: true } },
  className: { table: { disable: true } },
};
