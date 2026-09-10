/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { expect, fixture, html } from '@open-wc/testing';
import '@carbon/web-components/es/components/text-input/next/index.js';

const entries = (form) =>
  [...new FormData(form)].map(([k, v]) => `${k}=${v}`).join('|');

describe('cds-preview-text-input', function () {
  it('should submit its value', async () => {
    const form = await fixture(
      html`<form>
        <cds-preview-text-input name="a" value="v"></cds-preview-text-input>
      </form>`
    );

    expect(entries(form)).to.equal('a=v');
  });

  it('should submit nothing when disabled', async () => {
    const form = await fixture(
      html`<form>
        <cds-preview-text-input name="a" value="v" disabled>
        </cds-preview-text-input>
      </form>`
    );

    expect(entries(form)).to.equal('');
  });

  it('should submit exactly one entry, not one per mechanism', async () => {
    const form = await fixture(
      html`<form>
        <cds-preview-text-input name="a" value="v"></cds-preview-text-input>
      </form>`
    );

    expect([...new FormData(form)]).to.have.lengthOf(1);
  });

  it('should submit under a name set as a property', async () => {
    const form = await fixture(
      html`<form>
        <cds-preview-text-input value="v"></cds-preview-text-input>
      </form>`
    );
    const el = form.querySelector('cds-preview-text-input');
    el.name = 'viaProperty';

    // `setFormValue()` reads the `name` content attribute, and Lit reflects
    // asynchronously, so a reflected `name` would submit nothing here
    expect(entries(form)).to.equal('viaProperty=v');
  });

  it('should keep the submitted value in step synchronously', async () => {
    const form = await fixture(
      html`<form>
        <cds-preview-text-input name="a" value="orig"></cds-preview-text-input>
      </form>`
    );
    form.querySelector('cds-preview-text-input').value = 'typed';

    // no await — a native control is never stale
    expect(entries(form)).to.equal('a=typed');
  });

  it('should appear in form.elements', async () => {
    const form = await fixture(
      html`<form>
        <cds-preview-text-input name="a"></cds-preview-text-input>
      </form>`
    );
    const el = form.querySelector('cds-preview-text-input');

    expect([...form.elements]).to.include(el);
    expect(el.form).to.equal(form);
  });

  it('should associate with a <label for>', async () => {
    const form = await fixture(
      html`<form>
        <label for="ti" id="lbl">Label</label>
        <cds-preview-text-input id="ti" name="a"></cds-preview-text-input>
      </form>`
    );

    expect(form.querySelector('#lbl').control).to.equal(
      form.querySelector('cds-preview-text-input')
    );
  });

  it('should restore the default value on form.reset()', async () => {
    const form = await fixture(
      html`<form>
        <cds-preview-text-input name="a" value="orig"></cds-preview-text-input>
      </form>`
    );
    const el = form.querySelector('cds-preview-text-input');
    el.value = 'typed';

    form.reset();

    expect(el.value).to.equal('orig');
    expect(entries(form)).to.equal('a=orig');
  });

  it('should not submit from inside a disabled fieldset', async () => {
    const form = await fixture(
      html`<form>
        <fieldset disabled>
          <cds-preview-text-input name="a" value="v"></cds-preview-text-input>
        </fieldset>
      </form>`
    );

    expect(entries(form)).to.equal('');
  });

  it('should block submission when required and empty', async () => {
    const form = await fixture(
      html`<form>
        <cds-preview-text-input name="a" required></cds-preview-text-input>
      </form>`
    );
    const el = form.querySelector('cds-preview-text-input');

    expect(el.validity.valueMissing).to.be.true;
    expect(form.checkValidity()).to.be.false;

    el.value = 'filled';

    expect(el.validity.valueMissing).to.be.false;
    expect(form.checkValidity()).to.be.true;
  });

  it('should restore a value from formStateRestoreCallback', async () => {
    const form = await fixture(
      html`<form>
        <cds-preview-text-input name="a" value="orig"></cds-preview-text-input>
      </form>`
    );
    const el = form.querySelector('cds-preview-text-input');

    el.formStateRestoreCallback('restored', 'restore');

    expect(el.value).to.equal('restored');
  });
});

describe('cds-preview-text-input downstream compatibility', function () {
  it('should hand a subclass the internals instead of failing silently', async () => {
    const Base = customElements.get('cds-preview-text-input');
    class Subclassed extends Base {
      constructor() {
        super();
        this.mine = this.attachInternals();
        this.ranToEnd = true;
      }
    }
    customElements.define('test-subclassed-input', Subclassed);

    const el = document.createElement('test-subclassed-input');

    expect(el.ranToEnd, 'constructor ran to completion').to.be.true;
    expect(el.mine).to.equal(el._internals);
  });
});
