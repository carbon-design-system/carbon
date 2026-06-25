/**
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import { fireEvent, render, screen, act } from '@testing-library/react';
import { BreadcrumbWithOverflow } from '.';
import { mockHTMLElement } from '../../global/js/utils/test-helper';

import uuidv4 from '../../global/js/utils/uuidv4';
import { pkg, carbon } from '../../settings';

const dataTestId = uuidv4();
const blockClass = `${pkg.prefix}--breadcrumb-with-overflow`;

const breadcrumbContent = Array.from(
  { length: 5 },
  (_, index) => `Breadcrumb ${index + 1}`
);
const myOnClick = jest.fn();
const breadcrumbItems = breadcrumbContent.map((item) => ({
  href: '/#',
  id: `id-${item.replace(' ', '_')}`,
  key: item,
  label: item,
  onClick: myOnClick,
}));

const sizes = {
  breadcrumbWidth: 200,
  breadcrumbHeight: 40,
  breadcrumbMargin: 10,
};

const isBreadCrumbItem = function () {
  return this.classList?.contains(`${carbon.prefix}--breadcrumb-item`) || false;
};

// eslint-disable-next-line react/prop-types
const TestBreadcrumbWithOverflow = ({ width, ...rest }) => {
  return (
    <div style={{ width, height: 40 }}>
      <BreadcrumbWithOverflow className="fish" {...rest} />
    </div>
  );
};

describe(BreadcrumbWithOverflow.displayName, () => {
  let mockElement;

  beforeEach(() => {
    mockElement = mockHTMLElement({
      marginLeft: {
        value: sizes.breadcrumbMargin,
      },
      marginRight: {
        value: sizes.breadcrumbMargin,
      },
      offsetWidth: {
        get: function () {
          // const classList = [];
          // this.classList.forEach((val) => classList.push(val));
          // console.log(classList);
          if (isBreadCrumbItem.bind(this)()) {
            return sizes.breadcrumbWidth;
          } else {
            // return width of test environment
            return (
              parseInt(this.style.width, 10) || this.parentNode.offsetWidth
            );
          }
        },
      },
      offsetHeight: {
        get: function () {
          if (isBreadCrumbItem.bind(this)()) {
            return sizes.breadcrumbHeight;
          } else {
            // return height of test environment
            return (
              parseInt(this.style.height, 10) || this.parentNode.offsetHeight
            );
          }
        },
      },
    });
  });

  afterEach(() => {
    mockElement.mockRestore();
    jest.restoreAllMocks();
  });

  const { click } = fireEvent;

  it('Renders all as visible breadcrumbs when space available', async () => {
    const plentyOfSpace = (breadcrumbItems.length + 1) * sizes.breadcrumbWidth;

    render(
      <TestBreadcrumbWithOverflow
        width={plentyOfSpace}
        overflowAriaLabel="Open and close additional breadcrumb item list."
        breadcrumbs={breadcrumbItems}
      />
    );
    const visibleBreadcrumbs = screen.getAllByText(/Breadcrumb [0-9]/, {
      selector: `.${blockClass}__displayed-breadcrumb .${carbon.prefix}--link`,
    });
    expect(visibleBreadcrumbs.length).toEqual(5); // all should be visible

    breadcrumbContent.forEach((item, index) => {
      expect(visibleBreadcrumbs[index]).toHaveTextContent(item);
    });
  });

  it('Renders first and last items when not enough space for all', async () => {
    const reduceSpaceBy = 1;
    const notEnoughSpace =
      (breadcrumbItems.length - reduceSpaceBy) * sizes.breadcrumbWidth;
    const overflowItemsExpected = reduceSpaceBy + 1; // + 1 as space for overflow button needed also

    render(
      <TestBreadcrumbWithOverflow
        width={notEnoughSpace}
        overflowAriaLabel="Open and close additional breadcrumb item list."
        breadcrumbs={breadcrumbItems}
      />
    );

    const visibleBreadcrumbs = screen.getAllByText(/Breadcrumb [0-9]/, {
      selector: `.${blockClass}__displayed-breadcrumb .${carbon.prefix}--link`,
    });

    // not enough room
    expect(visibleBreadcrumbs.length).toEqual(
      breadcrumbItems.length - reduceSpaceBy - 1
    );

    expect(visibleBreadcrumbs[0]).toHaveTextContent(breadcrumbContent[0]);
    // last item is last breadcrumb
    expect(visibleBreadcrumbs[visibleBreadcrumbs.length - 1]).toHaveTextContent(
      breadcrumbContent[4]
    );

    // item 2 contains an overflow menu
    const overflowBtn = document.querySelector(
      `.${blockClass}__overflow-menu button`
    );

    await act(() => click(overflowBtn));

    // <ul role='menu' /> but default <ul> role of list used for query
    // see https://testing-library.com/docs/queries/byrole/#api
    // const om = screen.getByRole('list');
    // const menuItems = screen.getAllByRole('menuitem');
    // use querySelectorAll rather that getAllByRole because the drop-down
    // never fully appears in jsdom (requires resize handler mocking)
    const menuItems = document.querySelectorAll('[role="menuitem"]');
    expect(menuItems).toHaveLength(overflowItemsExpected);
    expect(menuItems[0]).toHaveTextContent(breadcrumbContent[1]);
    expect(menuItems[1]).toHaveTextContent(breadcrumbContent[2]);
    await act(() => click(menuItems[1]));
    expect(myOnClick).toHaveBeenCalled();
  });

  it('Renders just the breadcrumb and last item when very little space', async () => {
    const notEnoughSpace = 1.1 * sizes.breadcrumbWidth;

    render(
      <TestBreadcrumbWithOverflow
        width={notEnoughSpace}
        overflowAriaLabel="Open and close additional breadcrumb item list."
        breadcrumbs={breadcrumbItems}
      />
    );

    const visibleBreadcrumbs = screen.getAllByText(/Breadcrumb [0-9]/, {
      selector: `.${blockClass}__displayed-breadcrumb .${carbon.prefix}--link`,
    });
    // not enough room
    expect(visibleBreadcrumbs.length).toEqual(1);

    // last item is last breadcrumb
    expect(visibleBreadcrumbs[0]).toHaveTextContent(breadcrumbContent[4]);

    // item 2 contains an overflow menu
    const overflowBtn = screen.getByLabelText(/Open and close/, {
      selector: `.${blockClass}__overflow-menu`,
    });
    expect(overflowBtn).toBeTruthy();
  });

  it('Renders just the breadcrumb obeying maxVisible', async () => {
    render(
      <TestBreadcrumbWithOverflow
        width={1200}
        maxVisible={3}
        overflowAriaLabel="Open and close additional breadcrumb item list."
        breadcrumbs={breadcrumbItems}
      />
    );

    const visibleBreadcrumbs = screen.getAllByText(/Breadcrumb [0-9]/, {
      selector: `.${blockClass}__displayed-breadcrumb .${carbon.prefix}--link`,
    });
    // not enough room
    expect(visibleBreadcrumbs.length).toEqual(3);

    // last item is last breadcrumb
    expect(visibleBreadcrumbs[2]).toHaveTextContent(breadcrumbContent[4]);

    // item 2 contains an overflow menu
    const overflowBtn = screen.getByLabelText(/Open and close/, {
      selector: `.${blockClass}__overflow-menu`,
    });
    expect(overflowBtn).toBeTruthy();
  });

  it('Renders just the breadcrumb overflow and title using maxVisible 0', async () => {
    render(
      <TestBreadcrumbWithOverflow
        width={1200}
        maxVisible={0}
        overflowAriaLabel="Open and close additional breadcrumb item list."
        breadcrumbs={breadcrumbItems}
      />
    );

    const visibleBreadcrumbs = screen.getAllByText(/Breadcrumb [0-9]/, {
      selector: `.${blockClass}__displayed-breadcrumb .${carbon.prefix}--link`,
    });
    // not enough room
    expect(visibleBreadcrumbs.length).toEqual(1);

    // last item is last breadcrumb
    expect(visibleBreadcrumbs[0]).toHaveTextContent(breadcrumbContent[4]);

    // item 2 contains an overflow menu
    const overflowBtn = screen.getByLabelText(/Open and close/, {
      selector: `.${blockClass}__overflow-menu`,
    });
    expect(overflowBtn).toBeTruthy();
  });

  it('does not duplicate ids', async () => {
    const plentyOfSpace = (breadcrumbItems.length + 1) * sizes.breadcrumbWidth;

    const { container } = render(
      <TestBreadcrumbWithOverflow
        width={plentyOfSpace}
        overflowAriaLabel="Open and close additional breadcrumb item list."
        breadcrumbs={breadcrumbItems}
      />
    );
    expect(
      container.querySelectorAll(`#${breadcrumbItems[0].id}`)
    ).toHaveLength(1);
  });

  it('adds additional properties to an breadcrumb with overflow', async () => {
    render(
      <TestBreadcrumbWithOverflow
        data-testid={dataTestId}
        width={1200}
        maxVisible={0}
        overflowAriaLabel="Open and close additional breadcrumb item list."
        breadcrumbs={breadcrumbItems}
      />
    );
    screen.getByTestId(dataTestId);
  });

  it('renders a short title', async () => {
    render(
      <TestBreadcrumbWithOverflow
        data-testid={dataTestId}
        width={1200}
        maxVisible={0}
        overflowAriaLabel="Open and close additional breadcrumb item list."
        breadcrumbs={[
          {
            href: '/#',
            id: '1',
            key: '1',
            label: 'label',
            onClick: () => {},
            shortTitle: 'short title',
          },
        ]}
      />
    );
    expect(screen.getByText('short title')).toBeVisible();
  });
});
