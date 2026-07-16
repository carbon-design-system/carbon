/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';

import baseConfig from '../.storybook/main.ts';
import { productMigratedStoryGlobs } from '../.storybook/product-migrated-story-globs.js';

const configDir = fileURLToPath(new URL('.', import.meta.url));
const manifestPath = path.join(configDir, 'generated', 'manifest.json');
const manifest = fs.existsSync(manifestPath)
  ? JSON.parse(fs.readFileSync(manifestPath, 'utf8'))
  : { replacedStories: [] };
const deprecatedStoriesDir = path.join(configDir, 'deprecated');
const replacedStories = new Set(manifest.replacedStories);
const replacedDocs = new Set(
  manifest.replacedStories.map((story: string) => {
    return story.replace(/\.stories\.[^.]+$/, '.mdx');
  })
);
const v12FeatureFlags = `@use '@carbon/styles/scss/feature-flags' with ($feature-flags: ('enable-v12-release': true));\n`;
const v12FeatureFlagPattern = /\benable-v12-[a-z0-9-]+\b/;
const titlePatterns = {
  Deprecated: /(?:title:\s*['"`]|<Meta\s+title=["'])Deprecated(?:\/|['"`])/,
};

function isFeatureFlagStory(story: string) {
  return (
    story.includes('.featureflag.') ||
    story.includes('.feature-flag.') ||
    story.includes('/Feature Flag')
  );
}

function isV12FeatureFlagStory(story: string) {
  if (!isFeatureFlagStory(story) || story.startsWith('./')) {
    return false;
  }

  try {
    const source = fs.readFileSync(path.resolve(configDir, story), 'utf8');
    return v12FeatureFlagPattern.test(source);
  } catch {
    return false;
  }
}

function hasTopLevelTitle(story: string, title: keyof typeof titlePatterns) {
  if (story.startsWith('./')) {
    return false;
  }

  try {
    const source = fs.readFileSync(path.resolve(configDir, story), 'utf8');
    return titlePatterns[title].test(source);
  } catch {
    return false;
  }
}

function getV12StoryPath(
  story: NonNullable<StorybookConfig['stories']>[number]
) {
  if (story === './Welcome/Welcome.mdx') {
    return story;
  }

  if (typeof story === 'string' && story.startsWith('./')) {
    return `../.storybook/${story.slice(2)}`;
  }

  return story;
}

const stories = (baseConfig.stories ?? [])
  .map(getV12StoryPath)
  .filter((story) => {
    return (
      typeof story !== 'string' ||
      (!isV12FeatureFlagStory(story) &&
        !hasTopLevelTitle(story, 'Deprecated') &&
        !replacedStories.has(story) &&
        !replacedDocs.has(story))
    );
  })
  .concat(
    ...(fs.existsSync(deprecatedStoriesDir)
      ? ['./deprecated/**/*.mdx', './deprecated/**/*.stories.@(js|jsx|ts|tsx)']
      : []),
    './generated/**/*.stories.@(js|jsx|ts|tsx)',
    // ibm-products components in migration — only shown in v12 Storybook
    ...productMigratedStoryGlobs
  );

const config: StorybookConfig = {
  ...baseConfig,
  stories,
  async viteFinal(viteConfig, options) {
    const baseViteConfig = baseConfig.viteFinal
      ? await baseConfig.viteFinal(viteConfig, options)
      : viteConfig;

    return mergeConfig(baseViteConfig, {
      css: {
        preprocessorOptions: {
          scss: {
            additionalData: v12FeatureFlags,
          },
        },
      },
    });
  },
};

export default config;
