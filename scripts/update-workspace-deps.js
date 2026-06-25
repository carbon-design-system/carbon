#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Carbon packages that should use workspace protocol
const carbonPackages = [
  '@carbon/react',
  '@carbon/styles',
  '@carbon/web-components',
  '@carbon/colors',
  '@carbon/grid',
  '@carbon/icons',
  '@carbon/icons-react',
  '@carbon/layout',
  '@carbon/motion',
  '@carbon/themes',
  '@carbon/type',
  // IBM Products packages (for cross-dependencies)
  '@carbon/ibm-products-styles',
  '@carbon/ibm-products-utilities'
];

console.log('🔄 Updating workspace dependencies...\n');

// Find all package.json files in packages and config directories
const packageFiles = [
  ...glob.sync('packages/ibm-products*/package.json', { cwd: process.cwd() }),
  ...glob.sync('config/*ibm*/package.json', { cwd: process.cwd() })
];

let updatedCount = 0;
let totalChanges = 0;

packageFiles.forEach(file => {
  const fullPath = path.join(process.cwd(), file);
  const pkg = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
  let changed = false;
  const changes = [];

  ['dependencies', 'devDependencies', 'peerDependencies'].forEach(depType => {
    if (pkg[depType]) {
      Object.keys(pkg[depType]).forEach(dep => {
        if (carbonPackages.includes(dep)) {
          const oldValue = pkg[depType][dep];
          pkg[depType][dep] = 'workspace:*';
          if (oldValue !== 'workspace:*') {
            changed = true;
            changes.push(`  ${dep}: ${oldValue} → workspace:*`);
            totalChanges++;
          }
        }
      });
    }
  });

  if (changed) {
    fs.writeFileSync(fullPath, JSON.stringify(pkg, null, 2) + '\n');
    updatedCount++;
    console.log(`✅ Updated ${file}`);
    changes.forEach(change => console.log(change));
    console.log('');
  }
});

console.log(`\n📊 Summary:`);
console.log(`  - Files updated: ${updatedCount}`);
console.log(`  - Total dependency changes: ${totalChanges}`);
console.log(`\n✅ Workspace dependencies updated successfully!`);

// Made with Bob
