/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { Download } from '@carbon/icons-react';
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
    renderIcon: {
      table: {
        disable: true,
      },
    },
  },
};

export const Default = () => (
  <>
    <a
      href="https://builder.carbondesignsystem.com/from-json/%7B%22title%22%3A%22LinkFragment%22%2C%22data%22%3A%7B%22items%22%3A%5B%7B%22type%22%3A%22link%22%2C%22text%22%3A%22Link%22%2C%22inline%22%3Afalse%2C%22disabled%22%3Afalse%2C%22codeContext%22%3A%7B%22href%22%3A%22%23%22%2C%22name%22%3A%22link-2%22%7D%2C%22id%22%3A%222%22%7D%5D%2C%22id%22%3A1%7D%2C%22allCssClasses%22%3A%5B%5D%7D"
      target="_blank"
      rel="noreferrer">
      Edit on Carbon UI Builder
    </a>
    <br></br>
    <br></br>
    <Link href="#">Link</Link>
  </>
);

export const Inline = () => (
  <>
    <a
      href="https://builder.carbondesignsystem.com/from-json/%7B%22title%22%3A%22LinkFragment%22%2C%22data%22%3A%7B%22items%22%3A%5B%7B%22type%22%3A%22link%22%2C%22text%22%3A%22Link%22%2C%22inline%22%3Afalse%2C%22disabled%22%3Afalse%2C%22codeContext%22%3A%7B%22href%22%3A%22%23%22%2C%22name%22%3A%22link-2%22%7D%2C%22id%22%3A%222%22%7D%5D%2C%22id%22%3A1%7D%2C%22allCssClasses%22%3A%5B%5D%7D"
      target="_blank"
      rel="noreferrer">
      Edit on Carbon UI Builder
    </a>
    <br></br>
    <br></br>
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
  <>
    <a
      href="https://builder.carbondesignsystem.com/from-json/%7B%22title%22%3A%22LinkFragment%22%2C%22data%22%3A%7B%22items%22%3A%5B%7B%22type%22%3A%22link%22%2C%22text%22%3A%22Link%22%2C%22inline%22%3Afalse%2C%22disabled%22%3Afalse%2C%22codeContext%22%3A%7B%22href%22%3A%22%23%22%2C%22name%22%3A%22link-2%22%7D%2C%22id%22%3A%222%22%7D%5D%2C%22id%22%3A1%7D%2C%22allCssClasses%22%3A%5B%5D%7D"
      target="_blank"
      rel="noreferrer">
      Edit on Carbon UI Builder
    </a>
    <br></br>
    <br></br>
    <Link href="#" renderIcon={Download}>
      Download
    </Link>
  </>
);

export const Playground = (args) => (
  <>
    <a
      href="https://builder.carbondesignsystem.com/from-json/%7B%22title%22%3A%22LinkFragment%22%2C%22data%22%3A%7B%22items%22%3A%5B%7B%22type%22%3A%22link%22%2C%22text%22%3A%22Link%22%2C%22inline%22%3Afalse%2C%22disabled%22%3Afalse%2C%22codeContext%22%3A%7B%22href%22%3A%22%23%22%2C%22name%22%3A%22link-2%22%7D%2C%22id%22%3A%222%22%7D%5D%2C%22id%22%3A1%7D%2C%22allCssClasses%22%3A%5B%5D%7D"
      target="_blank"
      rel="noreferrer">
      Edit on Carbon UI Builder
    </a>
    <br></br>
    <br></br>
    <Link href="#" {...args}>
      Link
    </Link>
  </>
);
