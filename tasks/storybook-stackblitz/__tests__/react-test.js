/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

// Native ESM generator for Storybook's Vite config. Run in child process
// instead of importing in Jest

const { execFileSync } = require('child_process');
const path = require('path');

const DIR = path.resolve(__dirname, '..');
const STORIES = path.resolve(DIR, '../../packages/react/src/components');

function generate(stories, story) {
  const script = `
    import { generateProjects } from ${JSON.stringify(path.join(DIR, 'react.mjs'))};
    const projects = await generateProjects(${JSON.stringify(path.join(STORIES, stories))});
    process.stdout.write(JSON.stringify(projects[${JSON.stringify(story)}]));
  `;
  return JSON.parse(
    execFileSync(process.execPath, ['--input-type=module', '-e', script], {
      encoding: 'utf8',
    })
  );
}

describe('React stories → StackBlitz', () => {
  it('imports public components from @carbon/react and copies story files', () => {
    const project = generate('Accordion/Accordion.stories.tsx', '_WithLayer');
    const main = project.files['src/App.tsx'];

    // the story module; `src/main.tsx` only mounts it
    expect(project.openFile).toBe('src/App.tsx');
    expect(main).toContain('export default function App()');
    expect(project.files['src/main.tsx']).toContain("import App from './App';");
    expect(main).toContain(
      "import { Accordion, AccordionItem } from '@carbon/react';"
    );
    // `.storybook` templates are copied, as `.jsx` so Vite parses their JSX
    expect(main).toContain(
      "from './story-files/.storybook/templates/WithLayer/index';"
    );
    expect(Object.keys(project.files)).toContain(
      'src/story-files/.storybook/templates/WithLayer/index.jsx'
    );
    expect(main).toContain("import { action } from './storybook-shim';");
    expect(main).not.toMatch(/\bparameters:/);
    expect(
      Object.keys(JSON.parse(project.files['package.json']).dependencies)
    ).toEqual(expect.arrayContaining(['@carbon/react', 'react', 'react-dom']));
  });

  it('renders meta.component for a story without render', () => {
    const main = generate('BigNumber/BigNumber.stories.js', 'Default').files[
      'src/App.jsx'
    ];
    expect(main).toMatch(/<meta\.component \{\.\.\.props\} \/>/);
    expect(main).toContain('const args = { ...meta.args, ...Default.args };');
  });

  it('lists Storybook story ids and names for the published index', () => {
    const script = `
      import { storyEntries } from ${JSON.stringify(path.join(DIR, 'vite-plugin.mjs'))};
      const entries = storyEntries(${JSON.stringify(path.join(STORIES, 'Pagination/Pagination.stories.js'))});
      process.stdout.write(JSON.stringify(Object.fromEntries(entries)));
    `;
    const entries = JSON.parse(
      execFileSync(process.execPath, ['--input-type=module', '-e', script], {
        encoding: 'utf8',
      })
    );
    expect(entries.MultiplePaginationComponents).toEqual({
      id: 'components-pagination--multiple-pagination-components',
      title: 'Components/Pagination',
      // CSF2 `storyName` wins over the export name
      name: 'Multiple Pagination components',
    });
  });
});
