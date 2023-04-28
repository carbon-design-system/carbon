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
  wrapper = render(<TestComponent />);
});

async function a11y(label) {
  it('should have no Axe violations', async () => {
    await expect(wrapper.container).toHaveNoAxeViolations();
  });

  it('should have no Accessibility Checker violations', async () => {
    await expect(wrapper.container).toHaveNoACViolations(label);
  });
}

describe('ContainedList', () => {
  it('list and label ids match', () => {
    const list = wrapper.getByRole('list');
    const label = wrapper.container.querySelector(
      `.${prefix}--contained-list__label`
    );

    expect(list).toHaveAttribute('aria-labelledby', label.id);
  });

  it('renders props.label', () => {
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

  a11y('ContainedList');

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
    const content = wrapper.getByRole('listitem');

    expect(content).toHaveTextContent(defaultProps.item.children);
  });

  it('supports additional css class names', () => {
    const className = 'some-class';
    wrapper.rerender(<TestComponent item={{ className }} />);

    expect(wrapper.getByRole('listitem')).toHaveClass(className);
  });

  it('renders props.action adjacent to content', () => {
    wrapper.rerender(
      <TestComponent item={{ action: <div data-testid="action" /> }} />
    );
    const contentEl = wrapper.container.querySelector(
      `.${prefix}--contained-list-item__content`
    );

    expect(contentEl.nextSibling.firstChild.dataset['testid']).toBe('action');
  });

  it('supports props.renderIcon', () => {
    wrapper.rerender(
      <TestComponent item={{ renderIcon: () => <svg data-testid="svg" /> }} />
    );

    expect(wrapper.container.querySelector('svg').dataset['testid']).toBe(
      'svg'
    );
  });

  describe('interactive', () => {
    beforeEach(() => {
      wrapper.rerender(<TestComponent item={{ onClick: () => {} }} />);
    });

    it('renders content as button', () => {
      const content = wrapper.getByRole('listitem').firstChild;

      expect(content.tagName).toBe('BUTTON');
    });

    a11y('ContainedListItem, interactive');
  });
});
