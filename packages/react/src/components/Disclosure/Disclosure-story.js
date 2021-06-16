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
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
} from '../Popover';
import Button from '../Button';
import Link from '../Link';
import { UserAvatar20 } from '@carbon/icons-react';
import {
  withKnobs,
  boolean,
  // number,
  // select,
  // text,
} from '@storybook/addon-knobs';

export default {
  title: 'Experimental/unstable_Disclosure',
  component: useDisclosure,
  decorators: [withKnobs],
  includeStories: ['Default', 'WithHeader', 'WithFooter'],
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
        <Popover {...contentProps} align="bottom-left" caret={true} open={open}>
          <PopoverContent>
            <PopoverBody>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </>
    );
  }

  return <Example />;
};

export const WithHeader = () => {
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
        <Popover {...contentProps} align="bottom-left" caret={true} open={open}>
          <PopoverContent>
            <PopoverHeader
              hasDivider={boolean('show header divider (hasDivider)', false)}>
              This is a heading on Disclosure
            </PopoverHeader>
            <PopoverBody>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </PopoverBody>
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
        <Popover {...contentProps} align="bottom-left" caret={true} open={open}>
          <PopoverContent>
            <PopoverBody>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </PopoverBody>
            <PopoverFooter
              hasDivider={boolean('show footer divider (hasDivider)', false)}>
              <Link href="https://www.carbondesignsystem.com">Linky Link</Link>
            </PopoverFooter>
          </PopoverContent>
        </Popover>
      </>
    );
  }

  return <Example />;
};
