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

const { execFileSync, spawnSync } = require('child_process');
const path = require('path');

const DIR = path.resolve(__dirname, '..');

describe('web components stories → StackBlitz', () => {
  it('every story imports the elements it renders', () => {
    const result = spawnSync(
      process.execPath,
      [path.join(DIR, 'cli.mjs'), '--json'],
      { encoding: 'utf8' }
    );
    // check that stories import everything it renders
    expect(JSON.parse(result.stdout)).toEqual([]);
    expect(result.status).toBe(0);
  });

  it('generates a project that runs against the published package', () => {
    const script = `
      import { generateProjects } from ${JSON.stringify(path.join(DIR, 'web-components.mjs'))};
      const projects = await generateProjects(${JSON.stringify(
        path.resolve(
          DIR,
          '../../packages/web-components/src/components/button/button.stories.ts'
        )
      )});
      process.stdout.write(JSON.stringify(projects.IconButton));
    `;
    const project = JSON.parse(
      execFileSync(process.execPath, ['--input-type=module', '-e', script], {
        encoding: 'utf8',
      })
    );
    const main = project.files['src/story.ts'];

    // the story module; `src/main.ts` only mounts it
    expect(project.openFile).toBe('src/story.ts');
    expect(main).toContain(
      'export default function mount(container: HTMLElement)'
    );
    expect(project.files['src/main.ts']).toContain(
      "import mount from './story';"
    );
    // relative source imports become published package imports
    expect(main).toContain(
      "import '@carbon/web-components/es/components/button/index.js';"
    );
    expect(main).not.toMatch(/from '\.\.?\//);
    // SB-only keys get dropped
    expect(main).not.toMatch(/\bparameters:/);
    expect(main).toMatch(/render\(IconButton\.render\(args\), container\)/);
    expect(
      Object.keys(JSON.parse(project.files['package.json']).dependencies)
    ).toEqual(
      expect.arrayContaining(['@carbon/icons', '@carbon/web-components', 'lit'])
    );
  });
});
