/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import '@carbon/web-components/es/components/tile/index.js';

describe('cds-tile', function () {
  const tile = html`<cds-tile>Default tile</cds-tile>`;

  it('should render', async () => {
    const el = await fixture(tile);
    expect(el).to.exist;
  });

  describe('automated accessibility testing', () => {
    it('should have no Axe violations', async () => {
      const el = await fixture(tile);
      await expect(el).to.be.accessible();
    });
  });

  it('should render slot content as expected', async () => {
    const el = await fixture(html`
      <cds-tile>
        Default tile
        <br />
        <br />
        <a href="https://www.carbondesignsystem.com">Link</a>
      </cds-tile>
    `);

    expect(el.textContent.trim()).to.include('Default tile');
    expect(el.querySelector('a')).to.exist;
    expect(el.querySelectorAll('br')).to.have.length(2);
  });

  it('should support a custom class on the outermost element', async () => {
    const el = await fixture(
      html`<cds-tile class="custom-tile-class">Default tile</cds-tile>`
    );
    expect(el.classList.contains('custom-tile-class')).to.be.true;
  });

  it('should respect decorator slot', async () => {
    const el = await fixture(html`
      <cds-tile>
        Default tile
        <cds-ai-label slot="decorator"></cds-ai-label>
      </cds-tile>
    `);

    const decoratorSlot = el.shadowRoot.querySelector('slot[name="decorator"]');
    const assigned = decoratorSlot.assignedNodes({ flatten: true });
    const aiLabel = assigned.find(
      (node) =>
        node.nodeType === Node.ELEMENT_NODE &&
        node.tagName.toLowerCase() === 'cds-ai-label'
    );

    expect(aiLabel).to.exist;
  });

  it('should respect deprecated slug slot', async () => {
    const el = await fixture(html`
      <cds-tile>
        Default tile
        <cds-ai-label slot="slug"></cds-ai-label>
      </cds-tile>
    `);

    const slugSlot = el.shadowRoot.querySelector('slot[name="slug"]');
    const assigned = slugSlot.assignedNodes({ flatten: true });
    const aiLabel = assigned.find(
      (node) =>
        node.nodeType === Node.ELEMENT_NODE &&
        node.tagName.toLowerCase() === 'cds-ai-label'
    );

    expect(aiLabel).to.exist;
  });
});

describe('cds-clickable-tile', () => {
  it('renders with a link', async () => {
    const el = await fixture(html`
      <cds-clickable-tile href="https://www.carbondesignsystem.com">
        Clickable Tile
      </cds-clickable-tile>
    `);

    expect(el.tagName.toLowerCase()).to.equal('cds-clickable-tile');
    expect(el.getAttribute('href')).to.equal(
      'https://www.carbondesignsystem.com'
    );
  });

  it('does not invoke the click handler if ClickableTile is disabled', async () => {
    let clicked = false;
    const el = await fixture(html`
      <cds-clickable-tile disabled href="https://www.carbondesignsystem.com">
        🚦
      </cds-clickable-tile>
    `);

    el.addEventListener('click', (event) => {
      if (!event.defaultPrevented && !el.disabled) {
        clicked = true;
      }
    });

    el.click();
    await el.updateComplete;
    // Should not have clicked because the tile is disabled
    expect(clicked).to.be.false;
    expect(el.disabled).to.be.true;
  });

  it('should allow for a custom icon', async () => {
    const el = await fixture(html`
      <cds-clickable-tile href="https://www.carbondesignsystem.com">
        Clickable Tile
        <svg slot="icon" data-testid="test"></svg>
      </cds-clickable-tile>
    `);

    const iconSlot = el.shadowRoot.querySelector('slot[name="icon"]');
    if (iconSlot) {
      const assigned = iconSlot.assignedNodes({ flatten: true });
      const customIcon = assigned.find(
        (node) =>
          node.nodeType === Node.ELEMENT_NODE &&
          node.getAttribute('data-testid') === 'test'
      );
      expect(customIcon).to.exist;
    }
  });

  it('should respect decorator slot', async () => {
    const el = await fixture(html`
      <cds-clickable-tile>
        Default tile
        <cds-ai-label slot="decorator"></cds-ai-label>
      </cds-clickable-tile>
    `);

    const decoratorSlot = el.shadowRoot.querySelector('slot[name="decorator"]');
    const assigned = decoratorSlot.assignedNodes({ flatten: true });
    const aiLabel = assigned.find(
      (node) =>
        node.nodeType === Node.ELEMENT_NODE &&
        node.tagName.toLowerCase() === 'cds-ai-label'
    );

    expect(aiLabel).to.exist;
  });

  it('should respect deprecated slug attribute', async () => {
    const el = await fixture(
      html`<cds-clickable-tile slug>Default tile</cds-clickable-tile>`
    );

    expect(el.hasAttribute('slug')).to.be.true;
    expect(el.hasAttribute('ai-label')).to.be.true;
  });
});

