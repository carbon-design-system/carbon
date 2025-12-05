// This entire file should be removed before merging

/* eslint-disable */
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '../popover';
import '../layer';

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('my-element')
export class MyElement extends LitElement {
  /**
   * Copy for the read the docs hint.
   */
  @property()
  open = true;

  updated() {
    console.log('element open: ', this.open);
  }

  render() {
    return html`
      <cds-popover
        tabtip=""
        align="bottom-left"
        id="popover-one"
        dropshadow=""
        ?open=${this.open}>
        <slot name="trigger"></slot>
        <cds-popover-content>
          <div><slot name="content"></slot></div>
        </cds-popover-content>
      </cds-popover>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'my-element': MyElement;
  }
}
