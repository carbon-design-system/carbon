/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import ContainedList, { ContainedListItem } from '../';
import ExpandableSearch from '../../ExpandableSearch';
import Search from '../../Search';
import { render, screen } from '@testing-library/react';

const prefix = 'cds';

const defaultProps = {
  list: {
    label: 'Heading',
  },
  item: {
    children: 'List item',
  },
};
let wrapper;

function TestComponent({ list, item }) {
  const props = {
    list: {
      ...defaultProps.list,
      ...list,
    },
    item: {
      ...defaultProps.item,
      ...item,
    },
  };

  return (
    <ContainedList {...props.list}>
      <ContainedListItem {...props.item} />
    </ContainedList>
  );
}

beforeEach(() => {
  // eslint-disable-next-line testing-library/no-render-in-setup
  wrapper = render(<TestComponent />);
});

describe('ContainedList', () => {
  it('list and label ids match', () => {
    // eslint-disable-next-line testing-library/prefer-screen-queries
    const list = wrapper.getByRole('list');
    // eslint-disable-next-line testing-library/no-node-access
    const label = wrapper.container.querySelector(
      `.${prefix}--contained-list__label`
    );

    expect(list).toHaveAttribute('aria-labelledby', label.id);
  });

  it('renders props.label', () => {
    // eslint-disable-next-line testing-library/no-node-access
    const label = wrapper.container.querySelector(
      `.${prefix}--contained-list__label`
    );

    expect(label).toHaveTextContent(defaultProps.list.label);
  });

  it('supports additional css class names', () => {
    const className = 'some-class';
    wrapper.rerender(<TestComponent list={{ className }} />);

    expect(wrapper.container.firstChild).toHaveClass(className);
  });

  it('should render ExpandableSearch as an action', () => {
    render(
      <ContainedList
        label="label"
        action={
          <ExpandableSearch
            labelText="Expandable Search"
            data-testid="test-id"
          />
        }
      />
    );

    expect(screen.getByTestId('test-id')).toBeInTheDocument();
    // eslint-disable-next-line testing-library/no-node-access
    expect(screen.getByRole('search').parentElement).toHaveClass(
      `${prefix}--contained-list__action`
    );
  });

  it('should render search as a child', () => {
    render(
      <ContainedList label="label">
        <Search labelText="Search" data-testid="test-id" />
      </ContainedList>
    );

    expect(screen.getByTestId('test-id')).toBeInTheDocument();
  });

  it('should not render a child "Search" component when an "ExpandableSearch" component is passed in as an action', () => {
    render(
      <ContainedList
        label="label"
        action={
          <ExpandableSearch
            labelText="Expandable Search"
            data-testid="test-expandable-search-id"
          />
        }>
        <Search labelText="Search" data-testid="test-search-id" />
      </ContainedList>
    );

    expect(screen.getByTestId('test-expandable-search-id')).toBeInTheDocument();
    expect(screen.queryByTestId('test-search-id')).not.toBeInTheDocument();
  });
});

describe('ContainedListItem', () => {
  it('renders props.children', () => {
    // eslint-disable-next-line testing-library/prefer-screen-queries
    const content = wrapper.getByRole('listitem');

    // eslint-disable-next-line testing-library/no-node-access
    expect(content).toHaveTextContent(defaultProps.item.children);
  });

  it('supports additional css class names', () => {
    const className = 'some-class';
    wrapper.rerender(<TestComponent item={{ className }} />);

    // eslint-disable-next-line testing-library/prefer-screen-queries
    expect(wrapper.getByRole('listitem')).toHaveClass(className);
  });

  it('renders props.action adjacent to content', () => {
    wrapper.rerender(
      <TestComponent item={{ action: <div data-testid="action" /> }} />
    );
    // eslint-disable-next-line testing-library/no-node-access
    const contentEl = wrapper.container.querySelector(
      `.${prefix}--contained-list-item__content`
    );

    // eslint-disable-next-line testing-library/no-node-access
    expect(contentEl.nextSibling.firstChild.dataset['testid']).toBe('action');
  });

  it('supports props.renderIcon', () => {
    wrapper.rerender(
      <TestComponent item={{ renderIcon: () => <svg data-testid="svg" /> }} />
    );

    // eslint-disable-next-line testing-library/no-node-access
    expect(wrapper.container.querySelector('svg').dataset['testid']).toBe(
      'svg'
    );
  });

  describe('interactive', () => {
    beforeEach(() => {
      // eslint-disable-next-line testing-library/no-render-in-setup
      wrapper.rerender(<TestComponent item={{ onClick: () => {} }} />);
    });

    it('renders content as button', () => {
      // eslint-disable-next-line testing-library/prefer-screen-queries
      const content = wrapper.getByRole('listitem').firstChild;

      expect(content.tagName).toBe('BUTTON');
    });
  });
});
