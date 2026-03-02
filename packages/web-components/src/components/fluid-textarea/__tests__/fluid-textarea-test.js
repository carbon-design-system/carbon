/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '@carbon/web-components/es/components/fluid-textarea/index.js';
import { html, fixture, expect, oneEvent } from '@open-wc/testing';

describe('cds-fluid-textarea', () => {
  it('should render correctly with label', async () => {
    const el = await fixture(html`
      <cds-fluid-textarea
        label="Textarea label"
        helper-text="Helper text"></cds-fluid-textarea>
    `);

    const label = el.shadowRoot.querySelector('label');

    expect(label).to.exist;
    expect(label.textContent).to.include('Textarea label');
  });

  it('should reflect value to the textarea', async () => {
    const el = await fixture(html`
      <cds-fluid-textarea value="Initial content"></cds-fluid-textarea>
    `);

    const textarea = el.shadowRoot.querySelector('textarea');
    expect(textarea.value).to.equal('Initial content');
  });

  it('should emit input event and update value', async () => {
    const el = await fixture(html`<cds-fluid-textarea></cds-fluid-textarea>`);
    const textarea = el.shadowRoot.querySelector('textarea');
    textarea.value = 'Updated content';
    textarea.dispatchEvent(new Event('input', { bubbles: true }));

    await el.updateComplete;
    expect(el.value).to.equal('Updated content');
  });

  it('should support readonly and disabled attributes', async () => {
    const el = await fixture(html`
      <cds-fluid-textarea readonly disabled></cds-fluid-textarea>
    `);

    const textarea = el.shadowRoot.querySelector('textarea');
    expect(textarea.readOnly).to.be.true;
    expect(textarea.disabled).to.be.true;
  });

  it('should show invalid text when invalid is set', async () => {
    const el = await fixture(html`
      <cds-fluid-textarea
        invalid
        invalid-text="Error occurred"></cds-fluid-textarea>
    `);

    const error = el.shadowRoot.querySelector('.cds--form-requirement');
    expect(error.textContent).to.include('Error occurred');
    expect(el.hasAttribute('invalid')).to.be.true;
  });

  it('should show warning text when warn is set', async () => {
    const el = await fixture(html`
      <cds-fluid-textarea
        warn
        warn-text="This is a warning"></cds-fluid-textarea>
    `);

    const warning = el.shadowRoot.querySelector('.cds--form-requirement');
    expect(warning.textContent).to.include('This is a warning');
    expect(el.hasAttribute('warn')).to.be.true;
  });

  it('should apply hide-label and visually hide the label', async () => {
    const el = await fixture(html`
      <cds-fluid-textarea label="Hidden label" hide-label></cds-fluid-textarea>
    `);
    const label = el.shadowRoot.querySelector('label');
    expect(label.classList.contains('cds--visually-hidden')).to.be.true;
  });

  it('should reflect cols and rows attributes', async () => {
    const el = await fixture(html`
      <cds-fluid-textarea cols="50" rows="10"></cds-fluid-textarea>
    `);
    const textarea = el.shadowRoot.querySelector('textarea');
    expect(textarea.getAttribute('cols')).to.equal('50');
    expect(textarea.getAttribute('rows')).to.equal('10');
  });

  it('should accept pattern and required attributes', async () => {
    const el = await fixture(html`
      <cds-fluid-textarea pattern="[A-Za-z]+" required></cds-fluid-textarea>
    `);
    const textarea = el.shadowRoot.querySelector('textarea');
    expect(textarea.getAttribute('pattern')).to.equal('[A-Za-z]+');
    expect(textarea.hasAttribute('required')).to.be.true;
  });

  it('should forward data-* attributes', async () => {
    const el = await fixture(html`
      <cds-fluid-textarea data-testid="textarea-id"></cds-fluid-textarea>
    `);
    expect(el.getAttribute('data-testid')).to.equal('textarea-id');
  });

  it('should support skeleton variant', async () => {
    const el = await fixture(html`
      <cds-fluid-textarea-skeleton></cds-fluid-textarea-skeleton>
    `);
    expect(el).to.exist;
    const skeleton = el.shadowRoot.querySelector('.cds--skeleton');
    expect(skeleton).to.exist;
  });

  it('should be accessible', async () => {
    const el = await fixture(html`
      <cds-fluid-textarea
        label="Label"
        helper-text="Help"
        value="value"></cds-fluid-textarea>
    `);
    await expect(el).to.be.accessible();
  });

  // Additional parity tests with React

  describe('counter mode behaviors', () => {
    // Test for switching counter mode from "word" to "character"
    it('should apply maxlength only in character mode', async () => {
      const el = await fixture(html`
        <cds-fluid-textarea
          enable-counter
          counter-mode="character"
          max-count="100"></cds-fluid-textarea>
      `);
      const textarea = el.shadowRoot.querySelector('textarea');
      expect(textarea.getAttribute('maxlength')).to.equal('100');
    });

    // Test for switching counter mode from "word" to "character"
    it('should remove maxlength when switching to word mode', async () => {
      const el = await fixture(html`
        <cds-fluid-textarea
          enable-counter
          counter-mode="character"
          max-count="100"></cds-fluid-textarea>
      `);
      el.counterMode = 'word';
      await el.updateComplete;
      const textarea = el.shadowRoot.querySelector('textarea');
      expect(textarea.hasAttribute('maxlength')).to.be.false;
    });

    // Test for switching back to character mode
    it('should add maxlength when switching back to character mode', async () => {
      const el = await fixture(html`
        <cds-fluid-textarea
          enable-counter
          counter-mode="word"
          max-count="100"></cds-fluid-textarea>
      `);
      el.counterMode = 'character';
      await el.updateComplete;
      const textarea = el.shadowRoot.querySelector('textarea');
      expect(textarea.getAttribute('maxlength')).to.equal('100');
    });
  });

  // Slot support tests (label-text, helper-text, invalid-text, warn-text)
  describe('slot support', () => {
    it('renders slotted label-text', async () => {
      const el = await fixture(html`
        <cds-fluid-textarea>
          <span slot="label-text">Slotted Label</span>
        </cds-fluid-textarea>
      `);
      await el.updateComplete;
      const slot = el.shadowRoot.querySelector('slot[name="label-text"]');
      const content = slot.assignedNodes({ flatten: true })[0];
      expect(content.textContent.trim()).to.equal('Slotted Label');
    });

    it('renders slotted invalid-text', async () => {
      const el = await fixture(html`
        <cds-fluid-textarea invalid>
          <span slot="invalid-text">Slotted Invalid</span>
        </cds-fluid-textarea>
      `);
      await el.updateComplete;
      const slot = el.shadowRoot.querySelector('slot[name="invalid-text"]');
      const content = slot.assignedNodes({ flatten: true })[0];
      expect(content.textContent.trim()).to.equal('Slotted Invalid');
    });

    it('renders slotted warn-text', async () => {
      const el = await fixture(html`
        <cds-fluid-textarea warn>
          <span slot="warn-text">Slotted Warning</span>
        </cds-fluid-textarea>
      `);
      await el.updateComplete;
      const slot = el.shadowRoot.querySelector('slot[name="warn-text"]');
      const content = slot.assignedNodes({ flatten: true })[0];
      expect(content.textContent.trim()).to.equal('Slotted Warning');
    });
  });
});
