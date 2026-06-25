/**
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import { render, screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ActionBar } from '.';
import { Lightning, Bee } from '@carbon/react/icons';
import { mockHTMLElement } from '../../global/js/utils/test-helper';

import { pkg, carbon } from '../../settings';

const blockClass = `${pkg.prefix}--action-bar`;

const actions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => ({
  key: `key is this num ${num}`,
  id: `id-${num}`,
  renderIcon:
    num % 2
      ? (props) => <Lightning size={16} {...props} />
      : (props) => <Bee size={16} {...props} />,
  iconDescription: `Action ${num.toString().padStart(2, '0')}`,
  label: `Action ${num.toString().padStart(2, '0')}`,
  onClick: () => {},
}));

const overflowAriaLabel = 'overflow-label';

// eslint-disable-next-line react/prop-types
const TestActionBar = ({ width, children = null, ...rest }) => {
  return (
    <div style={{ width, height: 40 }} className="test-container">
      <ActionBar {...rest}>{children}</ActionBar>
    </div>
  );
};

const sizes = (base) => ({
  offsetWidth: {
    [`${blockClass}__displayed-items`]: base,
    [`${blockClass}-overflow-items`]: 40, // The overflow menu button
    [`${blockClass}-overflow-items__options`]: 200, // width of item in overflow menu
    [`${blockClass}`]: base,
    [`${blockClass}-item`]: 40, // standard icon button width
    [`${blockClass}__hidden-sizing-items`]: 1000000, // very large so as to be unconstrained
  },
});

const mockSizes = () => {
  const mocks = {};

  const keys = Object.keys(sizes(-1));
  for (let i = 0; i < keys.length; i++) {
    mocks[keys[i]] = {
      get: function () {
        return testSizes(this, keys[i]);
      },
    };
  }

  return mocks;
};

const testSizes = (el, property) => {
  const classes = el.getAttribute('class')?.split(' ');
  const container = el.closest('.test-container');

  // if no container we are looking at the popup, assign something more than big enough e.g. 1001
  const base = container ? parseInt(container.style.width, 10) : 1001;
  const propSizes = sizes(base)[property];

  if (propSizes && classes) {
    for (let cls of classes) {
      const val = propSizes[cls] ? propSizes[cls] : -1;
      if (val >= 0) {
        // console.log(property, cls, val);
        return val;
      }
    }
  }

  // The test should never get here as all cases should be catered for in setup.

  return base;
};

describe(ActionBar.displayName, () => {
  let mockElement;

  beforeEach(() => {
    mockElement = mockHTMLElement(mockSizes());
  });

  afterEach(() => {
    mockElement.mockRestore();
  });

  it('Renders an action bar', async () => {
    render(
      <TestActionBar
        width={1150}
        actions={actions}
        overflowAriaLabel={overflowAriaLabel}
      />
    );

    screen.getByText(/Action 01/, {
      selector: `.${blockClass}__displayed-items .${carbon.prefix}--popover-content.${carbon.prefix}--tooltip-content`,
    });
    screen.getByText(/Action 10/, {
      selector: `.${blockClass}__displayed-items .${carbon.prefix}--popover-content.${carbon.prefix}--tooltip-content`,
    });
  });

  it('Renders an action bar with overflow items', async () => {
    // not enough room so should see an overflow.
    render(
      <TestActionBar
        width={200}
        overflowAriaLabel={overflowAriaLabel}
        actions={actions}
      />
    );

    waitFor(
      async () => {
        expect(
          screen.queryByText(/Action 10/, {
            selector: `.${blockClass}__displayed-items .${carbon.prefix}--popover-content.${carbon.prefix}--tooltip-content`,
          })
        ).toBeNull();

        const menuItemNotSeen = document.querySelector('[role="menuitem"]', {
          name: 'Action 10',
        });
        expect(menuItemNotSeen).toBeNull();

        // Click overflow button and check for last action
        const ofBtn = screen.getByLabelText(overflowAriaLabel, {
          selector: `.${blockClass}-overflow-items`,
        });
        await act(() => userEvent.click(ofBtn));

        // <ul role='menu' /> but default <ul> role of list used for query
        // see https://testing-library.com/docs/queries/byrole/#api
        // const om = screen.getByRole('list');
        // const menuItems = screen.getAllByRole('menuitem');
        // use querySelectorAll rather that getAllByRole because the drop-down
        // never fully appears in jsdom (requires resize handler mocking)
        const menuItemSeen = document.querySelector('[role="menuitem"]', {
          name: 'Action 10',
        });
        expect(menuItemSeen).not.toBeNull();
      },
      { timeout: 0 }
    );
  });

  it('Does not duplicate action IDs', async () => {
    // not enough room so should see an overflow.
    const { container } = render(
      <TestActionBar
        width={200}
        overflowAriaLabel={overflowAriaLabel}
        actions={actions}
      />
    );

    expect(container.querySelectorAll(`#${actions[0].id}`)).toHaveLength(1);
  });

  it('Renders an action bar with max items set', async () => {
    render(
      <TestActionBar
        width={1150}
        maxVisible={2}
        actions={actions}
        overflowAriaLabel={overflowAriaLabel}
      />
    );

    screen.getByText(/Action 01/, {
      selector: `.${blockClass}__displayed-items .${carbon.prefix}--popover-content.${carbon.prefix}--tooltip-content`,
    });
    screen.getByText(/Action 02/, {
      selector: `.${blockClass}__displayed-items .${carbon.prefix}--popover-content.${carbon.prefix}--tooltip-content`,
    });

    expect(
      screen.queryByText(/Action 03/, {
        selector: `.${blockClass}__displayed-items .${carbon.prefix}--popover-content.${carbon.prefix}--tooltip-content`,
      })
    ).toBeNull();
  });
});
