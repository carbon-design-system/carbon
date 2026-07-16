/**
 * Copyright IBM Corp. 2026, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import fs from 'node:fs/promises';
import path from 'node:path';

const packageArg = process.argv[2] ?? '.';
const packageDir = path.resolve(process.cwd(), packageArg);
const sourceDir = path.join(packageDir, 'src');
const storybookDir = path.join(packageDir, '.storybook-v12');
const storybookStoriesDir = path.join(storybookDir, 'stories');
const generatedDir = path.join(storybookDir, 'generated');
const manifestPath = path.join(generatedDir, 'manifest.json');

const storyExportRegex =
  /^export\s+(?:const|function)\s+([A-Za-z_$][\w$]*)\b/gm;
const v12FeatureFlagRegex = /\benable-v12-[a-z0-9-]+\b/;

/**
 * Storybook config prefers POSIX-style paths even when the script runs on a
 * platform with different path separators.
 *
 * @param {string} value
 * @returns {string}
 */
function toPosixPath(value) {
  return value.split(path.sep).join('/');
}

/**
 * Build an import specifier from one generated wrapper file to one source story
 * file. The result is always relative because generated files are not part of a
 * package export surface.
 *
 * @param {string} fromFile
 * @param {string} targetFile
 * @returns {string}
 */
function toImportPath(fromFile, targetFile) {
  const relativePath = toPosixPath(
    path.relative(path.dirname(fromFile), targetFile)
  );
  return relativePath.startsWith('.') ? relativePath : `./${relativePath}`;
}

/**
 * Convert an absolute file path to the path format stored in the v12 manifest.
 * These paths are relative to `.storybook-v12` because `.storybook-v12/main.ts`
 * compares them against its configured story paths.
 *
 * @param {string} file
 * @returns {string}
 */
function toStoryPath(file) {
  return toPosixPath(path.relative(storybookDir, file));
}

/**
 * Format paths for terminal output relative to the command's current working
 * directory. This keeps package-local commands readable, e.g.
 * `./.storybook-v12/generated`.
 *
 * @param {string} file
 * @returns {string}
 */
function toDisplayPath(file) {
  const relativePath = toPosixPath(path.relative(process.cwd(), file));

  if (relativePath === '') {
    return '.';
  }

  if (relativePath.startsWith('../') || relativePath.startsWith('./')) {
    return relativePath;
  }

  return `./${relativePath}`;
}

/**
 * The repo has used both `.featureflag` and `.feature-flag` naming. Treat both
 * as feature-flag stories so older and newer component files are handled
 * consistently.
 *
 * @param {string} file
 * @returns {boolean}
 */
function isFeatureFlagStory(file) {
  return (
    file.includes('.featureflag.stories.') ||
    file.includes('.feature-flag.stories.')
  );
}

/**
 * Stories under `.storybook-v12/stories` are authored only for v12, so they do
 * not need to reference an `enable-v12-*` flag to be promoted.
 *
 * @param {string} file
 * @returns {boolean}
 */
function isLocalV12Story(file) {
  return file.startsWith(`${storybookStoriesDir}${path.sep}`);
}

/**
 * Only `enable-v12-*` flags are committed to become v12 defaults. Other feature
 * flags should remain in their Feature Flag sidebar sections.
 *
 * @param {string} source
 * @returns {boolean}
 */
function hasV12FeatureFlag(source) {
  return v12FeatureFlagRegex.test(source);
}

/**
 * Feature-flag stories conventionally sit next to a base story file with the
 * feature-flag marker removed from the filename. If a base story exists, the
 * generated wrapper can replace or merge its exports.
 *
 * @param {string} featureStoryFile
 * @returns {string | undefined}
 */
function getBaseStoryFile(featureStoryFile) {
  const candidates = [
    featureStoryFile.replace('.featureflag.stories.', '.stories.'),
    featureStoryFile.replace('.feature-flag.stories.', '.stories.'),
  ];

  return candidates.find((candidate) => candidate !== featureStoryFile);
}

