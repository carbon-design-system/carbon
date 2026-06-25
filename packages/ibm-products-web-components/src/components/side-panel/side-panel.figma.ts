/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import './side-panel';
import figma, { html } from '@figma/code-connect/html';

figma.connect(
  'https://www.figma.com/design/0F9dKH2abAd7gSfvnacfWf/-v11--IBM-Products-%E2%80%93-Carbon-Design-System?node-id=8858%3A390246',
  {
    props: {
      size: figma.enum('Size', {
        'X-Small (256)': 'xs',
        'Small (320)': 'sm',
        'Medium (480)': 'md',
        'Large (640)': 'lg',
        'X-Large (<75%)': 'xl',
      }),
      children: figma.children('Slot'),
      title: figma.nestedProps('Header', {
        text: figma.boolean('Title', {
          true: figma.string('Title text'),
          false: undefined,
        }),
      }),
      subtitle: figma.nestedProps('Header', {
        text: figma.string('Description text'),
      }),
      labelText: figma.nestedProps('Header', {
        text: figma.boolean('Eyebrow', {
          true: figma.string('Eyebrow text'),
          false: undefined,
        }),
      }),
      slideIn: figma.boolean('Slide over', {
        true: true,
        false: undefined,
      }),
      placement: figma.boolean('Slide over', {
        true: undefined,
        false: 'right',
      }),
      selectorPageContent: figma.boolean('Slide over', {
        true: undefined,
        false: '#page-content',
      }),
      actions: figma.boolean('Primary actions', {
        false: { actionElements: undefined },
        true: figma.nestedProps('Footer', {
          actionElements: figma.enum('Buttons', {
            '1': html`<cds-button key="p" slot="actions" kind="primary"
              >Primary</cds-button
            >`,
            '2': html`<cds-button slot="actions" kind="secondary"
                >Secondary</cds-button
              >
              <cds-button key="p" slot="actions" kind="primary"
                >Primary</cds-button
              >`,

            '3': html`<cds-button slot="actions" kind="secondary"
                >Secondary</cds-button
              >
              <cds-button slot="actions" kind="secondary"
                >Secondary 2</cds-button
              >
              <cds-button key="p" slot="actions" kind="primary"
                >Primary</cds-button
              >`,
            '1 + Ghost': html`<cds-button slot="actions" kind="ghost"
                >Ghost</cds-button
              >
              <cds-button key="p" slot="actions" kind="primary"
                >Primary</cds-button
              >`,
            '2 + Ghost': html`<cds-button slot="actions" kind="ghost"
                >Ghost</cds-button
              >
              <cds-button slot="actions" kind="secondary">Secondary</cds-button>
              <cds-button slot="actions" kind="primary">Primary</cds-button>`,
          }),
        }),
      }),
      toolbar: figma.nestedProps('Header', {
        items: figma.boolean('Action toolbar', {
          false: { actionsElements: undefined },
          true: figma.nestedProps('Action toolbar', {
            actionsElements: figma.boolean('Button', {
              true: html`<cds-button slot="action-toolbar">Copy</cds-button>
                <cds-button
                  slot="action-toolbar"
                  aria-label="Settings"
                  has-icon-only="true"
                  size="sm"
                  tooltip-text="Settings"
                  kind="ghost"
                >
                  <svg
                    focusable="false"
                    preserveAspectRatio="xMidYMid meet"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    slot="icon"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    aria-hidden="true"
                  >
                    <path
                      d="M13.5,8.4c0-0.1,0-0.3,0-0.4c0-0.1,0-0.3,0-0.4l1-0.8c0.4-0.3,0.4-0.9,0.2-1.3l-1.2-2C13.3,3.2,13,3,12.6,3	c-0.1,0-0.2,0-0.3,0.1l-1.2,0.4c-0.2-0.1-0.4-0.3-0.7-0.4l-0.3-1.3C10.1,1.3,9.7,1,9.2,1H6.8c-0.5,0-0.9,0.3-1,0.8L5.6,3.1	C5.3,3.2,5.1,3.3,4.9,3.4L3.7,3C3.6,3,3.5,3,3.4,3C3,3,2.7,3.2,2.5,3.5l-1.2,2C1.1,5.9,1.2,6.4,1.6,6.8l0.9,0.9c0,0.1,0,0.3,0,0.4	c0,0.1,0,0.3,0,0.4L1.6,9.2c-0.4,0.3-0.5,0.9-0.2,1.3l1.2,2C2.7,12.8,3,13,3.4,13c0.1,0,0.2,0,0.3-0.1l1.2-0.4	c0.2,0.1,0.4,0.3,0.7,0.4l0.3,1.3c0.1,0.5,0.5,0.8,1,0.8h2.4c0.5,0,0.9-0.3,1-0.8l0.3-1.3c0.2-0.1,0.4-0.2,0.7-0.4l1.2,0.4	c0.1,0,0.2,0.1,0.3,0.1c0.4,0,0.7-0.2,0.9-0.5l1.1-2c0.2-0.4,0.2-0.9-0.2-1.3L13.5,8.4z M12.6,12l-1.7-0.6c-0.4,0.3-0.9,0.6-1.4,0.8	L9.2,14H6.8l-0.4-1.8c-0.5-0.2-0.9-0.5-1.4-0.8L3.4,12l-1.2-2l1.4-1.2c-0.1-0.5-0.1-1.1,0-1.6L2.2,6l1.2-2l1.7,0.6	C5.5,4.2,6,4,6.5,3.8L6.8,2h2.4l0.4,1.8c0.5,0.2,0.9,0.5,1.4,0.8L12.6,4l1.2,2l-1.4,1.2c0.1,0.5,0.1,1.1,0,1.6l1.4,1.2L12.6,12z"
                    ></path>
                    <path
                      d="M8,11c-1.7,0-3-1.3-3-3s1.3-3,3-3s3,1.3,3,3C11,9.6,9.7,11,8,11C8,11,8,11,8,11z M8,6C6.9,6,6,6.8,6,7.9C6,7.9,6,8,6,8	c0,1.1,0.8,2,1.9,2c0,0,0.1,0,0.1,0c1.1,0,2-0.8,2-1.9c0,0,0-0.1,0-0.1C10,6.9,9.2,6,8,6C8.1,6,8,6,8,6z"
                    ></path>
                  </svg>
                </cds-button>
                <cds-button
                  slot="action-toolbar"
                  aria-label="Delete"
                  has-icon-only="true"
                  size="sm"
                  tooltip-text="Delete"
                  kind="ghost"
                >
                  <svg
                    focusable="false"
                    preserveAspectRatio="xMidYMid meet"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    slot="icon"
                    width="16"
                    height="16"
                    viewBox="0 0 32 32"
                    aria-hidden="true"
                  >
                    <path d="M12 12H14V24H12zM18 12H20V24H18z"></path>
                    <path
                      d="M4 6V8H6V28a2 2 0 002 2H24a2 2 0 002-2V8h2V6zM8 28V8H24V28zM12 2H20V4H12z"
                    ></path>
                  </svg>
                </cds-button>`,
              false: html`<cds-button
                  slot="action-toolbar"
                  aria-label="Settings"
                  has-icon-only="true"
                  size="sm"
                  tooltip-text="Settings"
                  kind="ghost"
                >
                  <svg
                    focusable="false"
                    preserveAspectRatio="xMidYMid meet"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    slot="icon"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    aria-hidden="true"
                  >
                    <path
                      d="M13.5,8.4c0-0.1,0-0.3,0-0.4c0-0.1,0-0.3,0-0.4l1-0.8c0.4-0.3,0.4-0.9,0.2-1.3l-1.2-2C13.3,3.2,13,3,12.6,3	c-0.1,0-0.2,0-0.3,0.1l-1.2,0.4c-0.2-0.1-0.4-0.3-0.7-0.4l-0.3-1.3C10.1,1.3,9.7,1,9.2,1H6.8c-0.5,0-0.9,0.3-1,0.8L5.6,3.1	C5.3,3.2,5.1,3.3,4.9,3.4L3.7,3C3.6,3,3.5,3,3.4,3C3,3,2.7,3.2,2.5,3.5l-1.2,2C1.1,5.9,1.2,6.4,1.6,6.8l0.9,0.9c0,0.1,0,0.3,0,0.4	c0,0.1,0,0.3,0,0.4L1.6,9.2c-0.4,0.3-0.5,0.9-0.2,1.3l1.2,2C2.7,12.8,3,13,3.4,13c0.1,0,0.2,0,0.3-0.1l1.2-0.4	c0.2,0.1,0.4,0.3,0.7,0.4l0.3,1.3c0.1,0.5,0.5,0.8,1,0.8h2.4c0.5,0,0.9-0.3,1-0.8l0.3-1.3c0.2-0.1,0.4-0.2,0.7-0.4l1.2,0.4	c0.1,0,0.2,0.1,0.3,0.1c0.4,0,0.7-0.2,0.9-0.5l1.1-2c0.2-0.4,0.2-0.9-0.2-1.3L13.5,8.4z M12.6,12l-1.7-0.6c-0.4,0.3-0.9,0.6-1.4,0.8	L9.2,14H6.8l-0.4-1.8c-0.5-0.2-0.9-0.5-1.4-0.8L3.4,12l-1.2-2l1.4-1.2c-0.1-0.5-0.1-1.1,0-1.6L2.2,6l1.2-2l1.7,0.6	C5.5,4.2,6,4,6.5,3.8L6.8,2h2.4l0.4,1.8c0.5,0.2,0.9,0.5,1.4,0.8L12.6,4l1.2,2l-1.4,1.2c0.1,0.5,0.1,1.1,0,1.6l1.4,1.2L12.6,12z"
                    ></path>
                    <path
                      d="M8,11c-1.7,0-3-1.3-3-3s1.3-3,3-3s3,1.3,3,3C11,9.6,9.7,11,8,11C8,11,8,11,8,11z M8,6C6.9,6,6,6.8,6,7.9C6,7.9,6,8,6,8	c0,1.1,0.8,2,1.9,2c0,0,0.1,0,0.1,0c1.1,0,2-0.8,2-1.9c0,0,0-0.1,0-0.1C10,6.9,9.2,6,8,6C8.1,6,8,6,8,6z"
                    ></path>
                  </svg>
                </cds-button>
                <cds-button
                  slot="action-toolbar"
                  aria-label="Delete"
                  has-icon-only="true"
                  size="sm"
                  tooltip-text="Delete"
                  kind="ghost"
                >
                  <svg
                    focusable="false"
                    preserveAspectRatio="xMidYMid meet"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    slot="icon"
                    width="16"
                    height="16"
                    viewBox="0 0 32 32"
                    aria-hidden="true"
                  >
                    <path d="M12 12H14V24H12zM18 12H20V24H18z"></path>
                    <path
                      d="M4 6V8H6V28a2 2 0 002 2H24a2 2 0 002-2V8h2V6zM8 28V8H24V28zM12 2H20V4H12z"
                    ></path>
                  </svg>
                </cds-button>`,
            }),
          }),
        }),
      }),
    },
    example: (props) => html`
      <c4p-side-panel
        open
        label-text="${props.labelText.text}"
        slide-in="${props.slideIn}"
        size="${props.size}"
        placement=${props.placement}
        selector-page-content=${props.selectorPageContent}
        .title="${props.title.text}"
      >
        ${props.subtitle.text} ${props.toolbar.items.actionsElements}
        ${props.actions.actionElements} ${props.children}
      </c4p-side-panel>
    `,
    imports: [
      "import '@carbon/ibm-products-web-components/es/components/side-panel/index';",
    ],
  }
);
