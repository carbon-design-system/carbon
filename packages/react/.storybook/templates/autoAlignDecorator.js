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
 */
const autoAlignDecorator = (Story, context) => {
  const ref = React.useRef();
  React.useEffect(() => {
    if (context.args.autoAlign) {
      ref.current?.scrollIntoView({ block: 'center', inline: 'center' });
    }
  }, [context.args.autoAlign]);

  if (!context.args.autoAlign) {
    return <Story />;
  }

  return (
    <div
      style={{
        width: '250vw',
        height: '250vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <div ref={ref}>
        <Story />
      </div>
    </div>
  );
};

export { autoAlignDecorator };
