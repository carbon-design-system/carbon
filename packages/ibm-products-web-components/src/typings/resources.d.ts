/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

declare module '*.scss';
declare module '*.scss?lit';
declare module '*.jpg';
declare module '*.svg';
declare module '*.svg?raw' {
  const content: string;
  export default content;
}
declare module 'vitest/config';
declare module '@figma/code-connect/html';

declare module '*.mdx' {
  let MDXComponent: (props: any) => JSX.Element;
  // @ts-ignore
  export default {
    parameters: {
      docs: {
        // @ts-ignore
        container: JSX.Element,
        page: MDXComponent,
      },
    },
  };
}
