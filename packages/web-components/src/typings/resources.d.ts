/**
 * Copyright IBM Corp. 2019, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

declare module '*.scss';
declare module '*.scss?lit';

declare module '*.mdx' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
  let MDXComponent: (props: any) => JSX.Element;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  export default {
    parameters: {
      docs: {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        container: JSX.Element,
        page: MDXComponent,
      },
    },
  };
}
