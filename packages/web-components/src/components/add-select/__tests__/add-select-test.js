/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { fixture, html, expect } from '@open-wc/testing';
import '@carbon/web-components/es/components/add-select/index.js';

import { prefix } from '@carbon/web-components/es/globals/settings.js';

const blockClass = `${prefix}--add-select__next`;
const rowBlockClass = `${prefix}--add-select__next-row`;

// ---------------------------------------------------------------------------
// cds-add-select (root)
// ---------------------------------------------------------------------------

describe(`${prefix}-add-select`, () => {
  it('renders the root wrapper div', async () => {
    const el = await fixture(html`<cds-add-select></cds-add-select>`);
    expect(el.shadowRoot?.querySelector(`.${blockClass}`)).to.exist;
  });

  it('renders slotted children', async () => {
    const el = await fixture(
      html`<cds-add-select><span id="child">hello</span></cds-add-select>`
    );
    expect(el.querySelector('#child')).to.exist;
  });

  it('defaults multi to false', async () => {
    const el = await fixture(html`<cds-add-select></cds-add-select>`);
    expect(el.multi).to.be.false;
  });

  it('reflects multi=true attribute', async () => {
    const el = await fixture(html`<cds-add-select multi></cds-add-select>`);
    expect(el.multi).to.be.true;
    expect(el.hasAttribute('multi')).to.be.true;
  });
});

// ---------------------------------------------------------------------------
// cds-add-select-body
// ---------------------------------------------------------------------------

describe(`${prefix}-add-select-body`, () => {
  it('renders the body wrapper', async () => {
    const el = await fixture(
      html`<cds-add-select-body hide-search></cds-add-select-body>`
    );
    expect(el.shadowRoot?.querySelector(`.${blockClass}__body`)).to.exist;
  });

  it('renders the search input by default', async () => {
    const el = await fixture(
      html`<cds-add-select-body
        global-search-label="Search"></cds-add-select-body>`
    );
    expect(el.shadowRoot?.querySelector('cds-search')).to.exist;
  });

  it('hides the search input when hide-search is set', async () => {
    const el = await fixture(
      html`<cds-add-select-body hide-search></cds-add-select-body>`
    );
    expect(el.shadowRoot?.querySelector('cds-search')).to.be.null;
  });

  it('renders items-label text', async () => {
    const el = await fixture(
      html`<cds-add-select-body
        hide-search
        items-label="All items"
        item-count="5"></cds-add-select-body>`
    );
    await el.updateComplete;
    const label = el.shadowRoot?.querySelector(`.${blockClass}__tags-label`);
    expect(label?.textContent?.trim()).to.equal('All items');
  });

  it('renders item count tag when item-count is provided', async () => {
    const el = await fixture(
      html`<cds-add-select-body
        hide-search
        item-count="42"></cds-add-select-body>`
    );
    await el.updateComplete;
    const tag = el.shadowRoot?.querySelector('cds-tag');
    expect(tag?.textContent?.trim()).to.equal('42');
  });

  it('does not render item count tag when item-count is not provided', async () => {
    const el = await fixture(
      html`<cds-add-select-body hide-search></cds-add-select-body>`
    );
    expect(el.shadowRoot?.querySelector('cds-tag')).to.be.null;
  });

  it('renders the grid container with role="grid"', async () => {
    const el = await fixture(
      html`<cds-add-select-body hide-search></cds-add-select-body>`
    );
    expect(el.shadowRoot?.querySelector('[role="grid"]')).to.exist;
  });

  it('fires cds-add-select-body-search when the search input changes', async () => {
    const el = await fixture(
      html`<cds-add-select-body
        global-search-label="Search"></cds-add-select-body>`
    );
    await el.updateComplete;

    let firedDetail = null;
    el.addEventListener(`${prefix}-add-select-body-search`, (e) => {
      firedDetail = e.detail;
    });

    const cdsSearch = el.shadowRoot?.querySelector('cds-search');
    cdsSearch.dispatchEvent(
      new CustomEvent('cds-search-input', {
        bubbles: true,
        composed: true,
        detail: { value: 'hello' },
      })
    );

    expect(firedDetail).to.not.be.null;
    expect(firedDetail.searchTerm).to.equal('hello');
  });

  it('switches label to searchResultsTitle when a search term is entered', async () => {
    const el = await fixture(
      html`<cds-add-select-body
        items-label="All items"
        search-results-title="Matches"
        global-search-label="Search"></cds-add-select-body>`
    );
    await el.updateComplete;

    expect(
      el.shadowRoot
        ?.querySelector(`.${blockClass}__tags-label`)
        ?.textContent?.trim()
    ).to.equal('All items');

    const cdsSearch = el.shadowRoot?.querySelector('cds-search');
    cdsSearch.dispatchEvent(
      new CustomEvent('cds-search-input', {
        bubbles: true,
        composed: true,
        detail: { value: 'foo' },
      })
    );
    await el.updateComplete;

    expect(
      el.shadowRoot
        ?.querySelector(`.${blockClass}__tags-label`)
        ?.textContent?.trim()
    ).to.equal('Matches');
  });

  it('renders breadcrumbs when path entries are provided', async () => {
    const el = await fixture(
      html`<cds-add-select-body hide-search></cds-add-select-body>`
    );
    el.path = [
      { id: 'root', title: 'Root' },
      { id: 'child', title: 'Child Level' },
    ];
    await el.updateComplete;

    expect(el.shadowRoot?.querySelector('cds-breadcrumb')).to.exist;
    expect(el.shadowRoot?.textContent).to.include('Root');
    expect(el.shadowRoot?.textContent).to.include('Child Level');
  });

  it('fires cds-add-select-body-breadcrumb-click when a breadcrumb link is clicked', async () => {
    const el = await fixture(
      html`<cds-add-select-body hide-search></cds-add-select-body>`
    );
    el.path = [
      { id: 'root', title: 'Root' },
      { id: 'child', title: 'Child Level' },
    ];
    await el.updateComplete;

    let firedDetail = null;
    el.addEventListener(`${prefix}-add-select-body-breadcrumb-click`, (e) => {
      firedDetail = e.detail;
    });

    const link = el.shadowRoot?.querySelector('cds-link');
    link.dispatchEvent(
      new MouseEvent('click', { bubbles: true, composed: true })
    );

    expect(firedDetail).to.not.be.null;
    expect(firedDetail.index).to.equal(0);
  });
});