/**
 * Convert a `.../Feature Flag` title back to the normal component section.
 * Local v12-only stories may not have a matching base file, so the fallback
 * derives a component-ish title from the file location.
 *
 * @param {string | undefined} title
 * @param {string} featureStoryFile
 * @returns {string}
 */
function stripFeatureFlagTitle(title, featureStoryFile) {
  if (title) {
    return title.replace(/\/Feature Flags?$/i, '');
  }

  const componentName = path.basename(
    path.dirname(
      featureStoryFile.replace(`${path.sep}stories${path.sep}`, path.sep)
    )
  );
  return `Components/${componentName}`;
}

/**
 * Extract simple CSF default-export titles. The generator only needs the
 * static title strings used by the existing Storybook files.
 *
 * @param {string} source
 * @returns {string | undefined}
 */
function getTitle(source) {
  return source.match(/title:\s*['"]([^'"]+)['"]/)?.[1];
}

/**
 * Collect named story exports from a CSF file while preserving declaration
 * order. This intentionally ignores re-exports and dynamic patterns because the
 * existing feature-flag stories use direct `export const` / `export function`
 * declarations.
 *
 * @param {string} source
 * @returns {string[]}
 */
function getStoryExports(source) {
  const exports = [];
  for (const match of source.matchAll(storyExportRegex)) {
    if (!exports.includes(match[1])) {
      exports.push(match[1]);
    }
  }
  return exports;
}

/**
 * Mirror Storybook's readable-name fallback for an export name.
 *
 * @param {string} exportName
 * @returns {string}
 */
function getStoryName(exportName) {
  return exportName
    .replace(/^_+/, '')
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2');
}

/**
 * Create stable generated wrapper filenames from source story paths. The source
 * path is encoded into the filename to avoid collisions between components with
 * similarly named feature-flag files.
 *
 * @param {string} featureStoryFile
 * @returns {string}
 */
function getGeneratedFileName(featureStoryFile) {
  const relativePath = toPosixPath(path.relative(packageDir, featureStoryFile));
  return `${relativePath.replace(/[^A-Za-z0-9_$]+/g, '__')}.stories.js`;
}

/**
 * Small access helper for optional base stories and optional local v12 story
 * directories.
 *
 * @param {string} file
 * @returns {Promise<boolean>}
 */
async function fileExists(file) {
  try {
    await fs.access(file);
    return true;
  } catch {
    return false;
  }
}

/**
 * Resolve a file while tolerating case-only filename differences. Some existing
 * story files vary by component casing, and generated imports need the actual
 * on-disk filename.
 *
 * @param {string} file
 * @returns {Promise<string | null>}
 */
async function resolveExistingFile(file) {
  try {
    const directory = path.dirname(file);
    const basename = path.basename(file).toLowerCase();
    const entries = await fs.readdir(directory, { withFileTypes: true });
    const entry = entries.find((entry) => {
      return entry.isFile() && entry.name.toLowerCase() === basename;
    });

    if (entry) {
      return path.join(directory, entry.name);
    }

    return (await fileExists(file)) ? file : null;
  } catch {
    return (await fileExists(file)) ? file : null;
  }
}

/**
 * Recursively list files below a directory. The story globs are simple enough
 * that walking once is easier to reason about than coordinating multiple glob
 * patterns.
 *
 * @param {string} directory
 * @returns {Promise<string[]>}
 */
async function findFiles(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await findFiles(entryPath)));
      continue;
    }
    files.push(entryPath);
  }

  return files;
}

/**
 * Generate a wrapper CSF file that presents v12 feature-flag stories as normal
 * v12 Storybook stories.
 *
 * Export names are the merge contract:
 * - matching base and feature exports become replacements;
 * - base-only exports stay unchanged;
 * - feature-only exports are new v12 stories and receive the `🚀` label.
 *
 * @param {object} options
 * @param {string | null} options.baseStoryFile
 * @param {string[]} options.baseStoryExports
 * @param {string} options.featureStoryFile
 * @param {string[]} options.featureStoryExports
 * @param {string} options.outputFile
 * @param {string} options.title
 * @returns {string}
 */
