/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { expect, fixture } from '@open-wc/testing';
import '@carbon/web-components/es/components/checkbox/next/index.js';
import '@carbon/web-components/es/components/text-input/next/index.js';
import '@carbon/web-components/es/components/textarea/next/index.js';
import '@carbon/web-components/es/components/number-input/next/index.js';
import '@carbon/web-components/es/components/password-input/next/index.js';
import '@carbon/web-components/es/components/select/next/index.js';
import '@carbon/web-components/es/components/dropdown/next/index.js';
import '@carbon/web-components/es/components/radio-button/next/index.js';
import '@carbon/web-components/es/components/search/next/index.js';
import '@carbon/web-components/es/components/slider/next/index.js';
import '@carbon/web-components/es/components/multi-select/next/index.js';
import '@carbon/web-components/es/components/combo-box/next/index.js';
import '@carbon/web-components/es/components/time-picker/next/index.js';
import '@carbon/web-components/es/components/date-picker/next/index.js';
import '@carbon/web-components/es/components/fluid-text-input/next/index.js';
import '@carbon/web-components/es/components/fluid-search/next/index.js';
import '@carbon/web-components/es/components/fluid-select/next/index.js';
import '@carbon/web-components/es/components/fluid-dropdown/next/index.js';
import '@carbon/web-components/es/components/fluid-combo-box/next/index.js';
import '@carbon/web-components/es/components/fluid-multi-select/next/index.js';
import '@carbon/web-components/es/components/fluid-time-picker/next/index.js';
import '@carbon/web-components/es/components/fluid-date-picker/next/index.js';

const entries = (form) =>
  [...new FormData(form)].map(([k, v]) => `${k}=${v}`).join('|');

/**
 * all form-associated preview components must pass
 */
const TAGS = [
  { tag: 'cds-preview-text-input', value: 'v' },
  { tag: 'cds-preview-textarea', value: 'v' },
  { tag: 'cds-preview-number-input', value: '3' },
  { tag: 'cds-preview-password-input', value: 'v' },
  { tag: 'cds-preview-select', value: 'v' },
  { tag: 'cds-preview-dropdown', value: 'v' },
  { tag: 'cds-preview-radio-button-group', value: 'v' },
  { tag: 'cds-preview-search', value: 'v' },
  { tag: 'cds-preview-slider', value: '3' },
  {
    tag: 'cds-preview-combo-box',
    value: 'v',
    children: '<cds-combo-box-item value="v">V</cds-combo-box-item>',
  },
  { tag: 'cds-preview-time-picker', value: 'v' },
  { tag: 'cds-preview-time-picker-select', value: 'v' },
  { tag: 'cds-preview-date-picker', value: 'v' },
  { tag: 'cds-preview-fluid-text-input', value: 'v' },
  { tag: 'cds-preview-fluid-search', value: 'v' },
  { tag: 'cds-preview-fluid-select', value: 'v' },
  { tag: 'cds-preview-fluid-dropdown', value: 'v' },
  {
    tag: 'cds-preview-fluid-combo-box',
    value: 'v',
    children: '<cds-combo-box-item value="v">V</cds-combo-box-item>',
  },
  { tag: 'cds-preview-fluid-time-picker', value: 'v' },
  { tag: 'cds-preview-fluid-date-picker', value: 'v' },
  { tag: 'cds-preview-checkbox', value: 'v', needsChecked: true },
];