describe('cds-selectable-tile', () => {
  it('does not invoke the click handler if SelectableTile is disabled', async () => {
    let changed = false;
    const el = await fixture(html`
      <cds-selectable-tile
        disabled
        @cds-selectable-tile-changed="${() => {
          changed = true;
        }}">
        🚦
      </cds-selectable-tile>
    `);

    el.click();
    expect(changed).to.be.false;
  });

  it('should respect decorator slot', async () => {
    const el = await fixture(html`
      <cds-selectable-tile>
        Default tile
        <cds-ai-label slot="decorator"></cds-ai-label>
      </cds-selectable-tile>
    `);

    const decoratorSlot = el.shadowRoot.querySelector('slot[name="decorator"]');
    const assigned = decoratorSlot.assignedNodes({ flatten: true });
    const aiLabel = assigned.find(
      (node) =>
        node.nodeType === Node.ELEMENT_NODE &&
        node.tagName.toLowerCase() === 'cds-ai-label'
    );

    expect(aiLabel).to.exist;
  });

  it('should respect deprecated ai-label slot', async () => {
    const el = await fixture(html`
      <cds-selectable-tile>
        Default tile
        <cds-ai-label slot="ai-label"></cds-ai-label>
      </cds-selectable-tile>
    `);

    const aiLabelSlot = el.shadowRoot.querySelector('slot[name="ai-label"]');
    const assigned = aiLabelSlot.assignedNodes({ flatten: true });
    const aiLabel = assigned.find(
      (node) =>
        node.nodeType === Node.ELEMENT_NODE &&
        node.tagName.toLowerCase() === 'cds-ai-label'
    );

    expect(aiLabel).to.exist;
  });
});

