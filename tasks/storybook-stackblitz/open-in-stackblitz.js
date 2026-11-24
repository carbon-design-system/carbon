/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Browser runtime for the "Open in StackBlitz" docs action.
 *
 * Post projects with StackBlitz's POST API
 * (https://developer.stackblitz.com/platform/api/post-api) rather than
 * `@stackblitz/sdk`. The SDK only submits to a new `_blank` window, so after
 * the async project load the browser can treat it as an unrequested popup and
 * block it. Opening the tab in the click handler and posting into it once the
 * project has loaded avoids that.
 */

const RUN_URL = 'https://stackblitz.com/run';

let windowCount = 0;

function hiddenInput(name, value) {
  const input = document.createElement('input');
  input.type = 'hidden';
  input.name = name;
  input.value = value;
  return input;
}

// Post a generated project (`{ title, description, template, openFile, files }`)
// into the window named `target`
export function postProject(
  { title, description, template, openFile, files },
  target
) {
  const form = document.createElement('form');
  form.method = 'POST';
  form.action = openFile
    ? `${RUN_URL}?file=${encodeURIComponent(openFile)}`
    : RUN_URL;
  form.target = target;
  form.style.display = 'none';
  form.append(hiddenInput('project[title]', title ?? ''));
  if (description) {
    form.append(hiddenInput('project[description]', description));
  }
  form.append(hiddenInput('project[template]', template));
  for (const [path, contents] of Object.entries(files)) {
    const name = path.replace(/\[/g, '%5B').replace(/\]/g, '%5D');
    form.append(hiddenInput(`project[files][${name}]`, contents));
  }
  document.body.append(form);
  form.submit();
  form.remove();
}

/**
 * Opens the project `load` resolves to in a new tab. Called from the click
 * handler: the tab opens right away, while the click still counts as user
 * activation, and the project is posted into it once loaded.
 */
export function openInStackBlitz(load) {
  windowCount += 1;
  const target = `carbon-stackblitz-${Date.now()}-${windowCount}`;
  const win = window.open('', target);
  if (win) {
    // like `rel="noopener"`: StackBlitz gets no handle back to Storybook
    win.opener = null;
    win.document.title = 'Opening StackBlitz…';
    win.document.body.textContent = 'Opening StackBlitz…';
  }
  return load().then(
    (project) => {
      postProject(project, target);
    },
    (error) => {
      win?.close();
      throw error;
    }
  );
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
            onClick: () => openInStackBlitz(load),
          },
        ],
      },
    },
  };
}
