/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { expect, fixture, html } from '@open-wc/testing';
import '@carbon/web-components/es/components/checkbox/next/index.js';

const entries = (form) =>
  [...new FormData(form)].map(([k, v]) => `${k}=${v}`).join('|');

describe('cds-preview-checkbox', function () {
  it('should submit its value when checked', async () => {
    const form = await fixture(
      html`<form>
        <cds-preview-checkbox name="a" value="v" checked></cds-preview-checkbox>
      </form>`
    );

    expect(entries(form)).to.equal('a=v');
  });

  it('should default the submitted value to `on`', async () => {
    const form = await fixture(
      html`<form>
        <cds-preview-checkbox name="a" checked></cds-preview-checkbox>
      </form>`
    );

    expect(entries(form)).to.equal('a=on');
  });

  it('should submit nothing when unchecked or disabled', async () => {
    const form = await fixture(
      html`<form>
        <cds-preview-checkbox name="a" value="v"></cds-preview-checkbox>
        <cds-preview-checkbox name="b" value="v" checked disabled>
        </cds-preview-checkbox>
      </form>`
    );

    expect(entries(form)).to.equal('');
  });

  it('should submit exactly one entry, not one per mechanism', async () => {
    // legacy `formdata` path is inherited from FormMixin. neutralize so
    // the value can't be submitted twice
    const form = await fixture(
      html`<form>
        <cds-preview-checkbox name="a" value="v" checked></cds-preview-checkbox>
      </form>`
    );

    expect([...new FormData(form)]).to.have.lengthOf(1);
  });

  it('should submit under a name set as a property', async () => {
    // `setFormValue()` reads the `name` content attribute, so `name` has to
    // reflect. a frmework template binding sets the property, not the
    // attribute
    const form = await fixture(
      html`<form>
        <cds-preview-checkbox value="v" checked></cds-preview-checkbox>
      </form>`
    );
    const el = form.querySelector('cds-preview-checkbox');
    el.name = 'viaProperty';

    // `setFormValue()` reads the `name` content attribute, and Lit reflects
    // async, so a reflected `name` would  submit nothing here
    expect(entries(form)).to.equal('viaProperty=v');
  });

  it('should keep the submitted value in step synchronously', async () => {
    const form = await fixture(
      html`<form>
        <cds-preview-checkbox name="a" value="v"></cds-preview-checkbox>
      </form>`
    );
    form.querySelector('cds-preview-checkbox').checked = true;

    // no await - a native control is never stale
    expect(entries(form)).to.equal('a=v');
  });

  it('should appear in form.elements', async () => {
    const form = await fixture(
      html`<form>
        <cds-preview-checkbox name="a"></cds-preview-checkbox>
      </form>`
    );
    const el = form.querySelector('cds-preview-checkbox');

    expect([...form.elements]).to.include(el);
    expect(el.form).to.equal(form);
  });

  it('should associate with a <label for>', async () => {
    const form = await fixture(
      html`<form>
        <label for="cb" id="lbl">Label</label>
        <cds-preview-checkbox id="cb" name="a"></cds-preview-checkbox>
      </form>`
    );
    const el = form.querySelector('cds-preview-checkbox');

    expect(form.querySelector('#lbl').control).to.equal(el);
    expect([...el.labels]).to.include(form.querySelector('#lbl'));
  });

  it('should restore the default checked state on form.reset()', async () => {
    const form = await fixture(
      html`<form>
        <cds-preview-checkbox name="a" value="v" checked></cds-preview-checkbox>
        <cds-preview-checkbox name="b" value="v"></cds-preview-checkbox>
      </form>`
    );
    const [a, b] = form.querySelectorAll('cds-preview-checkbox');
    a.checked = false;
    b.checked = true;

    form.reset();

    expect(a.checked).to.be.true;
    expect(b.checked).to.be.false;
    expect(entries(form)).to.equal('a=v');
  });

  it('should not submit from inside a disabled fieldset', async () => {
    const form = await fixture(
      html`<form>
        <fieldset disabled>
          <cds-preview-checkbox name="a" value="v" checked>
          </cds-preview-checkbox>
        </fieldset>
      </form>`
    );

    expect(entries(form)).to.equal('');
  });

  it('should distinguish its own disabled state from an ancestor fieldset', async () => {
    const form = await fixture(
      html`<form>
        <fieldset disabled>
          <cds-preview-checkbox name="a"></cds-preview-checkbox>
          <cds-preview-checkbox name="b" disabled></cds-preview-checkbox>
        </fieldset>
      </form>`
    );
    const [a, b] = form.querySelectorAll('cds-preview-checkbox');
    await a.updateComplete;

    // `disabled` now reports only the element's own attribute, same as
    // `HTMLInputElement.disabled`. `:disabled` is the effective state
    expect(a.disabled, 'a has no disabled attribute').to.be.false;
    expect(b.disabled, 'b has its own disabled attribute').to.be.true;
    expect(a.matches(':disabled'), 'a is effectively disabled').to.be.true;
    expect(b.matches(':disabled'), 'b is effectively disabled').to.be.true;

    form.querySelector('fieldset').disabled = false;
    await a.updateComplete;
    await b.updateComplete;

    expect(a.matches(':disabled'), 'a is enabled with the fieldset').to.be
      .false;
    expect(b.matches(':disabled'), 'b keeps its own disabled state').to.be.true;
  });

  it('should report a valid state', async () => {
    const form = await fixture(
      html`<form>
        <cds-preview-checkbox name="a" value="v"></cds-preview-checkbox>
      </form>`
    );
    const el = form.querySelector('cds-preview-checkbox');

    expect(el.validity.valid).to.be.true;
    expect(form.checkValidity()).to.be.true;
  });
});
