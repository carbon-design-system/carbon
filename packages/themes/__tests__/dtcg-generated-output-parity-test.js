/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

'use strict';

/**
 * GENERATED OUTPUT PARITY TEST
 *
 * This test compares ALL generated SCSS files from two build outputs:
 * 1. scss/generated/ - Generated from current JS/TS theme system
 * 2. scss/generated-dtcg/ - Generated from DTCG JSON tokens
 *
 * This ensures that the DTCG-based generation produces identical
 * output to the current system during migration.
 *
 * Once the JS-based system is removed, this test can be deleted
 * as there will be only one generation source (DTCG).
 */

const fs = require('fs');
const path = require('path');

const GENERATED_DIR = path.join(__dirname, '../scss/generated');
const GENERATED_DTCG_DIR = path.join(__dirname, '../scss/generated-dtcg');

/**
 * Parse SCSS file and extract all token definitions
 * Handles both simple variables and map structures
 */
function parseScssTokens(content) {
  const tokens = {};
  const lines = content.split('\n');
  let currentToken = null;
  let currentMap = [];
  let inMap = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Skip comments and empty lines
    if (line.startsWith('//') || line.startsWith('/*') || !line) {
      continue;
    }

    // Start of a map token: $name: (
    if (line.match(/^\$([a-zA-Z0-9-_]+):\s*\(/)) {
      const match = line.match(/^\$([a-zA-Z0-9-_]+):\s*\(/);
      currentToken = match[1];
      currentMap = [];
      inMap = true;
      continue;
    }

    // Inside a map: theme-name: value,
    if (inMap && line.match(/^([a-zA-Z0-9-_]+):\s*(.+?),?$/)) {
      const match = line.match(/^([a-zA-Z0-9-_]+):\s*(.+?),?$/);
      if (match) {
        const [, theme, value] = match;
        currentMap.push(`${theme}: ${value.replace(/,$/, '')}`);
      }
      continue;
    }

    // End of map: ) !default;
    if (inMap && line.match(/^\)\s*!default;/)) {
      tokens[currentToken] = currentMap.sort().join(', ');
      inMap = false;
      currentToken = null;
      currentMap = [];
      continue;
    }

    // Simple variable: $name: value;
    const simpleMatch = line.match(/^\$([a-zA-Z0-9-_]+):\s*(.+?);$/);
    if (simpleMatch && !inMap) {
      const [, name, value] = simpleMatch;
      tokens[name] = value.replace(/\s*!default$/, '').trim();
    }
  }

  return tokens;
}

/**
 * Normalize color values for comparison
 */