describe('cds-expandable-tile', () => {
  it('should render slot content as expected', async () => {
    const el = await fixture(html`
      <cds-expandable-tile>
        <div slot="above-the-fold-content">TestAbove</div>
        <div>TestBelow</div>
      </cds-expandable-tile>
    `);

    expect(el.textContent).to.include('TestAbove');
    expect(el.textContent).to.include('TestBelow');
  });

  it('has the expected classes', async () => {
    const el = await fixture(
      html`<cds-expandable-tile class="extra-class"></cds-expandable-tile>`
    );

    const button = el.shadowRoot.querySelector('button');
    expect(button.classList.contains('cds--tile__chevron')).to.be.true;
    expect(el.classList.contains('extra-class')).to.be.true;
  });

  it('toggles the expandable state on click', async () => {
    const el = await fixture(html`
      <cds-expandable-tile>
        <div slot="above-the-fold-content">TestAbove</div>
        <div>TestBelow</div>
      </cds-expandable-tile>
    `);

    expect(el.expanded).to.be.false;

    const listener = oneEvent(el, 'cds-expandable-tile-toggled');
    el.click();
    const event = await listener;

    expect(event.detail.expanded).to.be.true;
    expect(el.expanded).to.be.true;
  });

  it('supports setting expanded attribute to true', async () => {
    const el = await fixture(html`
      <cds-expandable-tile expanded>
        <div slot="above-the-fold-content">TestAbove</div>
        <div>TestBelow</div>
      </cds-expandable-tile>
    `);

    expect(el.expanded).to.be.true;
    expect(el.hasAttribute('expanded')).to.be.true;

    const button = el.shadowRoot.querySelector('button');
    expect(button.getAttribute('aria-expanded')).to.equal('true');
  });

  it('supports setting expanded attribute to false', async () => {
    const el = await fixture(html`
      <cds-expandable-tile>
        <div slot="above-the-fold-content">TestAbove</div>
        <div>TestBelow</div>
      </cds-expandable-tile>
    `);

    expect(el.expanded).to.be.false;

    const button = el.shadowRoot.querySelector('button');
    expect(button.getAttribute('aria-expanded')).to.equal('false');
  });

  it('should respect decorator slot', async () => {
    const el = await fixture(html`
      <cds-expandable-tile>
        <div slot="above-the-fold-content">TestAbove</div>
        <div>TestBelow</div>
        <cds-ai-label slot="decorator"></cds-ai-label>
      </cds-expandable-tile>
    `);

    const decoratorSlot = el.shadowRoot.querySelector('slot[name="decorator"]');
    const assigned = decoratorSlot.assignedNodes({ flatten: true });
    const aiLabel = assigned.find(
      (node) =>
        node.nodeType === Node.ELEMENT_NODE &&
        node.tagName.toLowerCase() === 'cds-ai-label'
    );

    expect(aiLabel).to.exist;
  });

  it('should respect deprecated slug slot', async () => {
    const el = await fixture(html`
      <cds-expandable-tile>
        <div slot="above-the-fold-content">TestAbove</div>
        <div>TestBelow</div>
        <cds-ai-label slot="slug"></cds-ai-label>
      </cds-expandable-tile>
    `);

    const slugSlot = el.shadowRoot.querySelector('slot[name="slug"]');
    const assigned = slugSlot.assignedNodes({ flatten: true });
    const slug = assigned.find(
      (node) =>
        node.nodeType === Node.ELEMENT_NODE &&
        node.tagName.toLowerCase() === 'cds-ai-label'
    );

    expect(slug).to.exist;
  });

  it('should handle with-interactive attribute', async () => {
    const el = await fixture(html`
      <cds-expandable-tile with-interactive>
        <div slot="above-the-fold-content">
          <button type="button">TestAbove</button>
        </div>
        <div>TestBelow</div>
      </cds-expandable-tile>
    `);

    expect(el.withInteractive).to.be.true;

    const chevronButton = el.shadowRoot.querySelector('.cds--tile__chevron');
    expect(chevronButton.classList.contains('cds--tile__chevron--interactive'))
      .to.be.true;
  });

  it('should toggle the expanded state when the expanded property changes dynamically', async () => {
    const el = await fixture(html`
      <cds-expandable-tile>
        <div slot="above-the-fold-content">TestAbove</div>
        <div>TestBelow</div>
      </cds-expandable-tile>
    `);

    const button = el.shadowRoot.querySelector('button');

    const checkExpandedState = (isExpanded) => {
      expect(button.getAttribute('aria-expanded')).to.equal(
        isExpanded ? 'true' : 'false'
      );
      expect(el.expanded).to.equal(isExpanded);
      expect(el.hasAttribute('expanded')).to.equal(isExpanded);
    };
    checkExpandedState(false);

    el.expanded = true;
    await el.updateComplete;
    checkExpandedState(true);

    el.expanded = false;
    await el.updateComplete;
    checkExpandedState(false);
  });

  describe('ExpandableTile with interactive elements', () => {
    it('does not render the tile as a button and expands/collapses', async () => {
      let toggleEventFired = false;

      const el = await fixture(html`
        <cds-expandable-tile with-interactive>
          <div slot="above-the-fold-content">
            <button type="button">TestAbove</button>
          </div>
          <div>
            <button type="button">TestBelow</button>
          </div>
        </cds-expandable-tile>
      `);

      el.addEventListener('cds-expandable-tile-toggled', () => {
        toggleEventFired = true;
      });

      await el.updateComplete;

      expect(el.tagName.toLowerCase()).not.to.equal('button');

      const expandButton = el.shadowRoot.querySelector(
        'button.cds--tile__chevron'
      );
      expect(expandButton).to.exist;

      expect(el.hasAttribute('aria-expanded')).to.be.false;

      expect(expandButton.getAttribute('aria-expanded')).to.equal('false');
      expect(expandButton.getAttribute('aria-controls')).to.equal(
        'below-the-fold-content'
      );

      expandButton.click();
      await el.updateComplete;

      expect(toggleEventFired).to.be.true;
      expect(expandButton.getAttribute('aria-expanded')).to.equal('true');
      expect(el.expanded).to.be.true;
    });
  });

  describe('ExpandableTile with role elements', () => {
    it('does not render the tile as a button and expands/collapses', async () => {
      let toggleEventFired = false;

      const el = await fixture(html`
        <cds-expandable-tile with-interactive>
          <div slot="above-the-fold-content">
            <div role="table" class="testing">TestAbove</div>
          </div>
          <div>TestBelow</div>
        </cds-expandable-tile>
      `);

      el.addEventListener('cds-expandable-tile-toggled', () => {
        toggleEventFired = true;
      });

      await el.updateComplete;
      expect(el.tagName.toLowerCase()).not.to.equal('button');

      const expandButton = el.shadowRoot.querySelector(
        'button.cds--tile__chevron'
      );
      expect(expandButton).to.exist;

      expect(el.hasAttribute('aria-expanded')).to.be.false;

      expect(expandButton.getAttribute('aria-expanded')).to.equal('false');
      expect(expandButton.getAttribute('aria-controls')).to.equal(
        'below-the-fold-content'
      );

      expandButton.click();
      await el.updateComplete;

      expect(toggleEventFired).to.be.true;
      expect(expandButton.getAttribute('aria-expanded')).to.equal('true');
      expect(el.expanded).to.be.true;
    });

    it('supports interactive elements in expanded state', async () => {
      let buttonClicked = false;

      const el = await fixture(html`
        <cds-expandable-tile expanded with-interactive>
          <div slot="above-the-fold-content">
            <div>TestAbove</div>
          </div>
          <div>
            <button>Test Button</button>
          </div>
        </cds-expandable-tile>
      `);

      await el.updateComplete;

      expect(el.expanded).to.be.true;

      const expandButton = el.shadowRoot.querySelector(
        'button.cds--tile__chevron'
      );
      expect(expandButton.getAttribute('aria-expanded')).to.equal('true');

      const testButton = el.querySelector('button');
      expect(testButton).to.exist;
      expect(testButton.textContent.trim()).to.equal('Test Button');

      testButton.addEventListener('click', () => {
        buttonClicked = true;
      });

      // Click the test button
      testButton.click();

      expect(buttonClicked).to.be.true;
      // Expand button should still show expanded state
      expect(expandButton.getAttribute('aria-expanded')).to.equal('true');
      expect(el.expanded).to.be.true;
    });
  });
});

