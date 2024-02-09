/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { ArrowRight } from '@carbon/icons-react';
import Link from './Link';
import mdx from './Link.mdx';

export default {
  title: 'Components/Link',
  component: Link,
  parameters: {
    docs: {
      page: mdx,
    },
  },
  args: {
    disabled: false,
    inline: false,
    visited: false,
  },
  argTypes: {
    children: {
      table: {
        disable: true,
      },
    },
    as: {
      control: false,
    },
    renderIcon: {
      table: {
        disable: true,
      },
    },
  },
};

export const Default = () => <Link href="#">Link</Link>;

export const Inline = () => (
  <>
    <Link inline href="#">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    </Link>
    <p>
      Ut facilisis semper lorem in aliquet. Aliquam accumsan ante justo, vitae
      fringilla eros vehicula id. Ut at enim quis libero pharetra ullamcorper.
      Maecenas feugiat sodales arcu ut porttitor. In blandit ultricies est.
      Vivamus risus massa, cursus eu tellus sed, sagittis commodo nunc.{' '}
      <Link inline href="#">
        Maecenas nunc mauris, consequat quis mauris sit amet
      </Link>
      , finibus suscipit nunc. Phasellus ex quam, placerat quis tempus sit amet,
      pretium nec sem. Etiam dictum scelerisque mauris, blandit ultrices erat
      pellentesque id. Quisque venenatis purus sit amet sodales condimentum.
      Duis at tincidunt orci. Ut velit ipsum, lacinia at ex quis, aliquet
      rhoncus purus. Praesent et scelerisque ligula.
    </p>
  </>
);

export const PairedWithIcon = () => (
  <Link href="#" renderIcon={() => <ArrowRight aria-label="Arrow Right" />}>
    Carbon Docs
  </Link>
);

export const Playground = (args) => (
  <Link href="#" {...args}>
    Link
  </Link>
);
