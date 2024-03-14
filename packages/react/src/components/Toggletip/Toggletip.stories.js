/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Information } from '@carbon/icons-react';
import React from 'react';
import { default as Button } from '../Button';
import { default as Link } from '../Link';
import {
  ToggletipLabel,
  Toggletip,
  ToggletipButton,
  ToggletipContent,
  ToggletipActions,
} from '../Toggletip';
import mdx from './Toggletip.mdx';
import DataTable, {
  TableContainer,
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '../DataTable';

export default {
  title: 'Components/Toggletip',
  component: Toggletip,
  subcomponents: {
    ToggletipLabel,
    ToggletipButton,
    ToggletipContent,
    ToggletipActions,
  },
  argTypes: {
    as: {
      table: {
        disable: true,
      },
    },
    children: {
      table: { disable: true },
    },
    className: {
      table: {
        disable: true,
      },
    },
  },
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Default = () => {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <ToggletipLabel>Toggletip label</ToggletipLabel>
        <Toggletip>
          <ToggletipButton label="Show information">
            <Information />
          </ToggletipButton>
          <ToggletipContent>
            <p>
              Lorem ipsum dolor sit amet, di os consectetur adipiscing elit, sed
              do eiusmod tempor incididunt ut fsil labore et dolore magna
              aliqua.
            </p>
            <ToggletipActions>
              <Link href="#">Link action</Link>
              <Button size="sm">Button</Button>
            </ToggletipActions>
          </ToggletipContent>
        </Toggletip>
      </div>
      <br />
      <br />
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
        }}>
        <ToggletipLabel>
          Toggletip label -- using <code>defaultOpen</code> prop
        </ToggletipLabel>
        <Toggletip defaultOpen>
          <ToggletipButton label="Show information">
            <Information />
          </ToggletipButton>
          <ToggletipContent>
            <p>
              Lorem ipsum dolor sit amet, di os consectetur adipiscing elit, sed
              do eiusmod tempor incididunt ut fsil labore et dolore magna
              aliqua.
            </p>
            <ToggletipActions>
              <Link href="#">Link action</Link>
              <Button size="sm">Button</Button>
            </ToggletipActions>
          </ToggletipContent>
        </Toggletip>
      </div>
    </div>
  );
};

const PlaygroundStory = (controls) => {
  const { align } = controls;
  return (
    <>
      <ToggletipLabel>
        Toggletip label -- using <code>defaultOpen</code> prop
      </ToggletipLabel>
      <Toggletip align={align} defaultOpen>
        <ToggletipButton label="Show information">
          <Information />
        </ToggletipButton>
        <ToggletipContent>
          <p>
            Lorem ipsum dolor sit amet, di os consectetur adipiscing elit, sed
            do eiusmod tempor incididunt ut fsil labore et dolore magna aliqua.
          </p>
          <ToggletipActions>
            <Link href="#">Link action</Link>
            <Button size="sm">Button</Button>
          </ToggletipActions>
        </ToggletipContent>
      </Toggletip>
    </>
  );
};

export const Test = () => (
  <DataTable
    headers={[
      {
        key: 'demo',
        header: 'Demo',
      },
    ]}
    rows={[{ demo: 'Trigger' }]}>
    {({
      rows,
      headers,
      getHeaderProps,
      getRowProps,
      getTableProps,
      getTableContainerProps,
    }) => (
      <TableContainer {...getTableContainerProps()}>
        <Table {...getTableProps()}>
          <TableHead>
            <TableRow>
              {headers.map((header) => (
                <TableHeader key={1} {...getHeaderProps({ header })}>
                  {header.header}
                </TableHeader>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row} {...getRowProps({ row })}>
                {row.cells.map((cell) => (
                  <TableCell key={row}>
                    <Toggletip defaultOpen align="right">
                      <ToggletipButton>{cell.value}</ToggletipButton>
                      <ToggletipContent>
                        <p>
                          Lorem ipsum dolor{' '}
                          <Link href="www.google.com" inline>
                            sit amet
                          </Link>
                          .
                        </p>
                      </ToggletipContent>
                    </Toggletip>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )}
  </DataTable>
);

export const Playground = PlaygroundStory.bind({});

Playground.argTypes = {
  align: {
    options: [
      'top',
      'top-left',
      'top-right',

      'bottom',
      'bottom-left',
      'bottom-right',

      'left',
      'left-bottom',
      'left-top',

      'right',
      'right-bottom',
      'right-top',
    ],
    control: {
      type: 'select',
    },
  },
};

Playground.story = {
  decorators: [
    (story) => (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
        }}>
        {story()}
      </div>
    ),
  ],
};
