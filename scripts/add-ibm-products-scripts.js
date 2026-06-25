#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const packageJsonPath = path.join(__dirname, '..', 'package.json');
const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

// Add ibm-products specific scripts
const newScripts = {
  // Test scripts for ibm-products
  'test:ibm-products': 'lerna run --stream --scope @carbon/ibm-products test --',
  'test:ibm-products-styles': 'lerna run --stream --scope @carbon/ibm-products-styles test --',
  'test:ibm-products-wc': 'lerna run --stream --scope @carbon/ibm-products-web-components test --',
  
  // Build scripts
  'build:ibm-products': 'lerna run build --scope \'@carbon/ibm-products*\' --include-dependencies --stream',
  
  // Storybook scripts
  'storybook:ibm-products': 'cd packages/ibm-products && yarn storybook:start',
  'storybook:ibm-products:build': 'cd packages/ibm-products && yarn storybook:build',
  'storybook:ibm-products-wc': 'cd packages/ibm-products-web-components && yarn storybook',
  
  // AVT testing
  'avt:ibm-products': 'AVT=true yarn playwright test --project chromium --grep @avt',
  
  // Coverage
  'coverage:ibm-products': 'yarn test:ibm-products --coverage',
  'coverage:ibm-products-wc': 'cd packages/ibm-products-web-components && yarn coverage'
};

// Merge new scripts with existing ones
pkg.scripts = {
  ...pkg.scripts,
  ...newScripts
};

// Sort scripts alphabetically for better organization
const sortedScripts = {};
Object.keys(pkg.scripts).sort().forEach(key => {
  sortedScripts[key] = pkg.scripts[key];
});
pkg.scripts = sortedScripts;

// Write back to package.json
fs.writeFileSync(packageJsonPath, JSON.stringify(pkg, null, 2) + '\n');

console.log('✅ Added ibm-products scripts to package.json');
console.log('\nNew scripts added:');
Object.keys(newScripts).forEach(script => {
  console.log(`  - ${script}`);
});

// Made with Bob
