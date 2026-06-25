/**
 * Copyright IBM Corp. 2025, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { AboutModal } from './AboutModal';
import figma from '@figma/code-connect';

figma.connect(
  AboutModal,
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
    example: (props) => (
      <AboutModal
        title={props.aboutModalContentProps.title}
        version={props.aboutModalContentProps.version}
        copyrightText={props.aboutModalContentProps.copyrightText}
        content={props.aboutModalContentProps.content}
        closeIconDescription="close"
        additionalInfo={props.footerBaseProps.additionalInfo}
        open={true}
        links={[props.aboutModalContentProps.links]}
        logo={
          <img
            src="data:image/svg+xml,%3c?xml%20version=%271.0%27%20encoding=%27UTF-8%27?%3e%3csvg%20width=%27157px%27%20height=%27157px%27%20viewBox=%270%200%20157%20157%27%20version=%271.1%27%20xmlns=%27http://www.w3.org/2000/svg%27%20xmlns:xlink=%27http://www.w3.org/1999/xlink%27%3e%3c!--%20Generator:%20Sketch%2055.2%20(78181)%20-%20https://sketchapp.com%20--%3e%3ctitle%3eGroup%3c/title%3e%3cdesc%3eCreated%20with%20Sketch.%3c/desc%3e%3cdefs%3e%3clinearGradient%20x1=%27-9.94443222%25%27%20y1=%2750%25%27%20x2=%27106.211488%25%27%20y2=%2750%25%27%20id=%27linearGradient-1%27%3e%3cstop%20stop-color=%27%23BE95FF%27%20offset=%270%25%27%3e%3c/stop%3e%3cstop%20stop-color=%27%234589FF%27%20offset=%27100%25%27%3e%3c/stop%3e%3c/linearGradient%3e%3ccircle%20id=%27path-2%27%20cx=%2786%27%20cy=%2786%27%20r=%2771%27%3e%3c/circle%3e%3c/defs%3e%3cg%20id=%27Page-1%27%20stroke=%27none%27%20stroke-width=%271%27%20fill=%27none%27%20fill-rule=%27evenodd%27%3e%3cg%20id=%27Group%27%3e%3cg%20id=%27Oval%27%3e%3cuse%20fill=%27%23D8D8D8%27%20xlink:href=%27%23path-2%27%3e%3c/use%3e%3cuse%20fill=%27url(%23linearGradient-1)%27%20xlink:href=%27%23path-2%27%3e%3c/use%3e%3c/g%3e%3ccircle%20id=%27Oval%27%20fill=%27%23FFFFFF%27%20cx=%2739.5%27%20cy=%2739.5%27%20r=%2739.5%27%3e%3c/circle%3e%3c/g%3e%3c/g%3e%3c/svg%3e"
            alt="Example product or service logo"
            style={{ maxWidth: '6rem' }}
          />
        }
      />
    ),
  }
);