describe('cds-radio-tile', () => {
  it('should render as radio input', async () => {
    const el = await fixture(html`
      <cds-radio-tile name="test-radio" value="option1">
        Option 1
      </cds-radio-tile>
    `);

    const radioInput = el.shadowRoot.querySelector('input[type="radio"]');
    expect(radioInput).to.exist;
    expect(radioInput.getAttribute('name')).to.equal('test-radio');
    expect(radioInput.getAttribute('value')).to.equal('option1');
  });

  it('should fire selection event on change', async () => {
    const el = await fixture(html`
      <cds-radio-tile name="test-radio" value="option1">
        Option 1
      </cds-radio-tile>
    `);

    const listener = oneEvent(el, 'cds-radio-tile-selected');
    const radioInput = el.shadowRoot.querySelector('input[type="radio"]');
    radioInput.click();
    const event = await listener;

    expect(event.detail.selected).to.be.true;
    expect(event.detail.name).to.equal('test-radio');
  });

  it('should respect selected attribute', async () => {
    const el = await fixture(html`
      <cds-radio-tile name="test-radio" value="option1" selected>
        Option 1
      </cds-radio-tile>
    `);

    expect(el.selected).to.be.true;
    const radioInput = el.shadowRoot.querySelector('input[type="radio"]');
    expect(radioInput.checked).to.be.true;
  });
});
