/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * The two ways an element reaches a registry: the component's barrel, and
 * `defineCustomElement` under a tag name you choose. Prose lives in
 * register.mdx.
 */

import { html } from 'lit';
import CDSButton from '../../src/components/button/button';
import { defineCustomElement } from '../../src/globals/register';
import hostStyles from './register-story.scss?lit';

// default barrel registraion
import '../../src/components/button/index';

// The same component under a second tag. Declaring the subclass lets it carry
// host styles for the new tag; `static is` names it, and `defineCustomElement`
// reads that. Without the extra styles the element renders flat.
class CWCCustomButton extends CDSButton {
  static is = 'cwc-custom-button';
  static styles = [CDSButton.styles, hostStyles].flat();
}
defineCustomElement(CWCCustomButton);

const meta = {
  title: 'Introduction/Component registration',
  argTypes: {
    label: { control: 'text' },
  },
  args: {
    label: 'Button',
  },
};

export default meta;

export const DefaultRegistration = {
  render: (args) => html`<cds-button>${args.label}</cds-button>`,
};

export const CustomTagName = {
  render: (args) => html`<cwc-custom-button>${args.label}</cwc-custom-button>`,
};
