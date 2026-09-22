/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * ─── PATTERN RECIPE ──────────────────────────────────────────────────────────
 * This file is a copy-and-customize recipe, not a published package export.
 * Copy it into your own codebase and adapt it to your needs.
 */

import React, { useState } from 'react';
import { Search as SearchIcon } from '@carbon/icons-react';
import Button from '../../components/Button';
import { Column, Grid } from '../../components/Grid';
import {
  Content,
  Header,
  HeaderContainer,
  HeaderGlobalAction,
  HeaderGlobalBar,
  HeaderMenuButton,
  HeaderMenuItem,
  HeaderName,
  HeaderNavigation,
  SideNav,
  SideNavItems,
  SideNavLink,
  SkipToContent,
} from '../../components/UIShell';
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
  TableToolbarAction,
  TableToolbarContent,
  TableToolbarMenu,
  TableToolbarSearch,
} from '../../components/DataTable';
import { EmptyState } from '../../components/EmptyState';
import { Tile } from '../../components/Tile';
import notFoundIllustration from './assets/not-found.svg';
import unauthorizedIllustration from './assets/unauthorized.svg';
import errorIllustration from './assets/error.svg';
import './EmptyState.scss';


const TABLE_HEADERS = [
  { key: 'name', header: 'Name' },
  { key: 'protocol', header: 'Protocol' },
  { key: 'port', header: 'Port' },
  { key: 'rule', header: 'Rule' },
];

const TABLE_ROWS = [
  { id: 'a', name: 'Load Balancer 1', protocol: 'HTTP', port: 443, rule: 'Round robin' },
  { id: 'b', name: 'Load Balancer 2', protocol: 'HTTP', port: 80, rule: 'DNS delegation' },
  { id: 'c', name: 'Load Balancer 3', protocol: 'HTTP', port: 3000, rule: 'Round robin' },
];

const SIDE_NAV_LINKS = [
  'Overview',
  'Assets',
  'Monitoring',
  'Activity',
  'Configuration',
  'Access',
  'Billing',
];


export interface EmptyStateExampleProps {
  placement?: 'left' | 'centre';
}

const PageContent = ({ placement }: { placement: 'left' | 'centre' }) => {
  const isCentre = placement === 'centre';
  const [searchValue, setSearchValue] = useState('');
  const [searchKey, setSearchKey] = useState(0);

  const filteredRows = TABLE_ROWS.filter((row) => {
    const q = searchValue.trim().toLowerCase();
    if (!q) return true;
    return Object.values(row).some((v) => String(v).toLowerCase().includes(q));
  });

  const noResults = filteredRows.length === 0;

  return (
    <Content>
      <Grid withRowGap>
        {/* ── DataTable with inline empty state ───────────────────────────── */}
        <Column sm={4} md={6} lg={12}>
          <DataTable rows={filteredRows} headers={TABLE_HEADERS}>
            {({
              rows,
              headers,
              getHeaderProps,
              getRowProps,
              getTableProps,
              getToolbarProps,
              getTableContainerProps,
              getCellProps,
            }) => (
              <TableContainer
                title="Assets"
                description="Search to filter results"
                {...getTableContainerProps()}>
                <TableToolbar
                  {...getToolbarProps()}
                  aria-label="asset table toolbar">
                  <TableToolbarContent>
                    <TableToolbarSearch
                      key={searchKey}
                      onChange={(_evt: React.ChangeEvent, value?: string) =>
                        setSearchValue(value ?? '')
                      }
                      persistent
                    />
                    <TableToolbarMenu>
                      <TableToolbarAction onClick={() => {}}>
                        Action 1
                      </TableToolbarAction>
                      <TableToolbarAction onClick={() => {}}>
                        Action 2
                      </TableToolbarAction>
                    </TableToolbarMenu>
                    <Button kind="primary" onClick={() => {}}>
                      Add asset
                    </Button>
                  </TableToolbarContent>
                </TableToolbar>

                <Table {...getTableProps()} aria-label="assets table">
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
                    {!noResults &&
                      rows.map((row) => (
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

                {/* ── Empty state: no search results ────────────────────── */}
                {noResults && (
                  <div
                    className={[
                      'es-example__empty-wrap',
                      isCentre
                        ? 'es-example__empty-wrap--centre'
                        : 'es-example__empty-wrap--left',
                    ].join(' ')}>
                    <EmptyState
                      illustration={notFoundIllustration}
                      illustrationDescription="No results illustration"
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
            )}
          </DataTable>
        </Column>

        {/* ── Vertical tile (spans 2 grid rows) ──────────────────────────── */}
        <Column sm={4} md={2} lg={4} className="es-example__col--span-2">
          <Tile className="es-example__tile">
            <p className="es-example__tile-label">Label</p>
            <p className="es-example__tile-title">Title</p>
            <div
              className={[
                'es-example__tile-empty--vertical',
                isCentre ? 'es-example__tile-empty--vertical--centre' : '',
              ]
                .filter(Boolean)
                .join(' ')}>
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

        {/* ── Horizontal tiles ───────────────────────────────────────────── */}
        {([0, 1] as const).map((i) => (
          <Column key={i} sm={2} md={3} lg={6}>
            <Tile className="es-example__tile">
              <p className="es-example__tile-label">Label</p>
              <p className="es-example__tile-title">Title</p>
              <div
                className={[
                  'es-example__tile-empty--horizontal',
                  isCentre
                    ? 'es-example__tile-empty--horizontal--centre'
                    : '',
                ]
                  .filter(Boolean)
                  .join(' ')}>
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
        ))}
      </Grid>
    </Content>
  );
};

// ─── Full UI Shell layout ─────────────────────────────────────────────────────

export const EmptyStateExample = ({
  placement = 'left',
}: EmptyStateExampleProps) => (
  <HeaderContainer
    render={({
      isSideNavExpanded,
      onClickSideNavExpand,
    }: {
      isSideNavExpanded: boolean;
      onClickSideNavExpand: () => void;
    }) => (
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
              {SIDE_NAV_LINKS.map((label) => (
                <SideNavLink key={label} href="#">
                  {label}
                </SideNavLink>
              ))}
            </SideNavItems>
          </SideNav>
        </Header>
        <PageContent placement={placement} />
      </>
    )}
  />
);

export default EmptyStateExample;