// ---------------------------------------------------------------------------
// cds-add-select-column
// ---------------------------------------------------------------------------

describe(`${prefix}-add-select-column`, () => {
  it('renders the column wrapper', async () => {
    const el = await fixture(
      html`<cds-add-select-column hide-search></cds-add-select-column>`
    );
    expect(el.shadowRoot?.querySelector(`.${blockClass}-column`)).to.exist;
  });

  it('renders a search input by default', async () => {
    const el = await fixture(
      html`<cds-add-select-column
        search-label="Column search"></cds-add-select-column>`
    );
    expect(el.shadowRoot?.querySelector('cds-search')).to.exist;
  });

  it('hides the search input when hide-search is set', async () => {
    const el = await fixture(
      html`<cds-add-select-column hide-search></cds-add-select-column>`
    );
    expect(el.shadowRoot?.querySelector('cds-search')).to.be.null;
  });

  it('renders the column title', async () => {
    const el = await fixture(
      html`<cds-add-select-column
        title="My Column"
        hide-search></cds-add-select-column>`
    );
    expect(el.shadowRoot?.textContent).to.include('My Column');
  });

  it('renders item count tag when item-count > 0 and title is set', async () => {
    const el = await fixture(
      html`<cds-add-select-column
        title="Items"
        item-count="7"
        hide-search></cds-add-select-column>`
    );
    await el.updateComplete;
    const tag = el.shadowRoot?.querySelector('cds-tag');
    expect(tag?.textContent?.trim()).to.equal('7');
  });

  it('does not render item count tag when item-count is 0', async () => {
    const el = await fixture(
      html`<cds-add-select-column
        title="Empty"
        item-count="0"
        hide-search></cds-add-select-column>`
    );
    expect(el.shadowRoot?.querySelector('cds-tag')).to.be.null;
  });

  it('renders a Select All checkbox when show-select-all and multi are true', async () => {
    const el = await fixture(
      html`<cds-add-select-column
        title="All"
        show-select-all
        multi
        item-count="3"
        hide-search></cds-add-select-column>`
    );
    await el.updateComplete;
    expect(el.shadowRoot?.querySelector(`.${blockClass}-column__select-all`)).to
      .exist;
  });

  it('does not render Select All when show-select-all is true but multi is false', async () => {
    const el = await fixture(
      html`<cds-add-select-column
        title="Categories"
        show-select-all
        hide-search></cds-add-select-column>`
    );
    expect(el.shadowRoot?.querySelector(`.${blockClass}-column__select-all`)).to
      .be.null;
    expect(el.shadowRoot?.querySelector(`.${blockClass}-column__title-wrapper`))
      .to.exist;
  });

  it('fires cds-add-select-column-select-all with checked=true when toggled on', async () => {
    const el = await fixture(
      html`<cds-add-select-column
        title="All"
        show-select-all
        multi
        hide-search></cds-add-select-column>`
    );
    await el.updateComplete;

    let firedDetail = null;
    el.addEventListener(`${prefix}-add-select-column-select-all`, (e) => {
      firedDetail = e.detail;
    });

    const checkbox = el.shadowRoot?.querySelector(
      `.${blockClass}-column__select-all`
    );
    checkbox.dispatchEvent(
      new CustomEvent('cds-checkbox-changed', {
        bubbles: true,
        composed: true,
        detail: { checked: true },
      })
    );

    expect(firedDetail?.checked).to.be.true;
  });

  it('fires cds-add-select-column-search when column search input changes', async () => {
    const el = await fixture(
      html`<cds-add-select-column
        search-label="Search"></cds-add-select-column>`
    );
    await el.updateComplete;

    let firedDetail = null;
    el.addEventListener(`${prefix}-add-select-column-search`, (e) => {
      firedDetail = e.detail;
    });

    const cdsSearch = el.shadowRoot?.querySelector('cds-search');
    cdsSearch.dispatchEvent(
      new CustomEvent('cds-search-input', {
        bubbles: true,
        composed: true,
        detail: { value: 'foo' },
      })
    );

    expect(firedDetail?.searchTerm).to.equal('foo');
  });

  it('propagates multi attribute to slotted rows on slot change', async () => {
    const el = await fixture(
      html`<cds-add-select-column multi hide-search>
        <cds-add-select-row
          id="test-row"
          item-id="r1"
          title="Row 1"
          value="v1"></cds-add-select-row>
      </cds-add-select-column>`
    );
    await el.updateComplete;

    const row = el.querySelector('#test-row');
    expect(row.hasAttribute('_column-multi')).to.be.true;
  });

  it('removes _column-multi attribute from rows when multi is set to false', async () => {
    const el = await fixture(
      html`<cds-add-select-column multi hide-search>
        <cds-add-select-row
          id="test-row"
          item-id="r1"
          title="Row 1"
          value="v1"></cds-add-select-row>
      </cds-add-select-column>`
    );
    await el.updateComplete;

    el.multi = false;
    await el.updateComplete;

    const row = el.querySelector('#test-row');
    expect(row.hasAttribute('_column-multi')).to.be.false;
  });
});