function createGeneratedStory({
  baseStoryFile,
  baseStoryExports,
  featureStoryFile,
  featureStoryExports,
  outputFile,
  title,
}) {
  const baseExportSet = new Set(baseStoryExports);
  const featureExportSet = new Set(featureStoryExports);

  // Preserve the base story order first, then append new v12-only stories.
  // That keeps the v12 sidebar familiar while still surfacing new examples.
  const storyExports = [
    ...baseStoryExports.map((name) => ({
      name,
      source: featureExportSet.has(name) ? 'featureStories' : 'baseStories',
      isNew: false,
    })),
    ...featureStoryExports
      .filter((name) => !baseExportSet.has(name))
      .map((name) => ({
        name,
        source: 'featureStories',
        isNew: true,
      })),
  ];

  const imports = [
    baseStoryFile
      ? `import * as baseStories from '${toImportPath(outputFile, baseStoryFile)}';`
      : 'const baseStories = {};',
    `import * as featureStories from '${toImportPath(
      outputFile,
      featureStoryFile
    )}';`,
  ].join('\n');

  const exports = storyExports
    .map(({ name, source, isNew }) => {
      const story =
        source === 'featureStories'
          ? `withFeatureMeta(${source}.${name})`
          : `${source}.${name}`;
      const annotation = isNew ? `markNewStory(${story}, '${name}')` : story;
      const storyExport = `export const ${name} = ${annotation};`;

      if (!isNew) {
        return storyExport;
      }

      // Storybook's indexer reads static storyName assignments. The runtime
      // helper alone is not enough to keep the marker in the sidebar.
      return `${storyExport}\n${name}.storyName = '🚀 ${getStoryName(name)}';`;
    })
    .join('\n');
  const featureMetaForWrapper = baseStoryFile
    ? 'featureMetaWithoutTags'
    : 'featureMeta';
  const featureMetaWithoutTags = baseStoryFile
    ? `
const featureMetaWithoutTags = { ...featureMeta };
delete featureMetaWithoutTags.tags;`
    : '';

  return `/**
 * Code generated by tasks/prepare-v12-storybook.mjs. DO NOT EDIT.
 */

${imports}

const baseMeta = baseStories.default ?? {};
const featureMeta = featureStories.default ?? {};${featureMetaWithoutTags}
const featureMetaDecorators = featureMeta.decorators ?? [];
const featureMetaParameters = featureMeta.parameters ?? {};

function getStoryName(exportName) {
  return exportName
    .replace(/^_+/, '')
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2');
}

function getNewStoryName(storyName) {
  return storyName.startsWith('🚀 ') ? storyName : '🚀 ' + storyName;
}

// Preserve feature story decorators/parameters because many feature-flag stories
// carry docs pages, wrappers, or component-specific controls.
function markNewStory(story, exportName) {
  if (typeof story === 'function') {
    story.storyName = getNewStoryName(
      story.storyName ?? getStoryName(exportName)
    );
    return story;
  }

  return {
    ...story,
    name: getNewStoryName(story?.name ?? getStoryName(exportName)),
  };
}

function withFeatureMeta(story) {
  if (typeof story === 'function') {
    story.decorators = [...(story.decorators ?? []), ...featureMetaDecorators];
    story.parameters = {
      ...featureMetaParameters,
      ...(story.parameters ?? {}),
    };
    return story;
  }

  return {
    ...story,
    decorators: [...(story?.decorators ?? []), ...featureMetaDecorators],
    parameters: {
      ...featureMetaParameters,
      ...(story?.parameters ?? {}),
    },
  };
}

// Prefer base metadata when it exists so generated wrappers keep the normal
// component docs settings. In particular, do not carry a feature story's
// !autodocs tag into the normal component section. The generated title
// deliberately drops Feature Flag.
export default {
  ...${featureMetaForWrapper},
  ...baseMeta,
  title: '${title}',
  decorators: baseMeta.decorators,
};

${exports}
`;
}

