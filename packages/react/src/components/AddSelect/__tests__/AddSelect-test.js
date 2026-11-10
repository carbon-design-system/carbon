/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { AddSelect } from '../AddSelect';

const prefix = 'cds';
const blockClass = `${prefix}--add-select`;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const sampleItems = [
  { id: '1', title: 'Item 1', subtitle: 'Subtitle 1', value: 'item-1' },
  { id: '2', title: 'Item 2', subtitle: 'Subtitle 2', value: 'item-2' },
  { id: '3', title: 'Item 3', subtitle: 'Subtitle 3', value: 'item-3' },
];

/** Controlled wrapper used in selection tests */
const ControlledAddSelect = ({ onItemSelect, multi = false, ...bodyProps }) => {
  const [selected, setSelected] = useState(new Set());

  const handleSelect = (itemId, isSelected, value) => {
    const next = multi ? new Set(selected) : new Set();
    if (isSelected) {
      next.add(itemId);
    } else {
      next.delete(itemId);
    }
    setSelected(next);
    onItemSelect?.(itemId, isSelected, value);
  };

  return (
    <AddSelect selectedItems={selected} onItemSelect={handleSelect}>
      <AddSelect.Body hideSearch {...bodyProps}>
        <AddSelect.Column multi={multi} hideSearch>
          {sampleItems.map((item) => (
            <AddSelect.Row
              key={item.id}
              itemId={item.id}
              title={item.title}
              subtitle={item.subtitle}
              value={item.value}
            />
          ))}
        </AddSelect.Column>
      </AddSelect.Body>
    </AddSelect>
  );
};

// ---------------------------------------------------------------------------
// AddSelect (root)
// ---------------------------------------------------------------------------