// ---------------------------------------------------------------------------
// cds-add-select-row
// ---------------------------------------------------------------------------

describe(`${prefix}-add-select-row`, () => {
  it('renders with role="row" and aria-selected="false" by default', async () => {
    const el = await fixture(
      html`<cds-add-select-row
        item-id="r1"
        title="Row 1"
        value="v1"></cds-add-select-row>`
    );
    const rowDiv = el.shadowRoot?.querySelector('[role="row"]');
    expect(rowDiv).to.exist;
    expect(rowDiv.getAttribute('aria-selected')).to.equal('false');
  });

  it('renders title and subtitle text', async () => {
    const el = await fixture(
      html`<cds-add-select-row
        item-id="r1"
        title="My title"
        subtitle="My subtitle"
        value="v1"></cds-add-select-row>`
    );
    expect(
      el.shadowRoot
        ?.querySelector(`.${rowBlockClass}__title`)
        ?.textContent?.trim()
    ).to.equal('My title');
    expect(
      el.shadowRoot
        ?.querySelector(`.${rowBlockClass}__subtitle`)
        ?.textContent?.trim()
    ).to.equal('My subtitle');
  });

  it('does not render a subtitle element when subtitle is empty', async () => {
    const el = await fixture(
      html`<cds-add-select-row
        item-id="r1"
        title="Row 1"
        value="v1"></cds-add-select-row>`
    );
    expect(el.shadowRoot?.querySelector(`.${rowBlockClass}__subtitle`)).to.be
      .null;
  });

  it('renders a radio button by default (single-select)', async () => {
    const el = await fixture(
      html`<cds-add-select-row
        item-id="r1"
        title="Row 1"
        value="v1"></cds-add-select-row>`
    );
    expect(el.shadowRoot?.querySelector('cds-radio-button')).to.exist;
    expect(el.shadowRoot?.querySelector('cds-checkbox')).to.be.null;
  });

  it('renders a checkbox when _column-multi attribute is set', async () => {
    const el = await fixture(
      html`<cds-add-select-row
        item-id="r1"
        title="Row 1"
        value="v1"
        _column-multi></cds-add-select-row>`
    );
    expect(el.shadowRoot?.querySelector('cds-checkbox')).to.exist;
    expect(el.shadowRoot?.querySelector('cds-radio-button')).to.be.null;
  });

  it('fires cds-add-select-row-select with correct detail', async () => {
    const el = await fixture(
      html`<cds-add-select-row
        item-id="r1"
        title="Row 1"
        value="v1"></cds-add-select-row>`
    );
    await el.updateComplete;

    let firedDetail = null;
    el.addEventListener(`${prefix}-add-select-row-select`, (e) => {
      firedDetail = e.detail;
    });

    el.selected = true;
    el._emitSelectionEvent();

    expect(firedDetail).to.not.be.null;
    expect(firedDetail.itemId).to.equal('r1');
    expect(firedDetail.selected).to.be.true;
    expect(firedDetail.value).to.equal('v1');
  });

  it('does not fire cds-add-select-row-select when disabled', async () => {
    const el = await fixture(
      html`<cds-add-select-row
        item-id="r1"
        title="Row 1"
        value="v1"
        disabled></cds-add-select-row>`
    );
    await el.updateComplete;

    let eventFired = false;
    el.addEventListener(`${prefix}-add-select-row-select`, () => {
      eventFired = true;
    });

    const radio = el.shadowRoot?.querySelector('cds-radio-button');
    radio.dispatchEvent(
      new CustomEvent('cds-radio-button-changed', {
        bubbles: true,
        composed: true,
        detail: { checked: true },
      })
    );
    await el.updateComplete;

    expect(eventFired).to.be.false;
  });

  it('applies the disabled class when disabled is set', async () => {
    const el = await fixture(
      html`<cds-add-select-row
        item-id="r1"
        title="Row 1"
        value="v1"
        disabled></cds-add-select-row>`
    );
    expect(el.shadowRoot?.querySelector(`.${rowBlockClass}--disabled`)).to
      .exist;
  });

  it('renders the nav-indicator when has-children is set', async () => {
    const el = await fixture(
      html`<cds-add-select-row
        item-id="r1"
        title="Row 1"
        value="v1"
        has-children></cds-add-select-row>`
    );
    expect(el.shadowRoot?.querySelector(`.${rowBlockClass}__nav-indicator`)).to
      .exist;
  });

  it('does not render the nav-indicator when has-children is not set', async () => {
    const el = await fixture(
      html`<cds-add-select-row
        item-id="r1"
        title="Row 1"
        value="v1"></cds-add-select-row>`
    );
    expect(el.shadowRoot?.querySelector(`.${rowBlockClass}__nav-indicator`)).to
      .be.null;
  });

  it('nav-indicator has aria-label "Navigate into <title>"', async () => {
    const el = await fixture(
      html`<cds-add-select-row
        item-id="r1"
        title="Row 1"
        value="v1"
        has-children></cds-add-select-row>`
    );
    const navIndicator = el.shadowRoot?.querySelector(
      `.${rowBlockClass}__nav-indicator`
    );
    expect(navIndicator?.getAttribute('aria-label')).to.equal(
      'Navigate into Row 1'
    );
  });

  it('fires cds-add-select-row-navigate when nav-indicator is clicked', async () => {
    const el = await fixture(
      html`<cds-add-select-row
        item-id="r1"
        title="Row 1"
        value="v1"
        has-children
        parent-id="root"></cds-add-select-row>`
    );
    await el.updateComplete;

    let firedDetail = null;
    el.addEventListener(`${prefix}-add-select-row-navigate`, (e) => {
      firedDetail = e.detail;
    });

    const navIndicator = el.shadowRoot?.querySelector(
      `.${rowBlockClass}__nav-indicator`
    );
    navIndicator.dispatchEvent(
      new MouseEvent('click', { bubbles: true, composed: true })
    );

    expect(firedDetail).to.not.be.null;
    expect(firedDetail.itemId).to.equal('r1');
    expect(firedDetail.title).to.equal('Row 1');
    expect(firedDetail.parentId).to.equal('root');
  });

  it('fires cds-add-select-row-item-panel-click when view icon button is clicked', async () => {
    const el = await fixture(
      html`<cds-add-select-row
        item-id="r1"
        title="Row 1"
        value="v1"
        has-item-panel
        item-panel-icon-description="View details"></cds-add-select-row>`
    );
    await el.updateComplete;

    let firedDetail = null;
    el.addEventListener(`${prefix}-add-select-row-item-panel-click`, (e) => {
      firedDetail = e.detail;
    });

    const iconBtn = el.shadowRoot?.querySelector(
      `.${rowBlockClass}__view-item-panel`
    );
    iconBtn.dispatchEvent(
      new MouseEvent('click', { bubbles: true, composed: true })
    );

    expect(firedDetail?.itemId).to.equal('r1');
  });

  it('does not render the item panel icon button when has-item-panel is not set', async () => {
    const el = await fixture(
      html`<cds-add-select-row
        item-id="r1"
        title="Row 1"
        value="v1"></cds-add-select-row>`
    );
    expect(el.shadowRoot?.querySelector(`.${rowBlockClass}__view-item-panel`))
      .to.be.null;
  });

  it('renders in skeleton mode with aria-hidden when skeleton is set', async () => {
    const el = await fixture(
      html`<cds-add-select-row
        item-id="sk1"
        title="Loading"
        value="v"
        skeleton></cds-add-select-row>`
    );
    const skeletonEl = el.shadowRoot?.querySelector(
      `.${rowBlockClass}--skeleton`
    );
    expect(skeletonEl).to.exist;
    expect(skeletonEl.getAttribute('aria-hidden')).to.equal('true');
  });

  it('renders skeleton-icon when skeleton is set and icon slot is populated', async () => {
    const el = await fixture(
      html`<cds-add-select-row item-id="sk2" title="Loading" value="v" skeleton>
        <svg slot="icon" id="row-icon"></svg>
      </cds-add-select-row>`
    );
    await el.updateComplete;
    expect(el.shadowRoot?.querySelector('cds-skeleton-icon')).to.exist;
  });
});

