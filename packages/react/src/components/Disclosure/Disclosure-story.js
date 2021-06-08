/* eslint-disable no-console */

/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { useDisclosure } from '../Disclosure';
import {
  Popover,
  PopoverContent,
  PopoverFooter,
  PopoverHeading,
  PopoverText,
} from '../Popover';
import Button from '../Button';
import Link from '../Link';
import { UserAvatar20 } from '@carbon/icons-react';
import {
  withKnobs,
  // boolean,
  // number,
  // select,
  // text,
} from '@storybook/addon-knobs';

export default {
  title: 'Experimental/unstable_Disclosure',
  component: useDisclosure,
  decorators: [withKnobs],
  // includeStories: [],
};

export const Default = () => {
  function Example() {
    const { buttonProps, contentProps, open } = useDisclosure('test-id');

    return (
      <>
        <Button
          renderIcon={UserAvatar20}
          kind="ghost"
          iconDescription="profile"
          type="button"
          hasIconOnly
          {...buttonProps}
        />
        <Popover {...contentProps} align="top-left" caret={true} open={open}>
          <PopoverContent>
            <PopoverHeading className="pt-1 pl-3 pr-3">
              This is a heading on Disclosure
            </PopoverHeading>
            <PopoverText className="pl-3 pr-3 pb-3">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </PopoverText>
          </PopoverContent>
        </Popover>
      </>
    );
  }

  return <Example />;
};

export const WithFooter = () => {
  function Example() {
    const { buttonProps, contentProps, open } = useDisclosure('test-id');

    return (
      <>
        <Button
          renderIcon={UserAvatar20}
          kind="ghost"
          iconDescription="profile"
          type="button"
          hasIconOnly
          {...buttonProps}
        />
        <Popover {...contentProps} align="top-left" caret={true} open={open}>
          <PopoverContent>
            <PopoverHeading className="pt-1 pl-3 pr-3">
              This is a heading on Disclosure
            </PopoverHeading>
            <PopoverText className="pl-3 pr-3">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </PopoverText>
            <PopoverFooter className="p-3">
              <Link href="https://www.carbondesignsystem.com">Linky Link</Link>
            </PopoverFooter>
          </PopoverContent>
        </Popover>
      </>
    );
  }

  return <Example />;
};