function normalizeValue(value) {
  // Remove whitespace
  value = value.replace(/\s+/g, ' ').trim();

  // Normalize hex colors to lowercase
  value = value.replace(/#[0-9a-fA-F]+/g, (match) => match.toLowerCase());

  return value;
}

/**
 * Compare two token sets
 */
function compareTokens(current, dtcg, filename) {
  const currentTokens = Object.keys(current).sort();
  const dtcgTokens = Object.keys(dtcg).sort();

  const missingInDTCG = currentTokens.filter((t) => !dtcgTokens.includes(t));
  const extraInDTCG = dtcgTokens.filter((t) => !currentTokens.includes(t));
  const commonTokens = currentTokens.filter((t) => dtcgTokens.includes(t));

  const valueDifferences = [];
  for (const tokenName of commonTokens) {
    const currentVal = normalizeValue(current[tokenName]);
    const dtcgVal = normalizeValue(dtcg[tokenName]);

    if (currentVal !== dtcgVal) {
      valueDifferences.push({
        token: tokenName,
        current: current[tokenName],
        dtcg: dtcg[tokenName],
      });
    }
  }

  return {
    missingInDTCG,
    extraInDTCG,
    valueDifferences,
    totalCurrent: currentTokens.length,
    totalDTCG: dtcgTokens.length,
    totalCommon: commonTokens.length,
    allTokensMatch:
      valueDifferences.length === 0 &&
      missingInDTCG.length === 0 &&
      extraInDTCG.length === 0,
  };
}

describe('DTCG Generated Output Parity Tests', () => {
  const generatedExists = fs.existsSync(GENERATED_DIR);
  const generatedDTCGExists = fs.existsSync(GENERATED_DTCG_DIR);

  beforeAll(() => {
    if (!generatedExists || !generatedDTCGExists) {
      console.warn(
        '\n⚠️  Generated directories not found. Run `yarn build` in packages/themes first.\n'
      );
    }
  });

  const testOrSkip = generatedExists && generatedDTCGExists ? test : test.skip;

  describe('File structure validation', () => {
    testOrSkip('Both directories should have the same SCSS files', () => {
      const currentFiles = fs
        .readdirSync(GENERATED_DIR)
        .filter((f) => f.endsWith('.scss'))
        .sort();

      const dtcgFiles = fs
        .readdirSync(GENERATED_DTCG_DIR)
        .filter((f) => f.endsWith('.scss'))
        .sort();

      console.log(`\nGenerated SCSS files:`);
      console.log(`  Current system: ${currentFiles.join(', ')}`);
      console.log(`  DTCG system:    ${dtcgFiles.join(', ')}`);

      expect(currentFiles).toEqual(dtcgFiles);
      expect(currentFiles.length).toBeGreaterThan(0);
    });
  });

  describe('Token parity for all generated files', () => {
    const filesToCompare = [
      '_themes.scss',
      '_tokens.scss',
      '_button-tokens.scss',
      '_tag-tokens.scss',
      '_notification-tokens.scss',
      '_status-tokens.scss',
      '_content-switcher-tokens.scss',
    ];

    filesToCompare.forEach((filename) => {
      testOrSkip(`${filename} - tokens should be identical`, () => {
        const currentFile = path.join(GENERATED_DIR, filename);
        const dtcgFile = path.join(GENERATED_DTCG_DIR, filename);

        expect(fs.existsSync(currentFile)).toBe(true);
        expect(fs.existsSync(dtcgFile)).toBe(true);

        const currentContent = fs.readFileSync(currentFile, 'utf8');
        const dtcgContent = fs.readFileSync(dtcgFile, 'utf8');

        const currentTokens = parseScssTokens(currentContent);
        const dtcgTokens = parseScssTokens(dtcgContent);

        const comparison = compareTokens(currentTokens, dtcgTokens, filename);

        console.log(`\n${filename}:`);
        console.log(`  Current: ${comparison.totalCurrent} tokens`);
        console.log(`  DTCG:    ${comparison.totalDTCG} tokens`);
        console.log(`  Common:  ${comparison.totalCommon} tokens`);

        if (comparison.missingInDTCG.length > 0) {
          console.log(
            `  ❌ Missing in DTCG: ${comparison.missingInDTCG.length}`
          );
          comparison.missingInDTCG
            .slice(0, 3)
            .forEach((t) => console.log(`     - $${t}`));
          if (comparison.missingInDTCG.length > 3) {
            console.log(
              `     ... and ${comparison.missingInDTCG.length - 3} more`
            );
          }
        }

        if (comparison.extraInDTCG.length > 0) {
          console.log(`  ⚠️  Extra in DTCG: ${comparison.extraInDTCG.length}`);
          comparison.extraInDTCG
            .slice(0, 3)
            .forEach((t) => console.log(`     + $${t}`));
          if (comparison.extraInDTCG.length > 3) {
            console.log(
              `     ... and ${comparison.extraInDTCG.length - 3} more`
            );
          }
        }

        if (comparison.valueDifferences.length > 0) {
          console.log(
            `  ❌ Value differences: ${comparison.valueDifferences.length}`
          );
          comparison.valueDifferences
            .slice(0, 2)
            .forEach(({ token, current, dtcg }) => {
              console.log(`     $${token}:`);
              console.log(`       Current: ${current}`);
              console.log(`       DTCG:    ${dtcg}`);
            });
          if (comparison.valueDifferences.length > 2) {
            console.log(
              `     ... and ${comparison.valueDifferences.length - 2} more`
            );
          }
        }

        if (comparison.allTokensMatch) {
          console.log(`  ✅ All tokens match perfectly!`);
        }

        // Assertions
        expect(comparison.totalCurrent).toBeGreaterThan(0);
        expect(comparison.totalDTCG).toBeGreaterThan(0);

        // These should be identical
        expect(comparison.missingInDTCG).toEqual([]);
        expect(comparison.extraInDTCG).toEqual([]);
        expect(comparison.valueDifferences).toEqual([]);
      });
    });
  });

  describe('Content comparison (strict)', () => {
    const filesToCompare = [
      '_themes.scss',
      '_tokens.scss',
      '_button-tokens.scss',
      '_tag-tokens.scss',
      '_notification-tokens.scss',
      '_status-tokens.scss',
      '_content-switcher-tokens.scss',
    ];

    filesToCompare.forEach((filename) => {
      testOrSkip(
        `${filename} - file content should be identical (excluding comments)`,
        () => {
          const currentFile = path.join(GENERATED_DIR, filename);
          const dtcgFile = path.join(GENERATED_DTCG_DIR, filename);

          const currentContent = fs.readFileSync(currentFile, 'utf8');
          const dtcgContent = fs.readFileSync(dtcgFile, 'utf8');

          // Remove comments and normalize whitespace for comparison
          const normalize = (content) => {
            return content
              .split('\n')
              .filter((line) => {
                const trimmed = line.trim();
                return (
                  trimmed &&
                  !trimmed.startsWith('//') &&
                  !trimmed.startsWith('/*')
                );
              })
              .map((line) => line.trim())
              .join('\n');
          };

          const normalizedCurrent = normalize(currentContent);
          const normalizedDTCG = normalize(dtcgContent);

          if (normalizedCurrent === normalizedDTCG) {
            console.log(`  ✅ ${filename} - Content is identical`);
          } else {
            console.log(`  ❌ ${filename} - Content differs`);
          }

          expect(normalizedDTCG).toBe(normalizedCurrent);
        }
      );
    });
  });
});
