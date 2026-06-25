/**
 * Copyright IBM Corp. 2024, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { render, screen } from '@testing-library/react'; // https://testing-library.com/docs/react-testing-library/intro

import { pkg } from '../../settings';
import uuidv4 from '../../global/js/utils/uuidv4';

import {
  DescriptionList,
  DescriptionListBody,
  DescriptionListRow,
  DescriptionListCell,
} from '.';

const blockClass = `${pkg.prefix}--description-list`;
const bodyBlockClass = `${blockClass}__body`;
const componentName = DescriptionList.displayName;

// values to use
const className = `class-${uuidv4()}`;
const dataTestId = uuidv4();
const childDataTestId = `child-element-${uuidv4()}`;

// cSpell:dictionaries lorem-ipsum
const childrenContent = (
  <DescriptionListBody data-testid={childDataTestId}>
    <DescriptionListRow>
      <DescriptionListCell>Term 1</DescriptionListCell>

      <DescriptionListCell>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </DescriptionListCell>
    </DescriptionListRow>

    <DescriptionListRow>
      <DescriptionListCell>Term 2</DescriptionListCell>

      <DescriptionListCell>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
        accumsan, dui ut pulvinar mattis, diam est imperdiet ex, a varius lacus
        ex at libero. Aenean euismod viverra odio, id volutpat turpis commodo.
      </DescriptionListCell>
    </DescriptionListRow>

    <DescriptionListRow>
      <DescriptionListCell>Term 3</DescriptionListCell>

      <DescriptionListCell>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
        accumsan, dui ut pulvinar mattis, diam est imperdiet ex, a varius lacus
        ex at libero.
      </DescriptionListCell>
    </DescriptionListRow>
  </DescriptionListBody>
);

const renderComponent = ({ ...rest } = {}, children = childrenContent) =>
  render(<DescriptionList {...rest}>{children}</DescriptionList>);

describe(componentName, () => {
  beforeEach(() => {
    jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  it('renders a component DescriptionList', async () => {
    renderComponent({ 'data-testid': dataTestId });
    expect(screen.getByTestId(dataTestId)).toHaveClass(blockClass);
  });

  it('has no accessibility violations', async () => {
    const { container } = renderComponent();
    expect(container).toBeAccessible(componentName);
    expect(container).toHaveNoAxeViolations();
  });

  it(`renders children`, async () => {
    renderComponent({ children: childrenContent });
    expect(screen.getByTestId(childDataTestId)).toHaveClass(bodyBlockClass);
  });

  it('applies className to the containing node', async () => {
    renderComponent({
      className,
      'data-testid': dataTestId,
    });
    expect(screen.getByTestId(dataTestId)).toHaveClass(className);
  });

  it('adds additional props to the containing node', async () => {
    renderComponent({
      'data-testid': dataTestId,
    });
    screen.getByTestId(dataTestId);
  });

  it('forwards a ref to an appropriate node', async () => {
    const ref = React.createRef();
    renderComponent({ ref });
    expect(ref.current).toHaveClass(blockClass);
  });

  it('adds the Devtools attribute to the containing node', async () => {
    renderComponent({
      'data-testid': dataTestId,
    });
    expect(screen.getByTestId(dataTestId)).toHaveDevtoolsAttribute(
      componentName
    );
  });
});
