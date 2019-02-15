/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { action } from '@storybook/addon-actions';
import { iconDownload, iconEdit, iconSettings } from 'carbon-icons';
import Button from '../../Button';
import DataTable, {
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
  TableToolbarSearch,
} from '../../DataTable';
import Download16 from '@carbon/icons-react/lib/download/16';
import Edit16 from '@carbon/icons-react/lib/edit/16';
import Settings16 from '@carbon/icons-react/lib/settings/16';
import { initialRows, headers } from './shared';
import { componentsX } from '../../../internal/FeatureFlags';

export default () => (
  <DataTable
    rows={initialRows}
    headers={headers}
    render={({ rows, headers, getHeaderProps, getRowProps, onInputChange }) => (
      <TableContainer title="DataTable with toolbar">
        <TableToolbar>
          <TableToolbarSearch onChange={onInputChange} />
          <TableToolbarContent>
            <TableToolbarAction
              icon={componentsX ? Download16 : iconDownload}
              iconDescription="Download"
              onClick={action('TableToolbarAction - Download')}
            />
            <TableToolbarAction
              icon={componentsX ? Edit16 : iconEdit}
              iconDescription="Edit"
              onClick={action('TableToolbarAction - Edit')}
            />
            <TableToolbarAction
              icon={componentsX ? Settings16 : iconSettings}
              iconDescription="Settings"
              onClick={action('TableToolbarAction - Settings')}
            />
            <Button onClick={action('Add new row')} small kind="primary">
              Add new
            </Button>
          </TableToolbarContent>
        </TableToolbar>
        <Table>
          <TableHead>
            <TableRow>
              {headers.map(header => (
                <TableHeader {...getHeaderProps({ header })}>
                  {header.header}
                </TableHeader>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow {...getRowProps({ row })}>
                {row.cells.map(cell => (
                  <TableCell key={cell.id}>{cell.value}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )}
  />
);
