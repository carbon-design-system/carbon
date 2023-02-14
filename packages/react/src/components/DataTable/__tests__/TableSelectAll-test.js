/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// import React from 'react';
// import { mount } from 'enzyme';
// import { Table, TableHead, TableRow, TableSelectAll } from '../';

// describe('DataTable.TableSelectAll', () => {
//   let mockProps;

//   beforeEach(() => {
//     mockProps = {
//       id: 'id',
//       name: 'select-all',
//       checked: false,
//       onSelect: jest.fn(),
//       className: 'custom-class-name',
//     };
//   });

//   it('should render', () => {
//     const wrapper = mount(
//       <Table>
//         <TableHead>
//           <TableRow>
//             <TableSelectAll {...mockProps} />
//           </TableRow>
//         </TableHead>
//       </Table>
//     );
//     expect(wrapper).toMatchSnapshot();
//   });

//   it('should render with the provided class name', () => {
//     const customClassName = 'custom-table-select-all-classname';
//     const wrapper = mount(
//       <Table>
//         <TableHead>
//           <TableRow>
//             <TableSelectAll {...mockProps} className={customClassName} />
//           </TableRow>
//         </TableHead>
//       </Table>
//     );
//     const elements = wrapper.find(`th.${customClassName}`);
//     expect(elements.length).toBe(1);
//   });

//   it('should invoke `onSelect` when clicked', () => {
//     const wrapper = mount(
//       <Table>
//         <TableHead>
//           <TableRow>
//             <TableSelectAll {...mockProps} />
//           </TableRow>
//         </TableHead>
//       </Table>
//     );
//     wrapper.find('input').simulate('click');
//     expect(mockProps.onSelect).toHaveBeenCalledTimes(1);
//   });
// });

/**
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { Table, TableHead, TableRow, TableSelectAll } from '../';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

const prefix = 'cds';

describe('TableSelectAll', () => {
  describe('renders as expected - Component API', () => {
    it('should render with the correct classes', () => {
      render(
        <Table>
          <TableHead>
            <TableRow>
              <TableSelectAll
                ariaLabel="select all"
                checked={false}
                id="select-all"
                name="select-all"
                onSelect={() => {}}
                data-testid="test-id"
              />
            </TableRow>
          </TableHead>
        </Table>
      );

      expect(screen.getByRole('columnheader')).toHaveClass(
        `${prefix}--table-column-checkbox`
      );
      expect(screen.getByRole('columnheader').firstChild).toHaveClass(
        `${prefix}--checkbox--inline`
      );
    });

    // it('should respect ariaLabel prop', () => {
    //   render(<TableSelectAll ariaLabel />);

    //   expect();
    // });

    // it('should respect checked prop', () => {
    //   render(<TableSelectAll checked />);

    //   expect();
    // });

    // it('should support a custom `className` prop on the outermost element', () => {
    //   const { container } = render(<TableSelectAll className="custom-class" />);

    //   expect(container.firstChild).toHaveClass('custom-class');
    // });

    // it('should respect disabled prop', () => {
    //   render(<TableSelectAll disabled />);

    //   expect();
    // });

    // it('should respect id prop', () => {
    //   render(<TableSelectAll id />);

    //   expect();
    // });

    // it('should respect indeterminate prop', () => {
    //   render(<TableSelectAll indeterminate />);

    //   expect();
    // });

    // it('should respect name prop', () => {
    //   render(<TableSelectAll name />);

    //   expect();
    // });

    // it('should respect onSelect prop', () => {
    //   render(<TableSelectAll onSelect />);

    //   expect();
    // });
  });

  describe('behaves as expected', () => {
    // Add tests for relevant component behavior. For more information, visit https://github.com/carbon-design-system/carbon/issues/10184#issuecomment-992978122
  });
});
