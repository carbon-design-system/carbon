import { html, LitElement } from 'lit';
// side-effect class imports of one component -> collapse to a single barrel
import '@carbon/web-components/es/components/data-table/index.js';
// value import -> keep binding, add barrel alongside
import CDSButton from '@carbon/web-components/es/components/button/button.js';
import '@carbon/web-components/es/components/button/index.js';
// named value import for a component whose barrel is already present below
import { CDSSearch } from '@carbon/web-components/es/components/search/search.js';
import '@carbon/web-components/es/components/search/index.js';
// type-only -> untouched
import type CDSModal from '@carbon/web-components/es/components/modal/modal.js';
// already a barrel -> untouched
import '@carbon/web-components/es/components/tag/index.js';

export class Widget extends LitElement {
  render() {
    return html`<cds-button></cds-button>`;
  }
}
