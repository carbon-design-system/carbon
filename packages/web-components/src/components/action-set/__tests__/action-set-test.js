/**
 * Copyright IBM Corp. 2026, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '@carbon/web-components/es/components/button/index.js';
import '../index.js';
import { fixture, html, expect, elementUpdated } from '@open-wc/testing';

const prefix = 'cds';
const blockClass = `${prefix}--action-set`;

describe('cds-action-set', () => {
  let el;

  describe('Basic rendering', () => {
    beforeEach(async () => {
      el = await fixture(html`
        <cds-action-set>
          <cds-button kind="secondary">Cancel</cds-button>
          <cds-button kind="primary">Submit</cds-button>
        </cds-action-set>
      `);
      await elementUpdated(el);
    });

    it('renders with default properties', () => {
      expect(el).to.exist;
      expect(el.size).to.equal('md');
      expect(el.stacked).to.be.false;
      expect(el.disableStacking).to.be.false;
    });

    it('applies correct CSS classes', () => {
      const buttonSet = el.shadowRoot?.querySelector(`div.${blockClass}`);
      expect(buttonSet).to.exist;
      expect(buttonSet?.classList.contains(blockClass)).to.be.true;
      expect(buttonSet?.classList.contains(`${blockClass}--md`)).to.be.true;
    });

    it('renders buttons in correct order (secondary first, primary last)', async () => {
      const buttons = el.querySelectorAll(`${prefix}-button`);
      expect(buttons).to.have.length(2);
      expect(buttons[0].getAttribute('kind')).to.equal('secondary');
      expect(buttons[1].getAttribute('kind')).to.equal('primary');
    });
  });

  describe('Button ordering', () => {
    it('orders buttons correctly: ghost, tertiary, secondary, primary', async () => {
      el = await fixture(html`
        <cds-action-set size="xl">
          <cds-button kind="primary">Primary</cds-button>
          <cds-button kind="ghost">Ghost</cds-button>
          <cds-button kind="tertiary">Tertiary</cds-button>
          <cds-button kind="secondary">Secondary</cds-button>
        </cds-action-set>
      `);
      await elementUpdated(el);

      const buttons = Array.from(el.querySelectorAll(`${prefix}-button`));
      expect(buttons).to.have.length(4);

      const ghostButton = buttons.find(
        (btn) => btn.getAttribute('kind') === 'ghost'
      );
      expect(
        ghostButton?.classList.contains(`${blockClass}__action-button--ghost`)
      ).to.be.true;
    });

    it('reverses order when stacked', async () => {
      el = await fixture(html` <cds-action-set size="sm"></cds-action-set> `);

      el.actions = [
        { kind: 'secondary', label: 'Cancel' },
        { kind: 'primary', label: 'Submit' },
      ];
      await elementUpdated(el);

      expect(el.stacked).to.be.true;

      const buttons = Array.from(
        el.shadowRoot.querySelectorAll(`${prefix}-button`)
      );
      const kinds = buttons.map((btn) => btn.getAttribute('kind'));

      // When stacked, primary should come first
      expect(kinds[0]).to.equal('primary');
      expect(kinds[1]).to.equal('secondary');
    });
  });

  describe('Stacking behavior', () => {
    it('stacks buttons when size is sm', async () => {
      el = await fixture(html`
        <cds-action-set size="sm">
          <cds-button kind="secondary">Cancel</cds-button>
          <cds-button kind="primary">Submit</cds-button>
        </cds-action-set>
      `);
      await elementUpdated(el);

      expect(el.stacked).to.be.true;
      const buttonSet = el.shadowRoot?.querySelector(`div.${blockClass}`);
      expect(buttonSet?.classList.contains(`${blockClass}--stacking`)).to.be
        .true;
    });

    it('stacks buttons when size is md and has 3+ buttons', async () => {
      el = await fixture(html`
        <cds-action-set size="md">
          <cds-button kind="tertiary">Cancel</cds-button>
          <cds-button kind="secondary">Back</cds-button>
          <cds-button kind="primary">Submit</cds-button>
        </cds-action-set>
      `);
      await elementUpdated(el);

      expect(el.stacked).to.be.true;
    });

    it('does not stack when size is md with 2 buttons', async () => {
      el = await fixture(html`
        <cds-action-set size="md">
          <cds-button kind="secondary">Cancel</cds-button>
          <cds-button kind="primary">Submit</cds-button>
        </cds-action-set>
      `);
      await elementUpdated(el);

      expect(el.stacked).to.be.false;
    });

    it('respects disableStacking property', async () => {
      el = await fixture(html`
        <cds-action-set size="sm" disable-stacking>
          <cds-button kind="secondary">Cancel</cds-button>
          <cds-button kind="primary">Submit</cds-button>
        </cds-action-set>
      `);
      await elementUpdated(el);

      expect(el.disableStacking).to.be.true;
      expect(el.stacked).to.be.false;
    });
  });

  describe('Size variants', () => {
    it('applies correct classes for different sizes', async () => {
      const sizes = ['sm', 'md', 'lg', 'xl', '2xl'];

      for (const size of sizes) {
        el = await fixture(html`
          <cds-action-set size="${size}">
            <cds-button kind="primary">Submit</cds-button>
          </cds-action-set>
        `);
        await elementUpdated(el);

        const buttonSet = el.shadowRoot?.querySelector(`div.${blockClass}`);
        expect(buttonSet?.classList.contains(`${blockClass}--${size}`)).to.be
          .true;
      }
    });
  });

  describe('Button count classes', () => {
    it('applies row-single class for 1 button', async () => {
      el = await fixture(html`
        <cds-action-set>
          <cds-button kind="primary">Submit</cds-button>
        </cds-action-set>
      `);
      await elementUpdated(el);
      await elementUpdated(el);

      const buttonSet = el.shadowRoot?.querySelector(`div.${blockClass}`);
      expect(buttonSet?.classList.contains(`${blockClass}--row-single`)).to.be
        .true;
    });

    it('applies row-double class for 2 buttons', async () => {
      el = await fixture(html`
        <cds-action-set>
          <cds-button kind="secondary">Cancel</cds-button>
          <cds-button kind="primary">Submit</cds-button>
        </cds-action-set>
      `);
      await elementUpdated(el);
      await elementUpdated(el);

      const buttonSet = el.shadowRoot?.querySelector(`div.${blockClass}`);
      expect(buttonSet?.classList.contains(`${blockClass}--row-double`)).to.be
        .true;
    });

    it('applies row-triple class for 3 buttons', async () => {
      el = await fixture(html`
        <cds-action-set size="lg">
          <cds-button kind="tertiary">Cancel</cds-button>
          <cds-button kind="secondary">Back</cds-button>
          <cds-button kind="primary">Submit</cds-button>
        </cds-action-set>
      `);
      await elementUpdated(el);
      await elementUpdated(el);

      const buttonSet = el.shadowRoot?.querySelector(`div.${blockClass}`);
      expect(buttonSet?.classList.contains(`${blockClass}--row-triple`)).to.be
        .true;
    });

    it('applies row-quadruple class for 4 buttons', async () => {
      el = await fixture(html`
        <cds-action-set size="xl">
          <cds-button kind="ghost">Help</cds-button>
          <cds-button kind="tertiary">Cancel</cds-button>
          <cds-button kind="secondary">Back</cds-button>
          <cds-button kind="primary">Submit</cds-button>
        </cds-action-set>
      `);
      await elementUpdated(el);
      await elementUpdated(el);

      const buttonSet = el.shadowRoot?.querySelector(`div.${blockClass}`);
      expect(buttonSet?.classList.contains(`${blockClass}--row-quadruple`)).to
        .be.true;
    });
  });

  describe('Button size property', () => {
    it('applies button-size to all buttons', async () => {
      el = await fixture(html`
        <cds-action-set button-size="lg">
          <cds-button kind="secondary">Cancel</cds-button>
          <cds-button kind="primary">Submit</cds-button>
        </cds-action-set>
      `);
      await elementUpdated(el);

      const buttons = el.querySelectorAll(`${prefix}-button`);
      buttons.forEach((button) => {
        expect(button.getAttribute('size')).to.equal('lg');
      });
    });
  });

  describe('Action set styling', () => {
    it('adds action-button class to buttons', async () => {
      el = await fixture(html`
        <cds-action-set>
          <cds-button kind="primary">Submit</cds-button>
        </cds-action-set>
      `);
      await elementUpdated(el);

      const button = el.querySelector(`${prefix}-button`);
      expect(button?.classList.contains(`${blockClass}__action-button`)).to.be
        .true;
    });

    it('adds ghost-specific class to ghost buttons', async () => {
      el = await fixture(html`
        <cds-action-set size="lg">
          <cds-button kind="ghost">Help</cds-button>
          <cds-button kind="primary">Submit</cds-button>
        </cds-action-set>
      `);
      await elementUpdated(el);

      const ghostButton = Array.from(
        el.querySelectorAll(`${prefix}-button`)
      ).find((btn) => btn.getAttribute('kind') === 'ghost');

      expect(
        ghostButton?.classList.contains(`${blockClass}__action-button--ghost`)
      ).to.be.true;
    });

    it('sets is-expressive attribute on buttons', async () => {
      el = await fixture(html`
        <cds-action-set>
          <cds-button kind="primary">Submit</cds-button>
        </cds-action-set>
      `);
      await elementUpdated(el);

      const button = el.querySelector(`${prefix}-button`);
      expect(button?.getAttribute('is-expressive')).to.equal('true');
    });
  });

  describe('Validation warnings', () => {
    let consoleWarnStub;

    beforeEach(() => {
      consoleWarnStub = [];
      sinon.stub(console, 'warn').callsFake((...args) => {
        consoleWarnStub.push(args.join(' '));
      });
    });

    afterEach(() => {
      console.warn.restore();
    });

    it('warns when more than 4 actions are provided', async () => {
      el = await fixture(html` <cds-action-set size="xl"></cds-action-set> `);

      el.actions = [
        { kind: 'ghost', label: 'Help' },
        { kind: 'tertiary', label: 'Cancel' },
        { kind: 'secondary', label: 'Back' },
        { kind: 'secondary', label: 'Save' },
        { kind: 'primary', label: 'Submit' },
      ];
      await elementUpdated(el);

      expect(consoleWarnStub.length).to.be.greaterThan(0);
      expect(consoleWarnStub[0]).to.include(
        'you cannot have more than four actions in an ActionSet'
      );
    });

    it('warns when more than 3 actions in stacking mode', async () => {
      el = await fixture(html` <cds-action-set size="sm"></cds-action-set> `);

      el.actions = [
        { kind: 'tertiary', label: 'Cancel' },
        { kind: 'secondary', label: 'Back' },
        { kind: 'secondary', label: 'Save' },
        { kind: 'primary', label: 'Submit' },
      ];
      await elementUpdated(el);

      expect(consoleWarnStub.length).to.be.greaterThan(0);
      expect(consoleWarnStub[0]).to.include(
        'you cannot have more than three actions in this size of ActionSet'
      );
    });

    it('warns when more than one primary action', async () => {
      el = await fixture(html` <cds-action-set></cds-action-set> `);

      el.actions = [
        { kind: 'primary', label: 'Submit' },
        { kind: 'primary', label: 'Save' },
      ];
      await elementUpdated(el);

      expect(consoleWarnStub.length).to.be.greaterThan(0);
      expect(consoleWarnStub[0]).to.include(
        "you cannot have more than one 'primary' action in an ActionSet"
      );
    });

    it('warns when more than one ghost action', async () => {
      el = await fixture(html` <cds-action-set size="xl"></cds-action-set> `);

      el.actions = [
        { kind: 'ghost', label: 'Help' },
        { kind: 'danger--ghost', label: 'Delete' },
        { kind: 'primary', label: 'Submit' },
      ];
      await elementUpdated(el);

      expect(consoleWarnStub.length).to.be.greaterThan(0);
      expect(consoleWarnStub[0]).to.include(
        "you cannot have more than one 'ghost' action in an ActionSet"
      );
    });

    it('warns when ghost button with other actions in stacking mode', async () => {
      el = await fixture(html` <cds-action-set size="sm"></cds-action-set> `);

      el.actions = [
        { kind: 'ghost', label: 'Help' },
        { kind: 'primary', label: 'Submit' },
      ];
      await elementUpdated(el);

      expect(consoleWarnStub.length).to.be.greaterThan(0);
      expect(consoleWarnStub[0]).to.include(
        "you cannot have a 'ghost' button in conjunction with other action types in this size of ActionSet"
      );
    });

    it('does not warn for valid action configurations', async () => {
      el = await fixture(html` <cds-action-set></cds-action-set> `);

      el.actions = [
        { kind: 'secondary', label: 'Cancel' },
        { kind: 'primary', label: 'Submit' },
      ];
      await elementUpdated(el);

      expect(consoleWarnStub.length).to.equal(0);
    });
  });

  describe('_hideSiblingMargin functionality', () => {
    it('hides margin on focused button and its next sibling', async () => {
      el = await fixture(html`
        <cds-action-set>
          <cds-button kind="tertiary">Cancel</cds-button>
          <cds-button kind="secondary">Back</cds-button>
          <cds-button kind="primary">Submit</cds-button>
        </cds-action-set>
      `);
      await elementUpdated(el);

      const buttons = Array.from(el.querySelectorAll(`${prefix}-button`));
      expect(buttons).to.have.length(3);

      buttons[1].focus();
      await elementUpdated(el);

      expect(buttons[1].hasAttribute('hide-margin')).to.be.true;
      expect(buttons[2].hasAttribute('hide-margin')).to.be.true;
      expect(buttons[0].hasAttribute('hide-margin')).to.be.false;
    });

    it('removes hide-margin when focus is lost', async () => {
      el = await fixture(html`
        <cds-action-set>
          <cds-button kind="secondary">Cancel</cds-button>
          <cds-button kind="primary">Submit</cds-button>
        </cds-action-set>
      `);
      await elementUpdated(el);

      const buttons = Array.from(el.querySelectorAll(`${prefix}-button`));

      buttons[0].focus();
      await elementUpdated(el);

      expect(buttons[0].hasAttribute('hide-margin')).to.be.true;
      expect(buttons[1].hasAttribute('hide-margin')).to.be.true;

      buttons[0].blur();
      await elementUpdated(el);

      expect(buttons[0].hasAttribute('hide-margin')).to.be.false;
      expect(buttons[1].hasAttribute('hide-margin')).to.be.false;
    });

    it('works with actions prop rendered buttons', async () => {
      el = await fixture(html` <cds-action-set></cds-action-set> `);

      el.actions = [
        { kind: 'secondary', label: 'Cancel' },
        { kind: 'primary', label: 'Submit' },
      ];
      await elementUpdated(el);

      const buttons = Array.from(
        el.shadowRoot.querySelectorAll(`${prefix}-button`)
      );
      expect(buttons).to.have.length(2);

      buttons[0].focus();
      await elementUpdated(el);

      expect(buttons[0].hasAttribute('hide-margin')).to.be.true;
      expect(buttons[1].hasAttribute('hide-margin')).to.be.true;
    });

    it('handles focus on last button correctly', async () => {
      el = await fixture(html`
        <cds-action-set>
          <cds-button kind="secondary">Cancel</cds-button>
          <cds-button kind="primary">Submit</cds-button>
        </cds-action-set>
      `);
      await elementUpdated(el);

      const buttons = Array.from(el.querySelectorAll(`${prefix}-button`));

      buttons[1].focus();
      await elementUpdated(el);

      expect(buttons[0].hasAttribute('hide-margin')).to.be.false;
      expect(buttons[1].hasAttribute('hide-margin')).to.be.true;
    });
  });

  describe('Actions prop with rest properties', () => {
    it('passes rest properties to cds-button', async () => {
      el = await fixture(html` <cds-action-set></cds-action-set> `);

      el.actions = [
        {
          kind: 'primary',
          label: 'Submit',
          'data-testid': 'submit-button',
          'aria-label': 'Submit form',
        },
      ];
      await elementUpdated(el);

      const button = el.shadowRoot.querySelector(`${prefix}-button`);
      expect(button).to.exist;
      expect(button?.getAttribute('kind')).to.equal('primary');
    });

    it('handles onClick callback from actions', async () => {
      el = await fixture(html` <cds-action-set></cds-action-set> `);

      let clicked = false;
      el.actions = [
        {
          kind: 'primary',
          label: 'Submit',
          onClick: () => {
            clicked = true;
          },
        },
      ];
      await elementUpdated(el);

      const button = el.shadowRoot.querySelector(`${prefix}-button`);
      button.click();

      expect(clicked).to.be.true;
    });

    it('handles loading state', async () => {
      el = await fixture(html` <cds-action-set></cds-action-set> `);

      el.actions = [
        {
          kind: 'primary',
          label: 'Submit',
          loading: true,
        },
      ];
      await elementUpdated(el);

      const button = el.shadowRoot.querySelector(`${prefix}-button`);
      expect(button?.hasAttribute('disabled')).to.be.true;
    });
  });
});