// ---------------------------------------------------------------------------
// cds-add-select-selection-summary
// ---------------------------------------------------------------------------

describe(`${prefix}-add-select-selection-summary`, () => {
  it('renders the selection summary wrapper', async () => {
    const el = await fixture(
      html`<cds-add-select-selection-summary></cds-add-select-selection-summary>`
    );
    expect(el.shadowRoot?.querySelector(`.${blockClass}__selection-summary`)).to
      .exist;
  });

  it('renders the panel title', async () => {
    const el = await fixture(
      html`<cds-add-select-selection-summary
        title="My selections"></cds-add-select-selection-summary>`
    );
    const titleEl = el.shadowRoot?.querySelector(
      `.${blockClass}__selection-summary-title`
    );
    expect(titleEl?.textContent?.trim()).to.equal('My selections');
  });

  it('uses "Selected items" as the default title', async () => {
    const el = await fixture(
      html`<cds-add-select-selection-summary></cds-add-select-selection-summary>`
    );
    expect(
      el.shadowRoot
        ?.querySelector(`.${blockClass}__selection-summary-title`)
        ?.textContent?.trim()
    ).to.equal('Selected items');
  });

  it('renders the count badge when selected-item-count is provided', async () => {
    const el = await fixture(
      html`<cds-add-select-selection-summary
        selected-item-count="2"></cds-add-select-selection-summary>`
    );
    const tag = el.shadowRoot?.querySelector('cds-tag');
    expect(tag?.textContent?.trim()).to.equal('2');
  });

  it('does not render the count badge when selected-item-count is not provided', async () => {
    const el = await fixture(
      html`<cds-add-select-selection-summary></cds-add-select-selection-summary>`
    );
    expect(el.shadowRoot?.querySelector('cds-tag')).to.be.null;
  });

  it('renders the edit icon button when show-edit-icon is set', async () => {
    const el = await fixture(
      html`<cds-add-select-selection-summary
        selected-item-count="2"
        show-edit-icon
        edit-icon-description="Edit selections"></cds-add-select-selection-summary>`
    );
    expect(
      el.shadowRoot?.querySelector(
        `.${blockClass}__selection-summary-edit-button`
      )
    ).to.exist;
  });

  it('fires cds-add-select-selection-summary-edit when edit button is clicked', async () => {
    const el = await fixture(
      html`<cds-add-select-selection-summary
        selected-item-count="2"
        show-edit-icon
        edit-icon-description="Edit"></cds-add-select-selection-summary>`
    );
    await el.updateComplete;

    let fired = false;
    el.addEventListener(`${prefix}-add-select-selection-summary-edit`, () => {
      fired = true;
    });

    const editBtn = el.shadowRoot?.querySelector(
      `.${blockClass}__selection-summary-edit-button`
    );
    editBtn.dispatchEvent(
      new MouseEvent('click', { bubbles: true, composed: true })
    );

    expect(fired).to.be.true;
  });

  it('renders empty-state slot when selected-item-count is 0', async () => {
    const el = await fixture(
      html`<cds-add-select-selection-summary selected-item-count="0">
        <p slot="empty-state" id="empty-msg">No items selected</p>
      </cds-add-select-selection-summary>`
    );
    expect(el.querySelector('#empty-msg')).to.exist;
  });

  it('renders default slot content when selected-item-count > 0', async () => {
    const el = await fixture(
      html`<cds-add-select-selection-summary selected-item-count="2">
        <p id="item-a">Selected A</p>
      </cds-add-select-selection-summary>`
    );
    expect(el.querySelector('#item-a')).to.exist;
  });
});

