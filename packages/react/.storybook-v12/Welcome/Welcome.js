/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import './welcome.scss';
import Link from '../../src/components/Link';
import { ArrowRight } from '@carbon/icons-react';
import { Stack } from '../../src/components/Stack';
import { Callout } from '../../src/components/Notification';

export const Welcome = () => {
  return (
    <div className="welcome__container">
      <h2 className="welcome__heading">@carbon/react</h2>
      <h4 className="welcome__heading welcome__heading--subtitle">v2.x</h4>
      <Callout
        className="v12-callout"
        lowContrast
        statusIconDescription="notification"
        subtitle="Every story has the enable-v12-release flag set to true. Stories
with 🚀 are v12-specific stories not present in the v11 Storybook."
        title="This Storybook reflects work in progress for v12"
      />
      <Stack className="welcome__links" gap={5}>
        <Link
          href="https://carbondesignsystem.com/"
          className="welcome__link"
          renderIcon={ArrowRight}>
          Website
        </Link>
        <Link
          href="https://github.com/carbon-design-system/carbon/tree/main/packages/react"
          className="welcome__link"
          renderIcon={ArrowRight}>
          GitHub repo
        </Link>
        <Link
          href="https://github.com/carbon-design-system/carbon/blob/main/docs/release-schedule.md"
          className="welcome__link"
          renderIcon={ArrowRight}>
          Release schedule
        </Link>
        <Link
          href="https://github.com/carbon-design-system/carbon/blob/main/SECURITY.md"
          className="welcome__link"
          renderIcon={ArrowRight}>
          Security policy
        </Link>
      </Stack>
    </div>
  );
};
