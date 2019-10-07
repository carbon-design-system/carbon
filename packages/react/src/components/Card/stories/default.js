/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import OverflowMenu from '../../OverflowMenu';
import OverflowMenuItem from '../../OverflowMenuItem';
import Button from '../../Button';
import Link from '../../Link';
import Card from '../../Card';
import CardFooter from '../../CardFooter';
import CardContent from '../../CardContent';

export default props => (
  <Card {...props}>
    <CardContent
      cardTitle="Card Name"
      cardInfo={[
        'Lorem ipsum sit amet, consectetur adipisicing elit, sed do eiusmod tempor',
      ]}>
      <OverflowMenu {...props}>
        <OverflowMenuItem {...props} itemText="Stop App" />
        <OverflowMenuItem {...props} itemText="Restart App" />
        <OverflowMenuItem {...props} itemText="Rename App" />
        <OverflowMenuItem {...props} itemText="Delete App" hasDivider />
      </OverflowMenu>
    </CardContent>
    <CardFooter>
      <Button size="small" kind="primary" style={{ width: 10 + '%' }}>
        Button
      </Button>
      <Link href="#" className="bx--card-footer__link">
        Link
      </Link>
    </CardFooter>
  </Card>
);
