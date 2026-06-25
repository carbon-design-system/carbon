/**
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render, screen } from '@testing-library/react';
import React from 'react';

import { ProductiveCard } from '.';
import { Edit } from '@carbon/react/icons';

const componentName = ProductiveCard.displayName;

describe(componentName, () => {
  it('renders', async () => {
    render(<ProductiveCard />);
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<ProductiveCard />);
    expect(container).toBeAccessible(componentName);
    expect(container).toHaveNoAxeViolations();
  });

  it('applies className to the containing node', async () => {
    const { container } = render(<ProductiveCard className="test-class" />);
    expect(container.firstChild).toHaveClass('test-class');
  });

  const dataTestId = 'data-testid';

  it('adds additional properties to the containing node', async () => {
    render(<ProductiveCard data-testid={dataTestId} />);
    screen.getByTestId(dataTestId);
  });

  it('forwards a ref to an appropriate node', async () => {
    const ref = React.createRef();
    render(<ProductiveCard ref={ref} />);
    expect(ref.current).not.toBeNull();
  });

  it('adds the Devtools attribute to the containing node', async () => {
    const tmpActionIconClassName = 'tmpActionIconClassName';
    const tmpActionIconTestId = 'tmpActionIconTestId';
    render(<ProductiveCard data-testid={dataTestId} />);

    expect(screen.getByTestId(dataTestId)).toHaveDevtoolsAttribute(
      componentName
    );
  });

  it('renders Productive card with action icons', async () => {
    const tmpActionIconClassName = 'tmpActionIconClassName';
    const tmpActionIconTestId = 'tmpActionIconTestId';
    const onClick = jest.fn();
    const actionIcons = [
      {
        id: '1',
        onClick,
        className: tmpActionIconClassName,
        icon: Edit,
        iconDescription: 'Edit',
        'data-testid': tmpActionIconTestId,
      },
    ];
    const props = {
      actionIcons,
    };
    render(<ProductiveCard data-testid={dataTestId} {...props} />);
    expect(screen.getByTestId(tmpActionIconTestId)).toHaveClass(
      tmpActionIconClassName
    );
  });
  it('renders Productive card with children', async () => {
    const tmpChildClassName = 'tmpChildClassName';
    const tmpChildTestId = 'tmpChildTestId';

    render(
      <ProductiveCard data-testid={dataTestId}>
        <div data-testid={tmpChildTestId} className={tmpChildClassName}>
          Hello world
        </div>
      </ProductiveCard>
    );
    expect(screen.getByTestId(tmpChildTestId)).toHaveClass(tmpChildClassName);
  });
});
