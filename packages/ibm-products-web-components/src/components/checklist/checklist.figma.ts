/**
 * @license
 *
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import figma, { html } from '@figma/code-connect/html';

figma.connect(
  'https://www.figma.com/design/0F9dKH2abAd7gSfvnacfWf/-v11--IBM-Products-%E2%80%93-Carbon-Design-System?node-id=16728-642157',
  {
    variant: { Expanded: true },
    props: {
      titleText: figma.string('Heading text'),
      progressText: figma.string('Progress text'),
      groupTitleText: figma.string('Title text'),
      footerLinkLabel: figma.nestedProps('Link', {
        text: figma.textContent('Link'),
      }),
      children: figma.children('_Task item'),
    },
    example: (props) =>
      html`<c4p-checklist
        open
        title=${props.titleText}
        chart-label=${props.progressText}
        chart-value="0.XX"
        view-all-label=${props.footerLinkLabel.text}
      >
        <c4p-checklist-group title=${props.groupTitleText}>
          ${props.children}
        </c4p-checklist-group>
      </c4p-checklist>`,
    imports: [
      "import '@carbon/ibm-products-web-components/es/components/checklist/index.js'",
    ],
  }
);

figma.connect(
  'https://www.figma.com/design/0F9dKH2abAd7gSfvnacfWf/-v11--IBM-Products-%E2%80%93-Carbon-Design-System?node-id=16728-642157',
  {
    variant: { Expanded: false },
    props: {
      titleText: figma.string('Heading text'),
      progressText: figma.string('Progress text'),
      groupTitleText: figma.string('Title text'),
      footerLinkLabel: figma.nestedProps('Link', {
        text: figma.textContent('Link'),
      }),
    },
    example: (props) =>
      html`<c4p-checklist
        title=${props.titleText}
        chart-label=${props.progressText}
        chart-value="0.XX"
        view-all-label=${props.footerLinkLabel.text}
      >
        <c4p-checklist-group title=${props.groupTitleText}>
          <c4p-checklist-item
            label="Task name"
            status="in progress"
            clickable
          ></c4p-checklist-item>
          <c4p-checklist-item
            label="Task name"
            status="not started"
            clickable
          ></c4p-checklist-item>
        </c4p-checklist-group>
      </c4p-checklist>`,
    imports: [
      "import '@carbon/ibm-products-web-components/es/components/checklist/index.js'",
    ],
  }
);
