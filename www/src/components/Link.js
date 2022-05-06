/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import NextLink from 'next/link';
import { Link as CarbonLink } from '@carbon/react';

export default function Link({ children, ...rest }) {
  return (
    <NextLink {...rest} passHref>
      <CarbonLink>{children}</CarbonLink>
    </NextLink>
  );
}