describe('FormAssociatedMixin contract', function () {
  TAGS.forEach(({ tag, value, needsChecked, children = '' }) => {
    describe(tag, function () {
      const one = async (attrs = '') => {
        const form = await fixture(
          `<form><${tag} name="a" value="${value}" ${
            needsChecked ? 'checked' : ''
          } ${attrs}>${children}</${tag}></form>`
        );
        // components that resolve their value against slotted children — a
        // combo box matching `value` to an item — settle a cycle after the
        // fixture renders
        await form.querySelector(tag).updateComplete;
        return form;
      };

      it('should submit its value under its name', async () => {
        const form = await one();
        expect(entries(form)).to.equal(`a=${value}`);
      });

      it('should submit exactly one entry, not one per mechanism', async () => {
        const form = await one();
        expect([...new FormData(form)]).to.have.lengthOf(1);
      });

      it('should submit nothing when disabled', async () => {
        const form = await one('disabled');
        expect(entries(form)).to.equal('');
      });

      it('should appear in form.elements and expose `form`', async () => {
        const form = await one();
        const el = form.querySelector(tag);
        expect([...form.elements]).to.include(el);
        expect(el.form).to.equal(form);
      });

      it('should associate with a <label for>', async () => {
        const form = await fixture(
          `<form><label for="target" id="lbl">Label</label>` +
            `<${tag} id="target" name="a">${children}</${tag}></form>`
        );
        expect(form.querySelector('#lbl').control).to.equal(
          form.querySelector(tag)
        );
      });

      it('should not submit from inside a disabled fieldset', async () => {
        const form = await fixture(
          `<form><fieldset disabled><${tag} name="a" value="${value}" ${
            needsChecked ? 'checked' : ''
          }>${children}</${tag}></fieldset></form>`
        );
        expect(entries(form)).to.equal('');
      });

      it('should follow native disabled semantics inside a disabled fieldset', async () => {
        const form = await fixture(
          `<form><fieldset id="fs" disabled><${tag} name="a">${children}</${tag}></fieldset></form>`
        );
        const el = form.querySelector(tag);
        await el.updateComplete;

        // native `HTMLInputElement.disabled` reports only the element's own
        // attribute, effective state is `:disabled`
        expect(el.disabled, 'own disabled attribute').to.be.false;
        expect(el.matches(':disabled'), 'effective state').to.be.true;

        // disabled to match a built-in
        const control = el.shadowRoot.querySelector(
          'input, select, textarea, button'
        );
        if (control) {
          expect(control.disabled, 'rendered control is disabled').to.be.true;
        }

        form.querySelector('#fs').disabled = false;
        await el.updateComplete;

        expect(el.matches(':disabled'), 'effective state restored').to.be.false;
        if (control) {
          expect(
            el.shadowRoot.querySelector('input, select, textarea, button')
              .disabled,
            'rendered control restored'
          ).to.be.false;
        }
      });

      it('should expose the native validity surface', async () => {
        const form = await one();
        const el = form.querySelector(tag);
        // assert primitives only - passing host object to chai like
        // `VladityState` or a live `NodeList` hangs the test runner
        expect(el.validity.valid, 'validity.valid').to.be.true;
        expect(el.labels.length, 'labels.length').to.be.a('number');
        expect(el.willValidate, 'willValidate').to.be.a('boolean');
        expect(el.checkValidity(), 'checkValidity()').to.be.true;
      });

      it('should hand a subclass the internals rather than failing silently', async () => {
        const Base = customElements.get(tag);
        const subTag = `sub-${tag}`;
        if (!customElements.get(subTag)) {
          customElements.define(
            subTag,
            class extends Base {
              constructor() {
                super();
                this.mine = this.attachInternals();
                this.ranToEnd = true;
              }
            }
          );
        }
        const el = document.createElement(subTag);
        expect(el.ranToEnd, 'constructor ran to completion').to.be.true;
        expect(el.mine).to.equal(el._internals);
      });
    });
  });
});

// `ces-preview-multi-select` derives value from its selection instead of `value`
describe('cds-preview-multi-select', function () {
  const one = () =>
    fixture(
      `<form><cds-preview-multi-select name="m">` +
        `<cds-multi-select-item value="a">A</cds-multi-select-item>` +
        `<cds-multi-select-item value="b">B</cds-multi-select-item>` +
        `</cds-preview-multi-select></form>`
    );

  it('should participate in the form', async () => {
    const form = await one();
    const el = form.querySelector('cds-preview-multi-select');

    expect([...form.elements]).to.include(el);
    expect(el.form).to.equal(form);
  });

  it('should keep the v2 joined wire format, synchronously', async () => {
    const form = await one();
    form.querySelector('cds-preview-multi-select').value = 'a,b';

    // one entry with joined value, like v2, otherwise one entry per
    // selection requires API change
    expect(entries(form)).to.equal('m=a,b');
  });

  it('should submit exactly one entry', async () => {
    const form = await one();
    form.querySelector('cds-preview-multi-select').value = 'a';

    expect([...new FormData(form)]).to.have.lengthOf(1);
  });

  it('should submit nothing when disabled', async () => {
    const form = await one();
    const el = form.querySelector('cds-preview-multi-select');
    el.value = 'a';
    el.disabled = true;

    expect(entries(form)).to.equal('');
  });
});