// ---------------------------------------------------------------------------
// cds-add-select-selection-summary-item
// ---------------------------------------------------------------------------

describe(`${prefix}-add-select-selection-summary-item`, () => {
  const sampleItem = {
    id: 'x1',
    title: 'Item X',
    subtitle: 'Subtitle X',
    value: 'vx',
  };

  it('renders item title and subtitle', async () => {
    const el = await fixture(
      html`<cds-add-select-selection-summary-item></cds-add-select-selection-summary-item>`
    );
    el.item = sampleItem;
    await el.updateComplete;

    expect(
      el.shadowRoot
        ?.querySelector(`.${blockClass}__selection-summary-item-title`)
        ?.textContent?.trim()
    ).to.equal('Item X');
    expect(
      el.shadowRoot
        ?.querySelector(`.${blockClass}__selection-summary-item-subtitle`)
        ?.textContent?.trim()
    ).to.equal('Subtitle X');
  });

  it('renders remove button by default', async () => {
    const el = await fixture(
      html`<cds-add-select-selection-summary-item></cds-add-select-selection-summary-item>`
    );
    el.item = sampleItem;
    await el.updateComplete;

    expect(
      el.shadowRoot?.querySelector(
        `.${blockClass}__selection-summary-item-remove-button`
      )
    ).to.exist;
  });

  it('does not render remove button when hide-remove-button is set', async () => {
    const el = await fixture(
      html`<cds-add-select-selection-summary-item
        hide-remove-button></cds-add-select-selection-summary-item>`
    );
    el.item = sampleItem;
    await el.updateComplete;

    expect(
      el.shadowRoot?.querySelector(
        `.${blockClass}__selection-summary-item-remove-button`
      )
    ).to.be.null;
  });

  it('fires cds-add-select-selection-summary-item-remove when remove button is clicked', async () => {
    const el = await fixture(
      html`<cds-add-select-selection-summary-item></cds-add-select-selection-summary-item>`
    );
    el.item = sampleItem;
    await el.updateComplete;

    let firedDetail = null;
    el.addEventListener(
      `${prefix}-add-select-selection-summary-item-remove`,
      (e) => {
        firedDetail = e.detail;
      }
    );

    const removeBtn = el.shadowRoot?.querySelector(
      `.${blockClass}__selection-summary-item-remove-button`
    );
    removeBtn.dispatchEvent(
      new MouseEvent('click', { bubbles: true, composed: true })
    );

    expect(firedDetail?.itemId).to.equal('x1');
  });

  it('renders in accordion mode when use-accordion is set', async () => {
    const el = await fixture(
      html`<cds-add-select-selection-summary-item
        use-accordion></cds-add-select-selection-summary-item>`
    );
    el.item = sampleItem;
    await el.updateComplete;

    expect(
      el.shadowRoot?.querySelector(
        `.${blockClass}__selection-summary-item-accordion-heading`
      )
    ).to.exist;
  });

  it('toggles accordion open/closed when the heading button is clicked', async () => {
    const el = await fixture(
      html`<cds-add-select-selection-summary-item
        use-accordion></cds-add-select-selection-summary-item>`
    );
    el.item = sampleItem;
    await el.updateComplete;

    const heading = el.shadowRoot?.querySelector(
      `.${blockClass}__selection-summary-item-accordion-heading`
    );
    expect(heading.getAttribute('aria-expanded')).to.equal('false');

    heading.click();
    await el.updateComplete;
    expect(heading.getAttribute('aria-expanded')).to.equal('true');
  });

  it('renders default slot content with highest priority', async () => {
    const el = await fixture(
      html`<cds-add-select-selection-summary-item>
        <p id="custom-content">custom content</p>
      </cds-add-select-selection-summary-item>`
    );
    await el.updateComplete;
    expect(el.querySelector('#custom-content')).to.exist;
  });
});

