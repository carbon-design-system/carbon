/**
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';

import uuidv4 from './uuidv4';

import { Wrap } from './Wrap';

const componentName = Wrap.displayName;

const nonemptyContent = `hello, world, ${uuidv4()}`;
const emptyContent = '';
const className = `class-${uuidv4()}`;
const dataTestId = uuidv4();

describe(componentName, () => {
  it('renders non-empty content and passes through a ref', async () => {
    const ref = React.createRef();
    render(<Wrap {...{ className, ref }}>{nonemptyContent}</Wrap>);
    screen.getByText(nonemptyContent);
    expect(ref.current).toHaveClass(className);
  });

  it('adds additional properties to the containing node', async () => {
    render(<Wrap data-testid={dataTestId}>{nonemptyContent}</Wrap>);
    screen.getByTestId(dataTestId);
  });

  it("doesn't render empty content", async () => {
    const ref = React.createRef();
    render(<Wrap ref={ref}>{emptyContent}</Wrap>);
    expect(ref.current).toBeNull();
  });

  it('renders recursive non-empty content', async () => {
    const ref = React.createRef();
    render(
      <Wrap ref={ref}>
        <Wrap>{nonemptyContent}</Wrap>
      </Wrap>
    );
    screen.getByText(nonemptyContent);
    expect(ref.current).not.toBeNull();
  });

  it("doesn't render recursive empty content", async () => {
    const ref = React.createRef();
    render(
      <Wrap ref={ref}>
        <Wrap>{emptyContent}</Wrap>
      </Wrap>
    );
    expect(ref.current).toBeNull();
  });

  const renderHierarchy = (props, results) => {
    const refs = results.map(() => React.createRef());
    render(
      <Wrap {...props} ref={refs[0]}>
        <Wrap {...props} ref={refs[1]}>
          <Wrap {...props} ref={refs[2]}>
            {emptyContent}
          </Wrap>
          <div></div>
        </Wrap>
        <Wrap {...props} ref={refs[3]}>
          <Wrap {...props} ref={refs[4]}>
            {emptyContent}
          </Wrap>
          <Wrap {...props} ref={refs[5]}>
            <Wrap {...props} ref={refs[6]}>
              {emptyContent}
            </Wrap>
          </Wrap>
        </Wrap>
        <Wrap {...props} ref={refs[7]}>
          <Wrap {...props} ref={refs[8]}>
            <div></div>
          </Wrap>
        </Wrap>
      </Wrap>
    );
    refs.forEach((ref, i) =>
      results[i]
        ? expect(ref.current).not.toBeNull()
        : expect(ref.current).toBeNull()
    );
  };

  it('render recursive content only where non-empty', async () => {
    renderHierarchy({}, [
      true,
      true,
      false,
      false,
      false,
      false,
      false,
      true,
      true,
    ]);
  });

  it('responds to alwaysRender', async () => {
    renderHierarchy({ alwaysRender: true }, [
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
    ]);
  });
  it('responds to neverRender', async () => {
    renderHierarchy({ neverRender: true }, [
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
    ]);
  });
});
