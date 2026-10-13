/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

/**
 * Storybook decorator for autoAlign stories. When `autoAlign` is enabled in
 * the story args, wraps the story in a large scrollable canvas and scrolls
 * the content to the centre of the viewport on mount so flip/hide behaviour
 * can be demonstrated in all directions. Renders normally otherwise.
 *
 * Decorators are nested in the same order they are passed.
 *
 * const myCustomLayout1 = (Story) => () => (
 *   <div class="layout-1"><Story /></div>
 * );
 *
 * const myCustomLayout2 = (Story) => () => (
 *   <div class="layout-2"><Story /></div>
 * );
 *
 * [myCustomLayout1, myCustomLayout2] → <div class="layout-1"><div class="layout-2"><Story /></div></div>
 */
const autoAlignDecorator = (Story, context) => {
  const ref = React.useRef();
  const isDocsPage = context.viewMode === 'docs';

  React.useEffect(() => {
    if (context.args.autoAlign && !isDocsPage) {
      ref.current?.scrollIntoView({ block: 'center', inline: 'center' });
    }
  }, [context.args.autoAlign, isDocsPage]);

  if (!context.args.autoAlign || isDocsPage) {
    return <Story />;
  }

  return (
    <div>
      {/* styles to test flip and hide in a scrollable container */}
      <div
        style={{
          width: '250vw',
          height: '250vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {/* overflow hidden to demo the floating styles. clipping is not expected. */}
        <div ref={ref} style={{ overflow: 'hidden', padding: '1rem' }}>
          <Story />
        </div>
      </div>
    </div>
  );
};

export { autoAlignDecorator };
