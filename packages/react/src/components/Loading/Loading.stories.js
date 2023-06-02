/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Loading from '.';
import mdx from './Loading.mdx';

export default {
  title: 'Components/Loading',
  component: Loading,
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Default = () => {
  return (
    <>
      <a
        href="https://builder.carbondesignsystem.com/from-json/%7B%22title%22%3A%22LoadingFragment%22%2C%22data%22%3A%7B%22items%22%3A%5B%7B%22type%22%3A%22loading%22%2C%22label%22%3A%22Loading%22%2C%22overlay%22%3Afalse%2C%22size%22%3A%22normal%22%2C%22active%22%3Atrue%2C%22id%22%3A%222%22%2C%22codeContext%22%3A%7B%22name%22%3A%22loading-2%22%7D%7D%5D%2C%22id%22%3A1%7D%2C%22allCssClasses%22%3A%5B%5D%7D"
        target="_blank"
        rel="noreferrer">
        Edit on Carbon UI Builder
      </a>
      <br></br>
      <br></br>
      <Loading className={'some-class'} withOverlay={false} />
    </>
  );
};

export const Playground = (args) => {
  return (
    <>
      <a
        href="https://builder.carbondesignsystem.com/from-json/%7B%22title%22%3A%22LoadingFragment%22%2C%22data%22%3A%7B%22items%22%3A%5B%7B%22type%22%3A%22loading%22%2C%22label%22%3A%22Loading%22%2C%22overlay%22%3Afalse%2C%22size%22%3A%22normal%22%2C%22active%22%3Atrue%2C%22id%22%3A%222%22%2C%22codeContext%22%3A%7B%22name%22%3A%22loading-2%22%7D%7D%5D%2C%22id%22%3A1%7D%2C%22allCssClasses%22%3A%5B%5D%7D"
        target="_blank"
        rel="noreferrer">
        Edit on Carbon UI Builder
      </a>
      <br></br>
      <br></br>
      <Loading className={'some-class'} {...args} />
    </>
  );
};

Playground.argTypes = {
  children: {
    table: {
      disable: true,
    },
  },
  className: {
    table: {
      disable: true,
    },
  },
  // The id prop is deprecated and should be remove in the next major release
  id: {
    table: {
      disable: true,
    },
  },
  active: {
    control: {
      type: 'boolean',
    },
    defaultValue: true,
  },
  withOverlay: {
    control: {
      type: 'boolean',
    },
    defaultValue: false,
  },
  small: {
    control: {
      type: 'boolean',
    },
    defaultValue: false,
  },
  description: {
    control: {
      type: 'text',
    },
    defaultValue: 'Loading',
  },
};
