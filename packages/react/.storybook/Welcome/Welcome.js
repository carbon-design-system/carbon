/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import './welcome.scss';
import PackageInfo from './../../package.json';
import Link from '../../src/components/Link';
import { ArrowRight } from '@carbon/icons-react';
import { Stack } from '../../src/components/Stack';

export const Welcome = () => {
  return (
    <div className="welcome__container">
      <h2 className="welcome__heading">{PackageInfo.name}</h2>
      <h4 className="welcome__heading welcome__heading--subtitle">{`v${PackageInfo.version}`}</h4>
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
