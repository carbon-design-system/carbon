/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { execSync } from 'node:child_process';
import { writeFileSync, mkdirSync } from 'node:fs';
import { relative, dirname } from 'node:path';

// Resolve repo root so paths are always relative to it
const repoRoot = execSync('git rev-parse --show-toplevel', {
  encoding: 'utf8',
}).trim();

// ---- Packages ----
const structureOutputPath = 'docs/generated/package-structure.json';
const rawPackages = execSync('yarn lerna list --all --long --json', {
  encoding: 'utf8',
});

const packages = JSON.parse(rawPackages)
  .map((pkg) => ({
    name: pkg.name,
    path: relative(repoRoot, pkg.location),
    private: pkg.private,
  }))
  .sort((a, b) => a.name.localeCompare(b.name));

// Ensure the directory exists
mkdirSync(dirname(structureOutputPath), { recursive: true });
writeFileSync(structureOutputPath, JSON.stringify(packages, null, 2) + '\n');
console.log(`✓ wrote ${structureOutputPath}`);

// ---- Graph ----
const graphOutputPath = 'docs/generated/monorepo-internal-graph.json';
const rawGraph = execSync('yarn lerna list --all --graph', {
  encoding: 'utf8',
});

mkdirSync(dirname(graphOutputPath), { recursive: true });
writeFileSync(
  graphOutputPath,
  JSON.stringify(JSON.parse(rawGraph), null, 2) + '\n'
);
console.log(`✓ wrote ${graphOutputPath}`);
