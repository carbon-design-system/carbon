/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Browser runtime for the "Open in StackBlitz" docs action.

import StackBlitzSDK from '@stackblitz/sdk';

// Open a generated project (`{ title, description, template, openFile, files }`)
export function openInStackBlitz({ openFile, ...project }) {
  StackBlitzSDK.openProject(project, { newWindow: true, openFile });
}

/**
 * Add an "Open in StackBlitz" action to a story's docs canvas. `load` resolves
 * to the generated project and runs only when the action is clicked.
 */
export function addStackBlitzAction(story, load) {
  if (!story || (typeof story !== 'object' && typeof story !== 'function')) {
    return;
  }
  const parameters = story.parameters ?? {};
  const docs = parameters.docs ?? {};
  const canvas = docs.canvas ?? {};
  story.parameters = {
    ...parameters,
    docs: {
      ...docs,
      canvas: {
        ...canvas,
        additionalActions: [
          ...(canvas.additionalActions ?? []),
          {
            title: 'Open in StackBlitz',
            onClick: () => load().then(openInStackBlitz),
          },
        ],
      },
    },
  };
}
