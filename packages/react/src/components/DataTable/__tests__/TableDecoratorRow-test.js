/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { Table, TableBody, TableDecoratorRow, TableRow } from '../';
import { AILabel } from '../../AILabel';

const prefix = 'cds';

const renderDecoratorRow = (props = {}) =>
  render(
    <Table>
      <TableBody>
        <TableRow>
          <TableDecoratorRow {...props} />
        </TableRow>
      </TableBody>
    </Table>
  );

describe('TableDecoratorRow', () => {
  it('should render default classes when no decorator is provided', () => {
    renderDecoratorRow();

    const cell = screen.getByRole('cell');

    expect(cell).toHaveClass(`${prefix}--table-column-decorator`, {
      exact: true,
    });
  });

  it('should support custom `className` and not render non-`AILabel` decorators', () => {
    renderDecoratorRow({
      className: 'custom-class',
      decorator: <span>Non-AI decorator</span>,
    });

    const cell = screen.getByRole('cell');

    expect(cell).toHaveClass(
      'custom-class',
      `${prefix}--table-column-decorator`,
      `${prefix}--table-column-decorator--active`,
      { exact: true }
    );
    expect(screen.queryByText('Non-AI decorator')).not.toBeInTheDocument();
  });

  it('should render `AILabel` decorators with `mini` sizing', () => {
    renderDecoratorRow({
      decorator: <AILabel size="xl" />,
    });

    const cell = screen.getByRole('cell');
    const aiLabelButton = screen.getByRole('button', {
      name: 'AI Show information',
    });

    expect(cell).toHaveClass(
      `${prefix}--table-column-decorator`,
      `${prefix}--table-column-decorator--active`,
      { exact: true }
    );
    expect(aiLabelButton).toHaveClass(
      `${prefix}--toggletip-button`,
      `${prefix}--ai-label__button`,
      `${prefix}--ai-label__button--mini`,
      `${prefix}--ai-label__button--default`,
      { exact: true }
    );
  });
});