/**
 * Build the generated v12 wrapper directory and manifest for one package.
 */
async function main() {
  console.log(`\n┌  tasks/prepare-v12-storybook.mjs
│
│  Generating v12 wrapper storybook stories into ./.storybook-v12/generated
│
●  Starting...`);

  const allFiles = [
    ...(await findFiles(sourceDir)),
    ...((await fileExists(storybookStoriesDir))
      ? await findFiles(storybookStoriesDir)
      : []),
  ];
  const featureStoryFiles = allFiles
    .filter((file) => isFeatureFlagStory(file))
    .sort();

  // Recreate the generated directory on every run so deleted or renamed source
  // stories do not leave stale wrappers behind.
  await fs.rm(generatedDir, { recursive: true, force: true });
  await fs.mkdir(generatedDir, { recursive: true });

  const replacedStories = new Set();
  const generatedStories = [];

  for (const featureStoryFile of featureStoryFiles) {
    const featureStorySource = await fs.readFile(featureStoryFile, 'utf8');

    // Source feature-flag stories are only v12 defaults when they reference an
    // `enable-v12-*` flag. Other feature-flag stories remain opt-in in v12.
    if (
      !isLocalV12Story(featureStoryFile) &&
      !hasV12FeatureFlag(featureStorySource)
    ) {
      continue;
    }

    const featureStoryExports = getStoryExports(featureStorySource);
    if (featureStoryExports.length === 0) {
      continue;
    }

    const baseStoryCandidate = getBaseStoryFile(featureStoryFile);
    const baseStoryFile = baseStoryCandidate
      ? await resolveExistingFile(baseStoryCandidate)
      : null;
    const baseStorySource = baseStoryFile
      ? await fs.readFile(baseStoryFile, 'utf8')
      : '';
    const baseStoryExports = baseStoryFile
      ? getStoryExports(baseStorySource)
      : [];

    if (baseStoryFile) {
      // The v12 Storybook removes the original base story entry when a generated
      // wrapper replaces it, avoiding duplicate story IDs.
      replacedStories.add(toStoryPath(baseStoryFile));
    }

    const title = stripFeatureFlagTitle(
      getTitle(baseStorySource) ?? getTitle(featureStorySource),
      featureStoryFile
    );
    const outputFile = path.join(
      generatedDir,
      getGeneratedFileName(featureStoryFile)
    );
    const generatedStory = createGeneratedStory({
      baseStoryFile,
      baseStoryExports,
      featureStoryFile,
      featureStoryExports,
      outputFile,
      title,
    });

    await fs.writeFile(outputFile, generatedStory);
    generatedStories.push({
      path: toStoryPath(outputFile),
      displayPath: toDisplayPath(outputFile),
      stories: [
        ...baseStoryExports.map((name) => ({
          name: getStoryName(name),
        })),
        ...featureStoryExports
          .filter((name) => !baseStoryExports.includes(name))
          .map((name) => ({
            name: `🚀 ${getStoryName(name)}`,
          })),
      ],
    });
  }

  await fs.writeFile(
    manifestPath,
    `${JSON.stringify(
      {
        generatedStories: generatedStories.map((story) => story.path),
        replacedStories: [...replacedStories].sort(),
      },
      null,
      2
    )}\n`
  );

  for (const generatedStory of generatedStories) {
    console.log(`│\n◇  ${generatedStory.displayPath}`);
    for (const story of generatedStory.stories) {
      console.log(`│    - ${story.name}`);
    }
  }

  console.log(`|\n●  Done!
│  Generated ${generatedStories.length} v12 Storybook wrapper stories in ${toDisplayPath(
    generatedDir
  )}
|\n▲  Do not edit ./.storybook-v12/generated
|\n▲  All v12-specific stories are flagged with 🚀
|\n└  Exiting tasks/prepare-v12-storybook.mjs
`);
}

main().catch((error) => {
  console.log(`│
└  tasks/prepare-v12-storybook.mjs exiting with an error...`);
  console.error(error);
  process.exit(1);
});
