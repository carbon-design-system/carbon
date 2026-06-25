/**
 * Copyright IBM Corp. 2025, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma, { html } from '@figma/code-connect/html';

figma.connect(
  'https://www.figma.com/design/0F9dKH2abAd7gSfvnacfWf/-v11--IBM-Products-%E2%80%93-Carbon-Design-System?node-id=9478%3A404998',
  {
    props: {
      aboutModalContentProps: figma.nestedProps('_About modal content', {
        title: figma.string('Title text'),
        version: figma.string('Version'),
        content: figma.boolean('Content', {
          true: figma.string('Content text'),
          false: undefined,
        }),
        copyrightText: figma.string('Copyright text'),
        links: figma.children(['Link group']),
      }),

      footerBaseProps: figma.boolean('Powered by logos', {
        true: figma.nestedProps('_About modal footer base', {
          additionalInfo: figma.children('Slot'),
        }),
        false: {
          additionalInfo: undefined,
        },
      }),
    },
    example: (props) =>
      html`<c4p-about-modal
        closeIconDescription="close"
        copyrightText=${props.aboutModalContentProps.copyrightText}
        .logo=${props.aboutModalContentProps.logo}
        .title=${props.aboutModalContentProps.title}
        .version=${props.aboutModalContentProps.version}
        .additionalInfo=${props.aboutModalContentProps.additionalInfo}
        .content=${props.aboutModalContentProps.content}
        .links=${props.aboutModalContentProps.links}
        aria-label=""
      ></c4p-about-modal>`,
    imports: [
      "import '@carbon/ibm-products-web-components/es/components/about-modal/index.js'",
    ],
  }
);
