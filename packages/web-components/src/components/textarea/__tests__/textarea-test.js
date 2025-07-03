/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '@carbon/web-components/es/components/textarea/index.js';
import { html, fixture, expect, oneEvent } from '@open-wc/testing';

describe('cds-textarea', () => {
  it('should render correctly with label and helper text', async () => {
    const el = await fixture(html`
      <cds-textarea
        label="Textarea label"
        helper-text="Helper text"></cds-textarea>
    `);

    const label = el.shadowRoot.querySelector('label');
    const helper = el.shadowRoot.querySelector('.cds--form__helper-text');

    expect(label).to.exist;
    expect(label.textContent).to.include('Textarea label');
    expect(helper).to.exist;
    expect(helper.textContent).to.include('Helper text');
  });

  it('should reflect value to the textarea', async () => {
    const el = await fixture(html`
      <cds-textarea value="Initial content"></cds-textarea>
    `);

    const textarea = el.shadowRoot.querySelector('textarea');
    expect(textarea.value).to.equal('Initial content');
  });

  it('should emit input event and update value', async () => {
    const el = await fixture(html`<cds-textarea></cds-textarea>`);
    const textarea = el.shadowRoot.querySelector('textarea');
    textarea.value = 'Updated content';
    textarea.dispatchEvent(new Event('input', { bubbles: true }));

    await el.updateComplete;
    expect(el.value).to.equal('Updated content');
  });

  it('should support readonly and disabled attributes', async () => {
    const el = await fixture(html`
      <cds-textarea readonly disabled></cds-textarea>
    `);

    const textarea = el.shadowRoot.querySelector('textarea');
    expect(textarea.readOnly).to.be.true;
    expect(textarea.disabled).to.be.true;
  });

  it('should show invalid text when invalid is set', async () => {
    const el = await fixture(html`
      <cds-textarea invalid invalid-text="Error occurred"></cds-textarea>
    `);

    const error = el.shadowRoot.querySelector('.cds--form-requirement');
    expect(error.textContent).to.include('Error occurred');
    expect(el.hasAttribute('invalid')).to.be.true;
  });

  it('should show warning text when warn is set', async () => {
    const el = await fixture(html`
      <cds-textarea warn warn-text="This is a warning"></cds-textarea>
    `);

    const warning = el.shadowRoot.querySelector('.cds--form-requirement');
    expect(warning.textContent).to.include('This is a warning');
    expect(el.hasAttribute('warn')).to.be.true;
  });

  it('should apply hide-label and visually hide the label', async () => {
    const el = await fixture(html`
      <cds-textarea label="Hidden label" hide-label></cds-textarea>
    `);
    const label = el.shadowRoot.querySelector('label');
    expect(label.classList.contains('cds--visually-hidden')).to.be.true;
  });

  it('should reflect cols and rows attributes', async () => {
    const el = await fixture(html`
      <cds-textarea cols="50" rows="10"></cds-textarea>
    `);
    const textarea = el.shadowRoot.querySelector('textarea');
    expect(textarea.getAttribute('cols')).to.equal('50');
    expect(textarea.getAttribute('rows')).to.equal('10');
  });

  it('should accept pattern and required attributes', async () => {
    const el = await fixture(html`
      <cds-textarea pattern="[A-Za-z]+" required></cds-textarea>
    `);
    const textarea = el.shadowRoot.querySelector('textarea');
    expect(textarea.getAttribute('pattern')).to.equal('[A-Za-z]+');
    expect(textarea.hasAttribute('required')).to.be.true;
  });

  it('should forward data-* attributes', async () => {
    const el = await fixture(html`
      <cds-textarea data-testid="textarea-id"></cds-textarea>
    `);
    expect(el.getAttribute('data-testid')).to.equal('textarea-id');
  });

  it('should support skeleton variant', async () => {
    const el = await fixture(html`
      <cds-textarea-skeleton></cds-textarea-skeleton>
    `);
    expect(el).to.exist;
    const skeleton = el.shadowRoot.querySelector('.cds--skeleton');
    expect(skeleton).to.exist;
  });

  it('should be accessible', async () => {
    const el = await fixture(html`
      <cds-textarea
        label="Label"
        helper-text="Help"
        value="value"></cds-textarea>
    `);
    await expect(el).to.be.accessible();
  });

  // Additional parity tests with React

  describe('counter mode behaviors', () => {
    // Test for switching counter mode from "word" to "character"
    it('should apply maxlength only in character mode', async () => {
      const el = await fixture(html`
        <cds-textarea
          enable-counter
          counter-mode="character"
          max-count="100"></cds-textarea>
      `);
      const textarea = el.shadowRoot.querySelector('textarea');
      expect(textarea.getAttribute('maxlength')).to.equal('100');
    });

    // Test for switching counter mode from "word" to "character"
    it('should remove maxlength when switching to word mode', async () => {
      const el = await fixture(html`
        <cds-textarea
          enable-counter
          counter-mode="character"
          max-count="100"></cds-textarea>
      `);
      el.counterMode = 'word';
      await el.updateComplete;
      const textarea = el.shadowRoot.querySelector('textarea');
      expect(textarea.hasAttribute('maxlength')).to.be.false;
    });

    // Test for switching back to character mode
    it('should add maxlength when switching back to character mode', async () => {
      const el = await fixture(html`
        <cds-textarea
          enable-counter
          counter-mode="word"
          max-count="100"></cds-textarea>
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
        <cds-textarea>
          <span slot="label-text">Slotted Label</span>
        </cds-textarea>
      `);
      await el.updateComplete;
      const slot = el.shadowRoot.querySelector('slot[name="label-text"]');
      const content = slot.assignedNodes({ flatten: true })[0];
      expect(content.textContent.trim()).to.equal('Slotted Label');
    });

    it('renders slotted helper-text', async () => {
      const el = await fixture(html`
        <cds-textarea>
          <span slot="helper-text">Slotted Helper</span>
        </cds-textarea>
      `);
      await el.updateComplete;
      const slot = el.shadowRoot.querySelector('slot[name="helper-text"]');
      const content = slot.assignedNodes({ flatten: true })[0];
      expect(content.textContent.trim()).to.equal('Slotted Helper');
    });

    it('renders slotted invalid-text', async () => {
      const el = await fixture(html`
        <cds-textarea invalid>
          <span slot="invalid-text">Slotted Invalid</span>
        </cds-textarea>
      `);
      await el.updateComplete;
      const slot = el.shadowRoot.querySelector('slot[name="invalid-text"]');
      const content = slot.assignedNodes({ flatten: true })[0];
      expect(content.textContent.trim()).to.equal('Slotted Invalid');
    });

    it('renders slotted warn-text', async () => {
      const el = await fixture(html`
        <cds-textarea warn>
          <span slot="warn-text">Slotted Warning</span>
        </cds-textarea>
      `);
      await el.updateComplete;
      const slot = el.shadowRoot.querySelector('slot[name="warn-text"]');
      const content = slot.assignedNodes({ flatten: true })[0];
      expect(content.textContent.trim()).to.equal('Slotted Warning');
    });
  });
});
