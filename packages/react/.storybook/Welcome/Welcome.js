/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import bg from './carbon_bg.png';
import './welcome.scss';
import PackageInfo from './../../package.json';
import Link from '../../src/components/Link';
import { ArrowRight } from '@carbon/icons-react';
import { Stack } from '../../src/components/Stack';

export const Welcome = () => {
  return (
    <div
      className="welcome__container"
      style={{
        background: `url(${bg}) no-repeat center center fixed`,
        backgroundSize: 'cover',
      }}>
      <h2 className="welcome__heading">@carbon/react</h2>
      <h4 className="welcome__heading welcome__heading--subtitle">{`v${PackageInfo.version}`}</h4>
      <Stack>
        <Link
          href="https://v10-react.carbondesignsystem.com/"
          className="welcome__link"
          renderIcon={ArrowRight}>
          v10 Storybook
        </Link>
        <Link
          href="https://v10.carbondesignsystem.com/"
          className="welcome__link"
          renderIcon={ArrowRight}>
          v10 website
        </Link>
        <Link
          href="https://github.com/carbon-design-system/carbon/tree/main/packages/react"
          className="welcome__link"
          renderIcon={ArrowRight}>
          Github repo
        </Link>
      </Stack>
    </div>
  );
};