// ---------------------------------------------------------------------------
// cds-add-select-item-panel
// ---------------------------------------------------------------------------

describe(`${prefix}-add-select-item-panel`, () => {
  const panelItem = {
    id: 'p1',
    title: 'Panel item',
    value: 'vp',
    itemDetails: [
      { label: 'Owner', value: 'Alice' },
      { label: 'Size', value: '4 GB' },
    ],
  };

  it('renders the panel wrapper', async () => {
    const el = await fixture(
      html`<cds-add-select-item-panel></cds-add-select-item-panel>`
    );
    expect(el.shadowRoot?.querySelector(`.${blockClass}__item-summary-panel`))
      .to.exist;
  });

  it('renders the panel title', async () => {
    const el = await fixture(
      html`<cds-add-select-item-panel
        title="Item details"></cds-add-select-item-panel>`
    );
    expect(
      el.shadowRoot
        ?.querySelector(`.${blockClass}__item-summary-panel-title`)
        ?.textContent?.trim()
    ).to.equal('Item details');
  });

  it('renders itemDetails key/value pairs', async () => {
    const el = await fixture(
      html`<cds-add-select-item-panel></cds-add-select-item-panel>`
    );
    el.item = panelItem;
    await el.updateComplete;

    expect(el.shadowRoot?.textContent).to.include('Owner');
    expect(el.shadowRoot?.textContent).to.include('Alice');
    expect(el.shadowRoot?.textContent).to.include('Size');
    expect(el.shadowRoot?.textContent).to.include('4 GB');
  });

  it('renders the close button by default', async () => {
    const el = await fixture(
      html`<cds-add-select-item-panel
        close-icon-description="Close panel"></cds-add-select-item-panel>`
    );
    expect(
      el.shadowRoot?.querySelector(`.${blockClass}__item-summary-panel-close`)
    ).to.exist;
  });

  it('does not render a close button when showCloseButton is false', async () => {
    const el = await fixture(
      html`<cds-add-select-item-panel></cds-add-select-item-panel>`
    );
    el.showCloseButton = false;
    await el.updateComplete;

    expect(
      el.shadowRoot?.querySelector(`.${blockClass}__item-summary-panel-close`)
    ).to.be.null;
  });

  it('fires cds-add-select-item-panel-close when close button is clicked', async () => {
    const el = await fixture(
      html`<cds-add-select-item-panel
        close-icon-description="Close"></cds-add-select-item-panel>`
    );
    await el.updateComplete;

    let fired = false;
    el.addEventListener(`${prefix}-add-select-item-panel-close`, () => {
      fired = true;
    });

    const closeBtn = el.shadowRoot?.querySelector(
      `.${blockClass}__item-summary-panel-close`
    );
    closeBtn.dispatchEvent(
      new MouseEvent('click', { bubbles: true, composed: true })
    );

    expect(fired).to.be.true;
  });

  it('adds --open modifier class when open is true', async () => {
    const el = await fixture(
      html`<cds-add-select-item-panel open></cds-add-select-item-panel>`
    );
    await el.updateComplete;
    expect(
      el.shadowRoot?.querySelector(`.${blockClass}__item-summary-panel--open`)
    ).to.exist;
  });
});