describe('AddSelect (root)', () => {
  it('renders with the correct block class', () => {
    const { container } = render(<AddSelect data-testid="root" />);
    expect(container.firstChild).toHaveClass(blockClass);
  });

  it('applies a custom className', () => {
    const { container } = render(<AddSelect className="my-class" />);
    expect(container.firstChild).toHaveClass('my-class');
  });

  it('forwards a ref to the root div', () => {
    const ref = React.createRef();
    render(<AddSelect ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('renders children', () => {
    render(
      <AddSelect>
        <span>child</span>
      </AddSelect>
    );
    expect(screen.getByText('child')).toBeInTheDocument();
  });

  it('exposes all expected static sub-components', () => {
    expect(typeof AddSelect.Body).toBe('object');
    expect(typeof AddSelect.Column).toBe('object');
    expect(typeof AddSelect.Row).toBe('object');
    expect(typeof AddSelect.SelectionSummary).toBe('object');
    expect(typeof AddSelect.SelectionSummaryItem).toBe('object');
    expect(typeof AddSelect.ItemPanel).toBe('object');
  });

  it('passes through arbitrary rest props to the root div', () => {
    const { container } = render(
      <AddSelect data-testid="root-el" aria-label="add select" />
    );
    expect(container.firstChild).toHaveAttribute('data-testid', 'root-el');
    expect(container.firstChild).toHaveAttribute('aria-label', 'add select');
  });

  it('provides onItemSelect context so descendant rows can call it', () => {
    const onItemSelect = jest.fn();
    render(
      <AddSelect onItemSelect={onItemSelect}>
        <AddSelect.Body hideSearch>
          <AddSelect.Column hideSearch>
            <AddSelect.Row itemId="ctx1" title="Ctx row" value="ctx-val" />
          </AddSelect.Column>
        </AddSelect.Body>
      </AddSelect>
    );
    fireEvent.click(screen.getByRole('radio'));
    expect(onItemSelect).toHaveBeenCalledWith('ctx1', true, 'ctx-val');
  });

  it('provides selectedItems context so descendant rows reflect selection', () => {
    render(
      <AddSelect selectedItems={new Set(['ctx2'])}>
        <AddSelect.Body hideSearch>
          <AddSelect.Column multi hideSearch>
            <AddSelect.Row itemId="ctx2" title="Ctx row 2" value="ctx-val-2" />
          </AddSelect.Column>
        </AddSelect.Body>
      </AddSelect>
    );
    expect(screen.getByRole('checkbox')).toBeChecked();
  });
});

// ---------------------------------------------------------------------------
// AddSelect.Body
// ---------------------------------------------------------------------------

describe('AddSelect.Body', () => {
  it('renders with the body class', () => {
    const { container } = render(
      <AddSelect>
        <AddSelect.Body data-testid="body" />
      </AddSelect>
    );
    expect(container.querySelector(`.${blockClass}__body`)).toBeInTheDocument();
  });

  it('applies a custom className', () => {
    const { container } = render(
      <AddSelect>
        <AddSelect.Body className="body-custom" />
      </AddSelect>
    );
    expect(container.querySelector('.body-custom')).toBeInTheDocument();
  });

  it('renders the search input by default', () => {
    render(
      <AddSelect>
        <AddSelect.Body globalSearchLabel="Search items" />
      </AddSelect>
    );
    expect(screen.getByRole('searchbox')).toBeInTheDocument();
  });

  it('hides the search input when hideSearch is true', () => {
    render(
      <AddSelect>
        <AddSelect.Body hideSearch />
      </AddSelect>
    );
    expect(screen.queryByRole('searchbox')).not.toBeInTheDocument();
  });

  it('renders itemsLabel as a text label', () => {
    render(
      <AddSelect>
        <AddSelect.Body itemsLabel="All items" hideSearch />
      </AddSelect>
    );
    expect(screen.getByText('All items')).toBeInTheDocument();
  });

  it('renders item count tag when itemCount is provided', () => {
    render(
      <AddSelect>
        <AddSelect.Body itemCount={42} hideSearch />
      </AddSelect>
    );
    expect(screen.getByText('42')).toBeInTheDocument();
  });

  it('calls onSearch when search input changes', () => {
    const onSearch = jest.fn();
    render(
      <AddSelect>
        <AddSelect.Body onSearch={onSearch} globalSearchLabel="Search" />
      </AddSelect>
    );
    fireEvent.change(screen.getByRole('searchbox'), {
      target: { value: 'hello' },
    });
    expect(onSearch).toHaveBeenLastCalledWith('hello');
  });

  it('renders breadcrumbs when path entries are provided', () => {
    render(
      <AddSelect>
        <AddSelect.Body
          hideSearch
          path={[
            { id: 'root', title: 'Root' },
            { id: 'child', title: 'Child Level' },
          ]}
        />
      </AddSelect>
    );
    expect(screen.getByText('Root')).toBeInTheDocument();
    expect(screen.getByText('Child Level')).toBeInTheDocument();
  });

  it('calls onBreadcrumbClick with the correct index when a breadcrumb link is clicked', () => {
    const onBreadcrumbClick = jest.fn();
    render(
      <AddSelect>
        <AddSelect.Body
          hideSearch
          onBreadcrumbClick={onBreadcrumbClick}
          path={[
            { id: 'root', title: 'Root' },
            { id: 'child', title: 'Child Level' },
          ]}
        />
      </AddSelect>
    );
    fireEvent.click(screen.getByText('Root'));
    expect(onBreadcrumbClick).toHaveBeenCalledWith(0);
  });

  it('renders actionsSlot alongside the search', () => {
    render(
      <AddSelect>
        <AddSelect.Body actionsSlot={<button>Filter</button>} />
      </AddSelect>
    );
    expect(screen.getByText('Filter')).toBeInTheDocument();
  });

  it('renders subHeaderActions content', () => {
    render(
      <AddSelect>
        <AddSelect.Body
          hideSearch
          subHeaderActions={<span>Sort action</span>}
        />
      </AddSelect>
    );
    expect(screen.getByText('Sort action')).toBeInTheDocument();
  });

  it('renders headerContent slot and hides the default header', () => {
    render(
      <AddSelect>
        <AddSelect.Body headerContent={<div>Custom header</div>} />
      </AddSelect>
    );
    expect(screen.getByText('Custom header')).toBeInTheDocument();
    expect(screen.queryByRole('searchbox')).not.toBeInTheDocument();
  });

  it('renders the grid container with role="grid"', () => {
    const { container } = render(
      <AddSelect>
        <AddSelect.Body hideSearch />
      </AddSelect>
    );
    expect(container.querySelector('[role="grid"]')).toBeInTheDocument();
  });

  it('renders list-body with horizontal modifier when layout="horizontal"', () => {
    const { container } = render(
      <AddSelect>
        <AddSelect.Body hideSearch layout="horizontal" />
      </AddSelect>
    );
    expect(
      container.querySelector(`.${blockClass}-list-body--horizontal`)
    ).toBeInTheDocument();
  });

  it('does not render horizontal modifier when layout="vertical"', () => {
    const { container } = render(
      <AddSelect>
        <AddSelect.Body hideSearch layout="vertical" />
      </AddSelect>
    );
    expect(
      container.querySelector(`.${blockClass}-list-body--horizontal`)
    ).not.toBeInTheDocument();
  });

  it('forwards a ref to the body div', () => {
    const ref = React.createRef();
    render(
      <AddSelect>
        <AddSelect.Body hideSearch ref={ref} />
      </AddSelect>
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current).toHaveClass(`${blockClass}__body`);
  });

  it('renders searchResultsTitle in place of itemsLabel when a search term is typed', () => {
    render(
      <AddSelect>
        <AddSelect.Body
          itemsLabel="All items"
          searchResultsTitle="Matches"
          globalSearchLabel="Search"
        />
      </AddSelect>
    );
    expect(screen.getByText('All items')).toBeInTheDocument();
    fireEvent.change(screen.getByRole('searchbox'), {
      target: { value: 'foo' },
    });
    expect(screen.queryByText('All items')).not.toBeInTheDocument();
    expect(screen.getByText('Matches')).toBeInTheDocument();
  });

  it('renders actionsSlot even when hideSearch is true', () => {
    render(
      <AddSelect>
        <AddSelect.Body hideSearch actionsSlot={<button>Filter</button>} />
      </AddSelect>
    );
    expect(screen.queryByRole('searchbox')).not.toBeInTheDocument();
    expect(screen.getByText('Filter')).toBeInTheDocument();
  });

  it('does nothing on ArrowDown keydown when the grid has no rows', () => {
    // Covers the items.length === 0 early-return in handleKeyDown
    const { container } = render(
      <AddSelect>
        <AddSelect.Body hideSearch />
      </AddSelect>
    );
    const grid = container.querySelector('[role="grid"]');
    // Should not throw and should be a no-op
    expect(() => fireEvent.keyDown(grid, { key: 'ArrowDown' })).not.toThrow();
  });

  it('triggers ArrowRight navigation on an item with children via keyboard', () => {
    const onNavigate = jest.fn();
    render(
      <AddSelect>
        <AddSelect.Body hideSearch>
          <AddSelect.Column hideSearch onNavigate={onNavigate}>
            <AddSelect.Row
              itemId="r1"
              title="Row 1"
              value="v1"
              hasChildren
              parentId=""
            />
          </AddSelect.Column>
        </AddSelect.Body>
      </AddSelect>
    );
    const grid = screen.getByRole('grid');
    // ArrowRight on the focused row (index 0) with data-has-children should
    // click the nav indicator and fire onNavigate.
    fireEvent.keyDown(grid, { key: 'ArrowRight' });
    expect(onNavigate).toHaveBeenCalledWith('r1', 'Row 1', '');
  });
});

// ---------------------------------------------------------------------------
// AddSelect.Row
// ---------------------------------------------------------------------------

describe('AddSelect.Row', () => {
  it('renders with role="row" and aria-selected=false by default', () => {
    render(
      <AddSelect>
        <AddSelect.Body hideSearch>
          <AddSelect.Row itemId="r1" title="Row 1" value="v1" />
        </AddSelect.Body>
      </AddSelect>
    );
    const row = screen.getByRole('row');
    expect(row).toBeInTheDocument();
    expect(row).toHaveAttribute('aria-selected', 'false');
  });

  it('renders title and subtitle text', () => {
    const { container } = render(
      <AddSelect>
        <AddSelect.Body hideSearch>
          <AddSelect.Row
            itemId="r1"
            title="My title"
            subtitle="My subtitle"
            value="v1"
          />
        </AddSelect.Body>
      </AddSelect>
    );
    // The title also appears as a hidden label on the radio/checkbox; query the
    // visible title div directly to avoid the ambiguity.
    expect(
      container.querySelector(`.${blockClass}-row__title`)
    ).toHaveTextContent('My title');
    expect(screen.getByText('My subtitle')).toBeInTheDocument();
  });

  it('renders a radio button by default (single-select)', () => {
    render(
      <AddSelect>
        <AddSelect.Body hideSearch>
          <AddSelect.Column hideSearch>
            <AddSelect.Row itemId="r1" title="Row 1" value="v1" />
          </AddSelect.Column>
        </AddSelect.Body>
      </AddSelect>
    );
    expect(screen.getByRole('radio')).toBeInTheDocument();
  });

  it('renders a checkbox when column is multi-select', () => {
    render(
      <AddSelect>
        <AddSelect.Body hideSearch>
          <AddSelect.Column multi hideSearch>
            <AddSelect.Row itemId="r1" title="Row 1" value="v1" />
          </AddSelect.Column>
        </AddSelect.Body>
      </AddSelect>
    );
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('calls onItemSelect when a radio row is clicked', () => {
    const onItemSelect = jest.fn();
    render(
      <AddSelect onItemSelect={onItemSelect}>
        <AddSelect.Body hideSearch>
          <AddSelect.Column hideSearch>
            <AddSelect.Row itemId="r1" title="Row 1" value="v1" />
          </AddSelect.Column>
        </AddSelect.Body>
      </AddSelect>
    );
    fireEvent.click(screen.getByRole('radio'));
    expect(onItemSelect).toHaveBeenCalledWith('r1', true, 'v1');
  });

  it('calls onItemSelect when a multi-select checkbox is clicked', () => {
    const onItemSelect = jest.fn();
    render(
      <AddSelect onItemSelect={onItemSelect}>
        <AddSelect.Body hideSearch>
          <AddSelect.Column multi hideSearch>
            <AddSelect.Row itemId="r1" title="Row 1" value="v1" />
          </AddSelect.Column>
        </AddSelect.Body>
      </AddSelect>
    );
    fireEvent.click(screen.getByRole('checkbox'));
    expect(onItemSelect).toHaveBeenCalledWith('r1', true, 'v1');
  });

  it('reflects selected state via selectedItems context', () => {
    render(
      <AddSelect selectedItems={new Set(['r1'])}>
        <AddSelect.Body hideSearch>
          <AddSelect.Column multi hideSearch>
            <AddSelect.Row itemId="r1" title="Row 1" value="v1" />
          </AddSelect.Column>
        </AddSelect.Body>
      </AddSelect>
    );
    expect(screen.getByRole('checkbox')).toBeChecked();
    expect(screen.getByRole('row')).toHaveAttribute('aria-selected', 'true');
  });

  it('warns in dev when both selected prop and selectedItems context are set', () => {
    const consoleWarn = jest
      .spyOn(console, 'warn')
      .mockImplementation(() => {});
    render(
      // selectedItems context is set on root; selected=true on the row — conflict
      <AddSelect selectedItems={new Set(['r1'])}>
        <AddSelect.Body hideSearch>
          <AddSelect.Column multi hideSearch>
            <AddSelect.Row itemId="r1" title="Row 1" value="v1" selected />
          </AddSelect.Column>
        </AddSelect.Body>
      </AddSelect>
    );
    expect(consoleWarn).toHaveBeenCalledWith(
      expect.stringContaining('[AddSelectRow]')
    );
    expect(consoleWarn).toHaveBeenCalledWith(expect.stringContaining('"r1"'));
    consoleWarn.mockRestore();
  });

  it('does not warn when only selectedItems context is set (no selected prop)', () => {
    const consoleWarn = jest
      .spyOn(console, 'warn')
      .mockImplementation(() => {});
    render(
      <AddSelect selectedItems={new Set(['r1'])}>
        <AddSelect.Body hideSearch>
          <AddSelect.Column multi hideSearch>
            <AddSelect.Row itemId="r1" title="Row 1" value="v1" />
          </AddSelect.Column>
        </AddSelect.Body>
      </AddSelect>
    );
    expect(consoleWarn).not.toHaveBeenCalled();
    consoleWarn.mockRestore();
  });

  it('does not call onItemSelect when disabled', () => {
    const onItemSelect = jest.fn();
    render(
      <AddSelect onItemSelect={onItemSelect}>
        <AddSelect.Body hideSearch>
          <AddSelect.Column hideSearch>
            <AddSelect.Row itemId="r1" title="Row 1" value="v1" disabled />
          </AddSelect.Column>
        </AddSelect.Body>
      </AddSelect>
    );
    fireEvent.click(screen.getByRole('radio'));
    expect(onItemSelect).not.toHaveBeenCalled();
  });

  it('renders the navigation indicator when hasChildren is true', () => {
    const { container } = render(
      <AddSelect>
        <AddSelect.Body hideSearch>
          <AddSelect.Row itemId="r1" title="Row 1" value="v1" hasChildren />
        </AddSelect.Body>
      </AddSelect>
    );
    expect(
      container.querySelector(`.${blockClass}-row__nav-indicator`)
    ).toBeInTheDocument();
  });

  it('renders the item panel view icon when hasItemPanel is true', () => {
    render(
      <AddSelect>
        <AddSelect.Body hideSearch>
          <AddSelect.Row
            itemId="r1"
            title="Row 1"
            value="v1"
            hasItemPanel
            onItemPanelClick={jest.fn()}
            itemPanelIconDescription="View details"
          />
        </AddSelect.Body>
      </AddSelect>
    );
    expect(
      screen.getByRole('button', { name: /view details/i })
    ).toBeInTheDocument();
  });

  it('calls onItemPanelClick with the item ID when the view icon is clicked', () => {
    const onItemPanelClick = jest.fn();
    render(
      <AddSelect>
        <AddSelect.Body hideSearch>
          <AddSelect.Row
            itemId="r1"
            title="Row 1"
            value="v1"
            hasItemPanel
            onItemPanelClick={onItemPanelClick}
            itemPanelIconDescription="View details"
          />
        </AddSelect.Body>
      </AddSelect>
    );
    fireEvent.click(screen.getByRole('button', { name: /view details/i }));
    expect(onItemPanelClick).toHaveBeenCalledWith('r1');
  });

  it('renders in skeleton mode with aria-hidden when skeleton=true', () => {
    const { container } = render(
      <AddSelect>
        <AddSelect.Body hideSearch>
          <AddSelect.Row itemId="sk1" title="Loading" value="v" skeleton />
        </AddSelect.Body>
      </AddSelect>
    );
    const skeletonRow = container.querySelector(`.${blockClass}-row--skeleton`);
    expect(skeletonRow).toBeInTheDocument();
    expect(skeletonRow).toHaveAttribute('aria-hidden', 'true');
  });

  it('renders children content inside the row', () => {
    render(
      <AddSelect>
        <AddSelect.Body hideSearch>
          <AddSelect.Row itemId="r1" title="Row 1" value="v1">
            <span>badge</span>
          </AddSelect.Row>
        </AddSelect.Body>
      </AddSelect>
    );
    expect(screen.getByText('badge')).toBeInTheDocument();
  });

  it('does not call onNavigate when nav indicator is clicked but hasChildren is false', () => {
    const onNavigate = jest.fn();
    render(
      <AddSelect>
        <AddSelect.Body hideSearch>
          <AddSelect.Column hideSearch onNavigate={onNavigate}>
            {/* hasChildren defaults to false — clicking the row should be a no-op */}
            <AddSelect.Row itemId="r1" title="Row 1" value="v1" />
          </AddSelect.Column>
        </AddSelect.Body>
      </AddSelect>
    );
    // The nav indicator is only rendered when hasChildren=true, so click the
    // row div itself to exercise the handleNavigate early-return branch.
    fireEvent.click(screen.getByRole('row'));
    expect(onNavigate).not.toHaveBeenCalled();
  });

  it('calls onNavigate with itemId, title, and parentId when the nav indicator is clicked', () => {
    const onNavigate = jest.fn();
    const { container } = render(
      <AddSelect>
        <AddSelect.Body hideSearch>
          <AddSelect.Column hideSearch onNavigate={onNavigate}>
            <AddSelect.Row
              itemId="r1"
              title="Row 1"
              value="v1"
              hasChildren
              parentId="root"
            />
          </AddSelect.Column>
        </AddSelect.Body>
      </AddSelect>
    );
    fireEvent.click(
      container.querySelector(`.${blockClass}-row__nav-indicator`)
    );
    expect(onNavigate).toHaveBeenCalledWith('r1', 'Row 1', 'root');
  });

  it('calls onNavigate via the nav indicator keyboard Enter key', () => {
    const onNavigate = jest.fn();
    const { container } = render(
      <AddSelect>
        <AddSelect.Body hideSearch>
          <AddSelect.Column hideSearch onNavigate={onNavigate}>
            <AddSelect.Row
              itemId="r1"
              title="Row 1"
              value="v1"
              hasChildren
              parentId="root"
            />
          </AddSelect.Column>
        </AddSelect.Body>
      </AddSelect>
    );
    const navIndicator = container.querySelector(
      `.${blockClass}-row__nav-indicator`
    );
    fireEvent.keyDown(navIndicator, { key: 'Enter' });
    expect(onNavigate).toHaveBeenCalledWith('r1', 'Row 1', 'root');
  });

  it('calls onNavigate via the nav indicator keyboard Space key', () => {
    const onNavigate = jest.fn();
    const { container } = render(
      <AddSelect>
        <AddSelect.Body hideSearch>
          <AddSelect.Column hideSearch onNavigate={onNavigate}>
            <AddSelect.Row
              itemId="r1"
              title="Row 1"
              value="v1"
              hasChildren
              parentId="root"
            />
          </AddSelect.Column>
        </AddSelect.Body>
      </AddSelect>
    );
    const navIndicator = container.querySelector(
      `.${blockClass}-row__nav-indicator`
    );
    fireEvent.keyDown(navIndicator, { key: ' ' });
    expect(onNavigate).toHaveBeenCalledWith('r1', 'Row 1', 'root');
  });

  it('nav indicator defaults to aria-label "Navigate into <title>"', () => {
    const { container } = render(
      <AddSelect>
        <AddSelect.Body hideSearch>
          <AddSelect.Row itemId="r1" title="Row 1" value="v1" hasChildren />
        </AddSelect.Body>
      </AddSelect>
    );
    const navIndicator = container.querySelector(
      `.${blockClass}-row__nav-indicator`
    );
    expect(navIndicator).toHaveAttribute('aria-label', 'Navigate into Row 1');
  });

  it('nav indicator uses navIndicatorLabel prop when provided', () => {
    const { container } = render(
      <AddSelect>
        <AddSelect.Body hideSearch>
          <AddSelect.Row
            itemId="r1"
            title="Row 1"
            value="v1"
            hasChildren
            navIndicatorLabel="Aller aux enfants"
          />
        </AddSelect.Body>
      </AddSelect>
    );
    const navIndicator = container.querySelector(
      `.${blockClass}-row__nav-indicator`
    );
    expect(navIndicator).toHaveAttribute('aria-label', 'Aller aux enfants');
  });

  it('renders rowContent slot instead of the default title/subtitle section', () => {
    const { container } = render(
      <AddSelect>
        <AddSelect.Body hideSearch>
          <AddSelect.Row
            itemId="r1"
            title="Row 1"
            value="v1"
            rowContent={<span>custom row content</span>}
          />
        </AddSelect.Body>
      </AddSelect>
    );
    expect(screen.getByText('custom row content')).toBeInTheDocument();
    expect(
      container.querySelector(`.${blockClass}-row__title`)
    ).not.toBeInTheDocument();
  });

  it('renders the icon element inside the row', () => {
    render(
      <AddSelect>
        <AddSelect.Body hideSearch>
          <AddSelect.Row
            itemId="r1"
            title="Row 1"
            value="v1"
            icon={<svg data-testid="row-icon" />}
          />
        </AddSelect.Body>
      </AddSelect>
    );
    expect(screen.getByTestId('row-icon')).toBeInTheDocument();
  });

  it('renders a SkeletonIcon when skeleton=true and icon is provided', () => {
    const { container } = render(
      <AddSelect>
        <AddSelect.Body hideSearch>
          <AddSelect.Row
            itemId="sk2"
            title="Loading"
            value="v"
            skeleton
            icon={<svg />}
          />
        </AddSelect.Body>
      </AddSelect>
    );
    // Carbon SkeletonIcon renders an svg with the cds--icon--skeleton class
    expect(container.querySelector('.cds--icon--skeleton')).toBeInTheDocument();
  });

  it('passes the indeterminate prop to the Checkbox in multi mode', () => {
    const { container } = render(
      <AddSelect>
        <AddSelect.Body hideSearch>
          <AddSelect.Column multi hideSearch>
            <AddSelect.Row itemId="r1" title="Row 1" value="v1" indeterminate />
          </AddSelect.Column>
        </AddSelect.Body>
      </AddSelect>
    );
    // Carbon sets the indeterminate DOM property directly on the input element
    const checkbox = container.querySelector('input[type="checkbox"]');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox.indeterminate).toBe(true);
  });

  it('applies the item-panel-selected CSS modifier when itemPanelOpen is true', () => {
    const { container } = render(
      <AddSelect>
        <AddSelect.Body hideSearch>
          <AddSelect.Row
            itemId="r1"
            title="Row 1"
            value="v1"
            hasItemPanel
            itemPanelOpen
            onItemPanelClick={jest.fn()}
            itemPanelIconDescription="View"
          />
        </AddSelect.Body>
      </AddSelect>
    );
    expect(
      container.querySelector(`.${blockClass}-row-item-panel--selected`)
    ).toBeInTheDocument();
  });

  it('forwards a ref to the row div', () => {
    const ref = React.createRef();
    render(
      <AddSelect>
        <AddSelect.Body hideSearch>
          <AddSelect.Row itemId="r1" title="Row 1" value="v1" ref={ref} />
        </AddSelect.Body>
      </AddSelect>
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});

// ---------------------------------------------------------------------------
// AddSelect.Column
// ---------------------------------------------------------------------------

describe('AddSelect.Column', () => {
  it('renders with the column class', () => {
    const { container } = render(
      <AddSelect>
        <AddSelect.Body hideSearch>
          <AddSelect.Column hideSearch />
        </AddSelect.Body>
      </AddSelect>
    );
    expect(
      container.querySelector(`.${blockClass}-column`)
    ).toBeInTheDocument();
  });

  it('renders a search input by default', () => {
    render(
      <AddSelect>
        <AddSelect.Body hideSearch>
          <AddSelect.Column searchLabel="Column search" />
        </AddSelect.Body>
      </AddSelect>
    );
    expect(screen.getByRole('searchbox')).toBeInTheDocument();
  });

  it('hides the search input when hideSearch is true', () => {
    render(
      <AddSelect>
        <AddSelect.Body hideSearch>
          <AddSelect.Column hideSearch />
        </AddSelect.Body>
      </AddSelect>
    );
    expect(screen.queryByRole('searchbox')).not.toBeInTheDocument();
  });

  it('calls onSearch when the column search input changes', () => {
    const onSearch = jest.fn();
    render(
      <AddSelect>
        <AddSelect.Body hideSearch>
          <AddSelect.Column onSearch={onSearch} searchLabel="Search" />
        </AddSelect.Body>
      </AddSelect>
    );
    fireEvent.change(screen.getByRole('searchbox'), {
      target: { value: 'foo' },
    });
    expect(onSearch).toHaveBeenLastCalledWith('foo');
  });

  it('renders the column title', () => {
    render(
      <AddSelect>
        <AddSelect.Body hideSearch>
          <AddSelect.Column title="My Column" hideSearch />
        </AddSelect.Body>
      </AddSelect>
    );
    expect(screen.getByText('My Column')).toBeInTheDocument();
  });

  it('renders item count tag when itemCount > 0 and title is set', () => {
    render(
      <AddSelect>
        <AddSelect.Body hideSearch>
          <AddSelect.Column title="Items" itemCount={7} hideSearch />
        </AddSelect.Body>
      </AddSelect>
    );
    expect(screen.getByText('7')).toBeInTheDocument();
  });

  it('renders a "Select All" checkbox when showSelectAll and multi are true', () => {
    render(
      <AddSelect>
        <AddSelect.Body hideSearch>
          <AddSelect.Column
            title="All"
            showSelectAll
            multi
            itemCount={3}
            hideSearch
          />
        </AddSelect.Body>
      </AddSelect>
    );
    expect(screen.getByRole('checkbox', { name: /all/i })).toBeInTheDocument();
  });

  it('calls onSelectAll with checked=true when Select All is toggled on', () => {
    const onSelectAll = jest.fn();
    render(
      <AddSelect>
        <AddSelect.Body hideSearch>
          <AddSelect.Column
            title="All"
            showSelectAll
            multi
            hideSearch
            onSelectAll={onSelectAll}
          />
        </AddSelect.Body>
      </AddSelect>
    );
    fireEvent.click(screen.getByRole('checkbox', { name: /all/i }));
    expect(onSelectAll).toHaveBeenCalledWith(true);
  });

  it('renders actionsSlot alongside the search', () => {
    render(
      <AddSelect>
        <AddSelect.Body hideSearch>
          <AddSelect.Column actionsSlot={<button>Sort</button>} />
        </AddSelect.Body>
      </AddSelect>
    );
    expect(screen.getByText('Sort')).toBeInTheDocument();
  });

  it('calls onSelectAll with checked=false when Select All is toggled off', () => {
    const onSelectAll = jest.fn();
    render(
      <AddSelect>
        <AddSelect.Body hideSearch>
          <AddSelect.Column
            title="All"
            showSelectAll
            multi
            allSelected
            hideSearch
            onSelectAll={onSelectAll}
          />
        </AddSelect.Body>
      </AddSelect>
    );
    // The checkbox is already checked (allSelected=true); clicking deselects it
    fireEvent.click(screen.getByRole('checkbox', { name: /all/i }));
    expect(onSelectAll).toHaveBeenCalledWith(false);
  });

  it('renders plain title wrapper (no checkbox) when showSelectAll=true but multi=false', () => {
    render(
      <AddSelect>
        <AddSelect.Body hideSearch>
          <AddSelect.Column
            title="Categories"
            showSelectAll
            multi={false}
            hideSearch
          />
        </AddSelect.Body>
      </AddSelect>
    );
    expect(screen.getByText('Categories')).toBeInTheDocument();
    // No checkbox should be present since multi is false
    expect(screen.queryByRole('checkbox')).not.toBeInTheDocument();
  });

  it('gives each Select All checkbox a unique DOM id (useId, not select-all-${title})', () => {
    // Two columns with the same title must not share a DOM id —
    // the old `select-all-${title}` scheme broke the <label for> association.
    const { container } = render(
      <AddSelect>
        <AddSelect.Body hideSearch layout="horizontal">
          <AddSelect.Column title="Items" showSelectAll multi hideSearch />
          <AddSelect.Column title="Items" showSelectAll multi hideSearch />
        </AddSelect.Body>
      </AddSelect>
    );
    const checkboxes = container.querySelectorAll('input[type="checkbox"]');
    expect(checkboxes).toHaveLength(2);
    // IDs must be present and distinct
    const id1 = checkboxes[0].id;
    const id2 = checkboxes[1].id;
    expect(id1).toBeTruthy();
    expect(id2).toBeTruthy();
    expect(id1).not.toEqual(id2);
    // IDs must NOT be the old `select-all-Items` format
    expect(id1).not.toBe('select-all-Items');
    expect(id2).not.toBe('select-all-Items');
  });

  it('reflects allSelected=true on the Select All checkbox', () => {
    render(
      <AddSelect>
        <AddSelect.Body hideSearch>
          <AddSelect.Column
            title="All"
            showSelectAll
            multi
            allSelected
            hideSearch
          />
        </AddSelect.Body>
      </AddSelect>
    );
    expect(screen.getByRole('checkbox', { name: /all/i })).toBeChecked();
  });

  it('reflects allIndeterminate=true on the Select All checkbox', () => {
    const { container } = render(
      <AddSelect>
        <AddSelect.Body hideSearch>
          <AddSelect.Column
            title="All"
            showSelectAll
            multi
            allIndeterminate
            hideSearch
          />
        </AddSelect.Body>
      </AddSelect>
    );
    // Carbon sets the indeterminate DOM property directly on the input element
    const checkbox = container.querySelector('input[type="checkbox"]');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox.indeterminate).toBe(true);
  });

  it('hides the item count tag when itemCount is 0', () => {
    render(
      <AddSelect>
        <AddSelect.Body hideSearch>
          <AddSelect.Column title="Empty" itemCount={0} hideSearch />
        </AddSelect.Body>
      </AddSelect>
    );
    // Tag should not be rendered for itemCount=0
    expect(screen.queryByText('0')).not.toBeInTheDocument();
  });

  it('renders actionsSlot even when hideSearch is true', () => {
    render(
      <AddSelect>
        <AddSelect.Body hideSearch>
          <AddSelect.Column hideSearch actionsSlot={<button>Filter</button>} />
        </AddSelect.Body>
      </AddSelect>
    );
    expect(screen.queryByRole('searchbox')).not.toBeInTheDocument();
    expect(screen.getByText('Filter')).toBeInTheDocument();
  });

  it('wires column-level onNavigate through context so child rows can call it', () => {
    const onNavigate = jest.fn();
    const { container } = render(
      <AddSelect>
        <AddSelect.Body hideSearch>
          <AddSelect.Column hideSearch onNavigate={onNavigate}>
            <AddSelect.Row
              itemId="cn1"
              title="Child nav"
              value="v1"
              hasChildren
              parentId=""
            />
          </AddSelect.Column>
        </AddSelect.Body>
      </AddSelect>
    );
    fireEvent.click(
      container.querySelector(`.${blockClass}-row__nav-indicator`)
    );
    expect(onNavigate).toHaveBeenCalledWith('cn1', 'Child nav', '');
  });

  it('forwards a ref to the column div', () => {
    const ref = React.createRef();
    render(
      <AddSelect>
        <AddSelect.Body hideSearch>
          <AddSelect.Column hideSearch ref={ref} />
        </AddSelect.Body>
      </AddSelect>
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current).toHaveClass(`${blockClass}-column`);
  });
});

// ---------------------------------------------------------------------------
// AddSelect.Body keyboard navigation
// ---------------------------------------------------------------------------

describe('AddSelect.Body keyboard navigation', () => {
  it('moves focus down with ArrowDown', () => {
    render(<ControlledAddSelect multi />);
    const grid = screen.getByRole('grid');
    const rows = screen.getAllByRole('row');

    // initialize: first row has tabIndex 0
    fireEvent.focus(grid);
    fireEvent.keyDown(grid, { key: 'ArrowDown' });

    expect(rows[1]).toHaveAttribute('tabindex', '0');
  });

  it('moves focus up with ArrowUp', () => {
    render(<ControlledAddSelect multi />);
    const grid = screen.getByRole('grid');
    const rows = screen.getAllByRole('row');

    // move to last, then back up
    fireEvent.focus(grid);
    fireEvent.keyDown(grid, { key: 'ArrowDown' });
    fireEvent.keyDown(grid, { key: 'ArrowDown' });
    fireEvent.keyDown(grid, { key: 'ArrowUp' });

    expect(rows[1]).toHaveAttribute('tabindex', '0');
  });

  it('moves focus to first row with Ctrl+Home', () => {
    render(<ControlledAddSelect multi />);
    const grid = screen.getByRole('grid');
    const rows = screen.getAllByRole('row');

    fireEvent.focus(grid);
    fireEvent.keyDown(grid, { key: 'ArrowDown' });
    fireEvent.keyDown(grid, { key: 'ArrowDown' });
    fireEvent.keyDown(grid, { key: 'Home', ctrlKey: true });

    expect(rows[0]).toHaveAttribute('tabindex', '0');
  });

  it('moves focus to last row with Ctrl+End', () => {
    render(<ControlledAddSelect multi />);
    const grid = screen.getByRole('grid');
    const rows = screen.getAllByRole('row');

    fireEvent.focus(grid);
    fireEvent.keyDown(grid, { key: 'End', ctrlKey: true });

    expect(rows[rows.length - 1]).toHaveAttribute('tabindex', '0');
  });

  it('selects the focused row when Enter is pressed', () => {
    const onItemSelect = jest.fn();
    render(<ControlledAddSelect multi onItemSelect={onItemSelect} />);
    const grid = screen.getByRole('grid');

    fireEvent.focus(grid);
    // first row should be initialized at tabIndex 0
    fireEvent.keyDown(grid, { key: 'Enter' });

    expect(onItemSelect).toHaveBeenCalledWith('1', true, 'item-1');
  });

  it('selects the focused row when Space is pressed', () => {
    const onItemSelect = jest.fn();
    render(<ControlledAddSelect multi onItemSelect={onItemSelect} />);
    const grid = screen.getByRole('grid');

    fireEvent.focus(grid);
    fireEvent.keyDown(grid, { key: ' ' });

    expect(onItemSelect).toHaveBeenCalledWith('1', true, 'item-1');
  });

  it('reuses cached rows across consecutive key events without re-querying the DOM', () => {
    // Spy on querySelectorAll to count DOM queries
    const qsaSpy = jest.spyOn(Element.prototype, 'querySelectorAll');

    render(<ControlledAddSelect multi />);
    const grid = screen.getByRole('grid');
    fireEvent.focus(grid);

    // Reset count after initial render/focus so we only count key-event queries
    qsaSpy.mockClear();

    // Fire multiple navigation keys
    fireEvent.keyDown(grid, { key: 'ArrowDown' });
    fireEvent.keyDown(grid, { key: 'ArrowDown' });
    fireEvent.keyDown(grid, { key: 'ArrowUp' });

    // With caching, querySelectorAll('[role="row"]') should fire at most once
    // (the first key event populates the cache; subsequent key events use it)
    const rowQueries = qsaSpy.mock.calls.filter(
      (args) => args[0] === '[role="row"]'
    );
    expect(rowQueries.length).toBeLessThanOrEqual(1);

    qsaSpy.mockRestore();
  });
});

// ---------------------------------------------------------------------------
// AddSelect.SelectionSummary
// ---------------------------------------------------------------------------

describe('AddSelect.SelectionSummary', () => {
  const items = [
    { id: '1', title: 'Selected A', subtitle: 'Sub A', value: 'a' },
    { id: '2', title: 'Selected B', value: 'b' },
  ];

  it('renders the panel title', () => {
    render(
      <AddSelect>
        <AddSelect.SelectionSummary title="My selections" />
      </AddSelect>
    );
    expect(screen.getByText('My selections')).toBeInTheDocument();
  });

  it('renders the count badge when selectedItemCount is provided', () => {
    render(
      <AddSelect>
        <AddSelect.SelectionSummary selectedItemCount={2} />
      </AddSelect>
    );
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('does not render the count badge when count is omitted', () => {
    render(
      <AddSelect>
        <AddSelect.SelectionSummary />
      </AddSelect>
    );
    // The panel renders but no numeric badge should be present
    expect(
      document.querySelector(`.${blockClass}__selection-summary`)
    ).toBeInTheDocument();
    expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
  });

  it('renders the edit icon button when showEditIcon is true', () => {
    render(
      <AddSelect>
        <AddSelect.SelectionSummary
          selectedItemCount={2}
          showEditIcon
          editIconDescription="Edit selections"
          onEdit={jest.fn()}
        />
      </AddSelect>
    );
    expect(
      screen.getByRole('button', { name: /edit selections/i })
    ).toBeInTheDocument();
  });

  it('calls onEdit when the edit button is clicked', () => {
    const onEdit = jest.fn();
    render(
      <AddSelect>
        <AddSelect.SelectionSummary
          selectedItemCount={2}
          showEditIcon
          editIconDescription="Edit"
          onEdit={onEdit}
        />
      </AddSelect>
    );
    fireEvent.click(screen.getByRole('button', { name: /edit/i }));
    expect(onEdit).toHaveBeenCalledTimes(1);
  });

  it('renders children passed to the body', () => {
    render(
      <AddSelect>
        <AddSelect.SelectionSummary selectedItemCount={items.length}>
          {items.map((item) => (
            <p key={item.id}>{item.title}</p>
          ))}
        </AddSelect.SelectionSummary>
      </AddSelect>
    );
    expect(screen.getByText('Selected A')).toBeInTheDocument();
    expect(screen.getByText('Selected B')).toBeInTheDocument();
  });

  it('renders emptyState when count is 0', () => {
    render(
      <AddSelect>
        <AddSelect.SelectionSummary
          selectedItemCount={0}
          emptyState={<p>No items selected</p>}
        />
      </AddSelect>
    );
    expect(screen.getByText('No items selected')).toBeInTheDocument();
  });

  it('renders emptyState when count is not provided', () => {
    render(
      <AddSelect>
        <AddSelect.SelectionSummary emptyState={<p>No items selected</p>} />
      </AddSelect>
    );
    expect(screen.getByText('No items selected')).toBeInTheDocument();
  });

  it('renders emptyState when count is 0 even if children map is empty', () => {
    // Empty array from .map() is truthy — count gate must still fire emptyState
    render(
      <AddSelect>
        <AddSelect.SelectionSummary
          selectedItemCount={0}
          emptyState={<p>No items selected</p>}>
          {[].map((item) => (
            <p key={item.id}>{item.title}</p>
          ))}
        </AddSelect.SelectionSummary>
      </AddSelect>
    );
    expect(screen.getByText('No items selected')).toBeInTheDocument();
  });

  it('does not render emptyState when count is greater than 0', () => {
    render(
      <AddSelect>
        <AddSelect.SelectionSummary
          selectedItemCount={1}
          emptyState={<p>No items selected</p>}>
          <p>Some child</p>
        </AddSelect.SelectionSummary>
      </AddSelect>
    );
    expect(screen.queryByText('No items selected')).not.toBeInTheDocument();
    expect(screen.getByText('Some child')).toBeInTheDocument();
  });

  it('renders children when selectedItemCount is greater than 0', () => {
    render(
      <AddSelect>
        <AddSelect.SelectionSummary selectedItemCount={2}>
          <p>Item A</p>
          <p>Item B</p>
        </AddSelect.SelectionSummary>
      </AddSelect>
    );
    expect(screen.getByText('Item A')).toBeInTheDocument();
    expect(screen.getByText('Item B')).toBeInTheDocument();
  });

  it('renders custom headerContent slot instead of default header', () => {
    render(
      <AddSelect>
        <AddSelect.SelectionSummary
          selectedItemCount={2}
          headerContent={<div>Custom header</div>}
        />
      </AddSelect>
    );
    expect(screen.getByText('Custom header')).toBeInTheDocument();
    expect(screen.queryByText('Selected items')).not.toBeInTheDocument();
  });

  it('renders the headerActions slot alongside the edit icon', () => {
    render(
      <AddSelect>
        <AddSelect.SelectionSummary
          selectedItemCount={2}
          showEditIcon
          editIconDescription="Edit"
          onEdit={jest.fn()}
          headerActions={<button>Custom action</button>}
        />
      </AddSelect>
    );
    expect(screen.getByText('Custom action')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /edit/i })).toBeInTheDocument();
  });

  it('forwards a ref to the selection summary div', () => {
    const ref = React.createRef();
    render(
      <AddSelect>
        <AddSelect.SelectionSummary selectedItemCount={0} ref={ref} />
      </AddSelect>
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current).toHaveClass(`${blockClass}__selection-summary`);
  });
});

// ---------------------------------------------------------------------------
// AddSelect.SelectionSummaryItem
// ---------------------------------------------------------------------------

describe('AddSelect.SelectionSummaryItem', () => {
  const item = {
    id: 'x1',
    title: 'Item X',
    subtitle: 'Subtitle X',
    value: 'vx',
  };

  it('renders item title and subtitle in default (non-accordion) mode', () => {
    render(
      <AddSelect>
        <AddSelect.SelectionSummaryItem item={item} />
      </AddSelect>
    );
    expect(screen.getByText('Item X')).toBeInTheDocument();
    expect(screen.getByText('Subtitle X')).toBeInTheDocument();
  });

  it('renders nothing in the content area when item has no itemDetails (defaultContent returns null)', () => {
    // defaultContent now renders ONLY itemDetails. An item without itemDetails
    // returns null, so the content area is empty.
    const minimalItem = {
      id: 'm1',
      title: 'Minimal',
      subtitle: 'sub',
      selected: false,
    };
    const { container } = render(
      <AddSelect>
        <AddSelect.SelectionSummaryItem item={minimalItem} />
      </AddSelect>
    );
    expect(
      container.querySelector(`.${blockClass}__selection-summary-item-content`)
    ).toBeEmptyDOMElement();
  });

  it('renders remove button when onRemove is provided', () => {
    render(
      <AddSelect>
        <AddSelect.SelectionSummaryItem
          item={item}
          onRemove={jest.fn()}
          removeButtonLabel="Remove item"
        />
      </AddSelect>
    );
    expect(
      screen.getByRole('button', { name: /remove item/i })
    ).toBeInTheDocument();
  });

  it('calls onRemove with the item ID when remove button is clicked', () => {
    const onRemove = jest.fn();
    render(
      <AddSelect>
        <AddSelect.SelectionSummaryItem
          item={item}
          onRemove={onRemove}
          removeButtonLabel="Remove item"
        />
      </AddSelect>
    );
    fireEvent.click(screen.getByRole('button', { name: /remove item/i }));
    expect(onRemove).toHaveBeenCalledWith('x1');
  });

  it('renders in accordion mode when useAccordion is true', () => {
    render(
      <AddSelect>
        <AddSelect.SelectionSummaryItem item={item} useAccordion />
      </AddSelect>
    );
    // Carbon Accordion renders a button toggle
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('renders children content with highest priority', () => {
    render(
      <AddSelect>
        <AddSelect.SelectionSummaryItem item={item}>
          <p>custom content</p>
        </AddSelect.SelectionSummaryItem>
      </AddSelect>
    );
    expect(screen.getByText('custom content')).toBeInTheDocument();
    expect(screen.queryByText('Item X')).not.toBeInTheDocument();
  });

  it('renders via renderItem when provided', () => {
    render(
      <AddSelect>
        <AddSelect.SelectionSummaryItem
          item={item}
          renderItem={(i) => <p>rendered {i.title}</p>}
        />
      </AddSelect>
    );
    expect(screen.getByText('rendered Item X')).toBeInTheDocument();
  });

  it('renders the remove button inside the accordion title when useAccordion and onRemove are both set', () => {
    // The remove IconButton is placed inside the Carbon Accordion heading button
    // by the component, which produces an invalid <button>-in-<button> nesting
    // that React warns about via console.error. Suppress the known error for
    // this specific structural assertion so the test suite remains clean.
    const consoleError = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    const { container } = render(
      <AddSelect>
        <AddSelect.SelectionSummaryItem
          item={item}
          useAccordion
          onRemove={jest.fn()}
          removeButtonLabel="Remove item"
        />
      </AddSelect>
    );
    expect(
      container.querySelector(
        `.${blockClass}__selection-summary-item-remove-button`
      )
    ).toBeInTheDocument();
    consoleError.mockRestore();
  });

  it('uses renderAccordionTitle instead of the default title in accordion mode', () => {
    render(
      <AddSelect>
        <AddSelect.SelectionSummaryItem
          item={item}
          useAccordion
          renderAccordionTitle={(i) => <span>Custom title: {i.title}</span>}
        />
      </AddSelect>
    );
    expect(screen.getByText('Custom title: Item X')).toBeInTheDocument();
  });

  it('uses renderAccordionBody instead of defaultContent in accordion mode', () => {
    render(
      <AddSelect>
        <AddSelect.SelectionSummaryItem
          item={item}
          useAccordion
          renderAccordionBody={(i) => <p>Body for {i.title}</p>}
        />
      </AddSelect>
    );
    // Open the accordion to reveal its body content
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByText(`Body for ${item.title}`)).toBeInTheDocument();
  });

  it('does not render arbitrary item fields (e.g. value, Region) via defaultContent', () => {
    // defaultContent now renders ONLY itemDetails — arbitrary item props that
    // are developer identifiers must not appear as visible UI labels.
    const richItem = {
      id: 'r1',
      title: 'Rich item',
      value: 'rv',
      Region: 'US East',
    };
    render(
      <AddSelect>
        <AddSelect.SelectionSummaryItem item={richItem} />
      </AddSelect>
    );
    expect(screen.queryByText('Region')).not.toBeInTheDocument();
    expect(screen.queryByText('US East')).not.toBeInTheDocument();
    expect(screen.queryByText('value')).not.toBeInTheDocument();
    expect(screen.queryByText('rv')).not.toBeInTheDocument();
  });

  it('renders itemDetails entries via defaultContent', () => {
    const detailedItem = {
      id: 'd1',
      title: 'Detailed',
      value: 'dv',
      itemDetails: [
        { label: 'Tier', value: 'Gold' },
        { label: 'Capacity', value: '10 TB' },
      ],
    };
    render(
      <AddSelect>
        <AddSelect.SelectionSummaryItem item={detailedItem} />
      </AddSelect>
    );
    expect(screen.getByText('Tier')).toBeInTheDocument();
    expect(screen.getByText('Gold')).toBeInTheDocument();
    expect(screen.getByText('Capacity')).toBeInTheDocument();
    expect(screen.getByText('10 TB')).toBeInTheDocument();
  });

  it('renders item without subtitle without a subtitle element', () => {
    const noSubItem = { id: 'ns1', title: 'No sub', value: 'nsv' };
    const { container } = render(
      <AddSelect>
        <AddSelect.SelectionSummaryItem item={noSubItem} />
      </AddSelect>
    );
    expect(screen.getByText('No sub')).toBeInTheDocument();
    expect(
      container.querySelector(`.${blockClass}__selection-summary-item-subtitle`)
    ).not.toBeInTheDocument();
  });

  it('forwards a ref to the item wrapper div', () => {
    const ref = React.createRef();
    render(
      <AddSelect>
        <AddSelect.SelectionSummaryItem item={item} ref={ref} />
      </AddSelect>
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current).toHaveClass(`${blockClass}__selection-summary-item`);
  });
});

// ---------------------------------------------------------------------------
// AddSelect.ItemPanel
// ---------------------------------------------------------------------------

describe('AddSelect.ItemPanel', () => {
  const item = {
    id: 'p1',
    title: 'Panel item',
    value: 'vp',
    itemDetails: [
      { label: 'Owner', value: 'Alice' },
      { label: 'Size', value: '4 GB' },
    ],
  };

  it('renders the panel title', () => {
    render(
      <AddSelect>
        <AddSelect.ItemPanel title="Item details" item={item} />
      </AddSelect>
    );
    expect(screen.getByText('Item details')).toBeInTheDocument();
  });

  it('renders itemDetails key/value pairs by default', () => {
    render(
      <AddSelect>
        <AddSelect.ItemPanel item={item} />
      </AddSelect>
    );
    expect(screen.getByText('Owner')).toBeInTheDocument();
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Size')).toBeInTheDocument();
    expect(screen.getByText('4 GB')).toBeInTheDocument();
  });

  it('renders the close button when onClose is provided', () => {
    render(
      <AddSelect>
        <AddSelect.ItemPanel
          item={item}
          onClose={jest.fn()}
          closeIconDescription="Close panel"
        />
      </AddSelect>
    );
    expect(
      screen.getByRole('button', { name: /close panel/i })
    ).toBeInTheDocument();
  });

  it('calls onClose when the close button is clicked', () => {
    const onClose = jest.fn();
    render(
      <AddSelect>
        <AddSelect.ItemPanel
          item={item}
          onClose={onClose}
          closeIconDescription="Close"
        />
      </AddSelect>
    );
    fireEvent.click(screen.getByRole('button', { name: /close/i }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('renders children with highest priority over default item rendering', () => {
    render(
      <AddSelect>
        <AddSelect.ItemPanel item={item}>
          <p>custom panel body</p>
        </AddSelect.ItemPanel>
      </AddSelect>
    );
    expect(screen.getByText('custom panel body')).toBeInTheDocument();
    expect(screen.queryByText('Owner')).not.toBeInTheDocument();
  });

  it('renders via renderItem when provided', () => {
    render(
      <AddSelect>
        <AddSelect.ItemPanel
          item={item}
          renderItem={(i) => <p>detail: {i.title}</p>}
        />
      </AddSelect>
    );
    expect(screen.getByText('detail: Panel item')).toBeInTheDocument();
  });

  it('does not render a close button when onClose is not provided', () => {
    render(
      <AddSelect>
        <AddSelect.ItemPanel item={item} />
      </AddSelect>
    );
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('renders nothing in the body when item is undefined', () => {
    const { container } = render(
      <AddSelect>
        <AddSelect.ItemPanel />
      </AddSelect>
    );
    expect(
      container.querySelector(`.${blockClass}__item-summary-panel-body`)
    ).toBeEmptyDOMElement();
  });

  it('renders nothing in the body when itemDetails is empty', () => {
    const emptyItem = {
      id: 'e1',
      title: 'Empty',
      value: 'ev',
      itemDetails: {},
    };
    const { container } = render(
      <AddSelect>
        <AddSelect.ItemPanel item={emptyItem} />
      </AddSelect>
    );
    expect(
      container.querySelector(`.${blockClass}__item-summary-panel-body`)
    ).toBeEmptyDOMElement();
  });

  it('does not crash when renderItem is provided but item is undefined', () => {
    expect(() =>
      render(
        <AddSelect>
          <AddSelect.ItemPanel renderItem={(i) => <p>{i.title}</p>} />
        </AddSelect>
      )
    ).not.toThrow();
  });

  it('forwards a ref to the panel div', () => {
    const ref = React.createRef();
    render(
      <AddSelect>
        <AddSelect.ItemPanel item={item} ref={ref} />
      </AddSelect>
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current).toHaveClass(`${blockClass}__item-summary-panel`);
  });

  it('adds the --open modifier class when open is true', () => {
    const { container } = render(
      <AddSelect>
        <AddSelect.ItemPanel open />
      </AddSelect>
    );
    expect(
      container.querySelector(`.${blockClass}__item-summary-panel`)
    ).toHaveClass(`${blockClass}__item-summary-panel--open`);
  });

  it('does not add the --open modifier class when open is false', () => {
    const { container } = render(
      <AddSelect>
        <AddSelect.ItemPanel open={false} />
      </AddSelect>
    );
    expect(
      container.querySelector(`.${blockClass}__item-summary-panel`)
    ).not.toHaveClass(`${blockClass}__item-summary-panel--open`);
  });

  it('does not add the --open modifier class when open is omitted', () => {
    const { container } = render(
      <AddSelect>
        <AddSelect.ItemPanel />
      </AddSelect>
    );
    expect(
      container.querySelector(`.${blockClass}__item-summary-panel`)
    ).not.toHaveClass(`${blockClass}__item-summary-panel--open`);
  });
});
