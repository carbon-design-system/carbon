/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import '../text-input/next/index';
import '../select/next/index';
import '../checkbox/next/index';
import '../button/index';
import '../form/index';
import '../stack/index';

/**
 * Serializes the submitted entries into the story so each example shows what
 * the browser actually sends, with no `formdata` listener involved.
 */
const showEntries = (event: Event) => {
  event.preventDefault();
  const form = event.target as HTMLFormElement;
  const entries = [...new FormData(form)]
    .map(([key, value]) => `${key}=${value}`)
    .join('\n');
  const output = form.querySelector('[data-output]') as HTMLElement;
  output.textContent = entries || '(no entries)';
};

const outputStyles = html`<style>
  .form-participation-output {
    padding: 0.5rem 1rem;
    margin: 0;
    background: var(--cds-layer-01, #f4f4f4);
    color: var(--cds-text-primary, #161616);
    min-block-size: 3rem;
    white-space: pre-wrap;
  }
  .form-participation-story {
    max-inline-size: 22rem;
  }
</style>`;

export const Default = {
  render: () => html`
    ${outputStyles}
    <cds-form class="form-participation-story">
      <form @submit="${showEntries}">
        <cds-stack gap="5">
          <cds-preview-text-input
            size="md"
            name="email"
            label="Email"
            value="[email protected]"></cds-preview-text-input>
          <cds-preview-select
            size="md"
            name="plan"
            label-text="Plan"
            value="pro">
            <cds-select-item value="free">Free</cds-select-item>
            <cds-select-item value="pro">Pro</cds-select-item>
          </cds-preview-select>
          <cds-preview-checkbox name="newsletter" value="yes" checked>
            Subscribe to the newsletter
          </cds-preview-checkbox>
          <cds-button type="submit">Submit</cds-button>
          <pre class="form-participation-output" data-output>
Submit to see the entries.</pre
          >
        </cds-stack>
      </form>
    </cds-form>
  `,
};

export const LabelAssociation = {
  render: () => html`
    ${outputStyles}
    <cds-form class="form-participation-story">
      <form @submit="${showEntries}">
        <cds-stack gap="5">
          <p>
            Clicking the label focuses the control, because the element is a
            real form control. With <code>cds-text-input</code> the label does
            nothing.
          </p>
          <label for="associated">Full name</label>
          <cds-preview-text-input
            size="md"
            id="associated"
            name="name"
            value="Ada"></cds-preview-text-input>
          <cds-button type="submit">Submit</cds-button>
          <pre class="form-participation-output" data-output>
Submit to see the entries.</pre
          >
        </cds-stack>
      </form>
    </cds-form>
  `,
};

export const FormReset = {
  render: () => html`
    ${outputStyles}
    <cds-form class="form-participation-story">
      <form @submit="${showEntries}">
        <cds-stack gap="5">
          <p>
            Edit the field, then reset. The default comes from the
            <code>value</code> attribute, as it does for an <code>input</code>.
          </p>
          <cds-preview-text-input
            size="md"
            name="city"
            label="City"
            value="Austin"></cds-preview-text-input>
          <cds-button type="reset">Reset</cds-button>
          <cds-button type="submit">Submit</cds-button>
          <pre class="form-participation-output" data-output>
Submit to see the entries.</pre
          >
        </cds-stack>
      </form>
    </cds-form>
  `,
};

export const DisabledFieldset = {
  render: () => html`
    ${outputStyles}
    <cds-form class="form-participation-story">
      <form @submit="${showEntries}">
        <cds-stack gap="5">
          <p>
            Only <code>included</code> is submitted. The browser excludes
            controls inside a disabled <code>fieldset</code>.
          </p>
          <cds-preview-text-input
            size="md"
            name="included"
            label="Included"
            value="sent"></cds-preview-text-input>
          <fieldset disabled>
            <cds-preview-text-input
              size="md"
              name="excluded"
              label="Excluded"
              value="not sent"></cds-preview-text-input>
          </fieldset>
          <cds-button type="submit">Submit</cds-button>
          <pre class="form-participation-output" data-output>
Submit to see the entries.</pre
          >
        </cds-stack>
      </form>
    </cds-form>
  `,
};

export const RequiredValidation = {
  render: () => html`
    ${outputStyles}
    <cds-form class="form-participation-story">
      <form @submit="${showEntries}">
        <cds-stack gap="5">
          <p>
            Submitting while the field is empty is blocked by the browser's own
            constraint validation. No JavaScript is wired up here.
          </p>
          <cds-preview-text-input
            size="md"
            name="username"
            label="Username"
            required></cds-preview-text-input>
          <cds-button type="submit">Submit</cds-button>
          <pre class="form-participation-output" data-output>
Submit to see the entries.</pre
          >
        </cds-stack>
      </form>
    </cds-form>
  `,
};

const meta = {
  title: 'Preview/Form participation',
};

export default meta;