// test native controls for the preview components in each case and assert
// they behvae identically
const NATIVE_PAIRS = [
  {
    label: 'text input',
    native: '<input name="native" value="orig">',
    preview:
      '<cds-preview-text-input name="preview" value="orig"></cds-preview-text-input>',
    edit: (el) => {
      el.value = 'edited';
    },
    submitted: 'orig',
    comparesRequired: true,
  },
  {
    label: 'checkbox',
    native: '<input type="checkbox" name="native" value="v" checked>',
    preview:
      '<cds-preview-checkbox name="preview" value="v" checked></cds-preview-checkbox>',
    edit: (el) => {
      el.checked = false;
    },
    submitted: 'v',
  },
];

describe('parity with native form controls', function () {
  NATIVE_PAIRS.forEach(
    ({ label, native, preview, edit, submitted, comparesRequired }) => {
      describe(label, function () {
        const both = (form) => [
          form.querySelector('[name="native"]'),
          form.querySelector('[name="preview"]'),
        ];

        it('should both take part in the form', async () => {
          const form = await fixture(`<form>${native}${preview}</form>`);
          const [n, p] = both(form);
          await p.updateComplete;

          expect([...form.elements]).to.include(n);
          expect([...form.elements]).to.include(p);
          expect(p.form).to.equal(n.form);
          expect(entries(form)).to.equal(
            `native=${submitted}|preview=${submitted}`
          );
        });

        it('should both associate with a <label for>', async () => {
          const form = await fixture(
            `<form><label for="n" id="ln">n</label><label for="p" id="lp">p</label>` +
              `${native.replace('<input', '<input id="n"')}` +
              `${preview.replace('name="preview"', 'id="p" name="preview"')}</form>`
          );
          const p = form.querySelector('[name="preview"]');
          await p.updateComplete;

          expect(form.querySelector('#ln').control).to.equal(
            form.querySelector('#n')
          );
          expect(form.querySelector('#lp').control).to.equal(p);
        });

        it('should both restore their content-attribute default on reset', async () => {
          const form = await fixture(`<form>${native}${preview}</form>`);
          const [n, p] = both(form);
          await p.updateComplete;
          edit(n);
          edit(p);
          // `value` reflects on some components, so let the attribute settle
          // before resetting — otherwise reset reads a stale attribute and the
          // test passes for the wrong reason.
          await p.updateComplete;

          form.reset();
          await p.updateComplete;

          expect(entries(form)).to.equal(
            `native=${submitted}|preview=${submitted}`
          );
        });

        it('should both report the same disabled state inside a disabled fieldset', async () => {
          const form = await fixture(
            `<form><fieldset disabled>${native}${preview}</fieldset></form>`
          );
          const [n, p] = both(form);
          await p.updateComplete;

          // `disabled` is the element's own attribute; `:disabled` is effective.
          expect(p.disabled, 'own disabled').to.equal(n.disabled);
          expect(p.matches(':disabled'), 'effective disabled').to.equal(
            n.matches(':disabled')
          );
          expect(entries(form), 'neither is submitted').to.equal('');
        });

        it('should both block submission when required and empty', async function () {
          if (!comparesRequired) {
            this.skip();
          }
          const form = await fixture(
            `<form><input name="native" required>` +
              `<cds-preview-text-input name="preview" required></cds-preview-text-input></form>`
          );
          const [n, p] = both(form);
          await p.updateComplete;

          expect(p.checkValidity(), 'preview validity').to.equal(
            n.checkValidity()
          );
          expect(p.validity.valueMissing).to.equal(n.validity.valueMissing);
          expect(form.checkValidity()).to.be.false;
        });
      });
    }
  );
});
