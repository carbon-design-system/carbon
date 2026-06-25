/**
 * Copyright IBM Corp. 2025, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { InlineTip } from './InlineTip';
import { InlineTipButton } from './InlineTipButton';
import { InlineTipLink } from './InlineTipLink';
import figma from '@figma/code-connect';

figma.connect(
  InlineTip,
  'https://www.figma.com/design/0F9dKH2abAd7gSfvnacfWf/-v11--IBM-Products-%E2%80%93-Carbon-Design-System?node-id=16728%3A642364',
  {
    props: {
      narrow: figma.enum('Type', {
        Wide: false,
        Narrow: true,
      }),
      collapsible: figma.boolean('Expandable'),

      contentInstance: figma.nestedProps('_Content', {
        title: figma.textContent('"Title"'),
        body: figma.enum('Type', {
          'Plain text': figma.textContent('"Message"'),
          'Non-linear': figma.children('"Non-linear reading"'),
        }),
      }),

      expanded: figma.boolean('Expandable', {
        true: {
          collapseButtonLabel: 'Read less',
          expandButtonLabel: 'Read more',
        },
        false: {
          collapseButtonLabel: undefined,
          expandButtonLabel: undefined,
        },
      }),

      renderMedia: figma.enum('Image', {
        True: () => <img alt="" src="./path/to/image.png" />,
        False: undefined,
        'N/A': undefined,
      }),

      contentCta: figma.nestedProps('_Content CTA', {
        action: figma.enum('CTA', {
          'Ghost button': <InlineTipButton>Button</InlineTipButton>,
          Link: <InlineTipLink>Link</InlineTipLink>,
        }),
      }),

      tertiary: figma.nestedProps('_Guide banner element button', {
        buttonLabel: figma.textContent('Button'),
      }),
    },

    example: (props) => (
      <InlineTip
        collapseButtonLabel={props.expanded.collapseButtonLabel}
        expandButtonLabel={props.expanded.expandButtonLabel}
        renderMedia={props.renderMedia}
        action={props.contentCta.action}
        narrow={props.narrow}
        title={props.contentInstance.title}
        collapsible={props.collapsible}
        tertiaryButtonLabel={props.tertiary.buttonLabel}
      >
        {props.contentInstance.body}
      </InlineTip>
    ),
  }
);
