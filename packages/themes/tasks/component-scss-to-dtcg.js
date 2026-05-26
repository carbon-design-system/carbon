#!/usr/bin/env node

'use strict';

const fs = require('fs');
const path = require('path');

/**
 * Convert component token SCSS file to DTCG JSON format
 * Component tokens use theme keys: white-theme, g-10, g-90, g-100
 */
function convertComponentTokens(scssFilePath, outputJsonPath) {
  const scssContent = fs.readFileSync(scssFilePath, 'utf8');
  const lines = scssContent.split('\n');

  const tokens = {};
  let currentToken = null;
  let currentMap = {};
  let inMap = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Match token variable declaration: $tag-background-blue: (
    const tokenMatch = line.match(/^\$([a-z-]+):\s*\(/);
    if (tokenMatch) {
      currentToken = tokenMatch[1];
      currentMap = {};
      inMap = true;
      // console.log('Found token:', currentToken);
      continue;
    }

    // Match theme value: white-theme: #d0e2ff,
    if (inMap && line.match(/^(white-theme|g-10|g-90|g-100):/)) {
      const valueMatch = line.match(
        /^(white-theme|g-10|g-90|g-100):\s*(.+?),?\s*$/
      );
      if (valueMatch) {
        const themeKey = valueMatch[1];
        let value = valueMatch[2].trim();

        // Handle rgba values that might span multiple lines
        if (value.startsWith('rgba(') && !value.endsWith(')')) {
          // Read next lines until we find the closing parenthesis
          let j = i + 1;
          while (j < lines.length && !value.endsWith(')')) {
            value += ' ' + lines[j].trim();
            j++;
          }
          i = j - 1; // Update outer loop counter
        }

        // Normalize theme keys to match DTCG format
        const normalizedKey = themeKey
          .replace('white-theme', 'white')
          .replace('g-10', 'g10')
          .replace('g-90', 'g90')
          .replace('g-100', 'g100');

        currentMap[normalizedKey] = value;
      }
    }

    // End of map
    if (inMap && line.match(/^\)\s*!default;/)) {
      // console.log('End of map for', currentToken, 'with', Object.keys(currentMap).length, 'values');
      if (currentToken && Object.keys(currentMap).length > 0) {
        // Convert token name: tag-background-blue -> background-blue
        // Or keep as-is if it doesn't have the component prefix repeated
        let tokenName = currentToken;

        // Extract component name from output path
        const componentMatch = outputJsonPath.match(/([a-z-]+)\.json$/);
        if (componentMatch) {
          const component = componentMatch[1];
          // Remove component prefix if present: tag-background-blue -> background-blue
          const prefixPattern = new RegExp(`^${component}-`);
          if (prefixPattern.test(currentToken)) {
            tokenName = currentToken.replace(prefixPattern, '');
          }
        }

        tokens[tokenName] = {
          $type: 'color',
          $description: `${tokenName} token`,
          $extensions: {
            'carbon.themes': currentMap,
          },
        };
      }
      inMap = false;
      currentToken = null;
      currentMap = {};
    }
  }

  // Create DTCG structure
  const componentName = path.basename(outputJsonPath, '.json');
  const dtcgJson = {
    $schema: 'https://tr.designtokens.org/format/',
    $description: `${componentName} component tokens`,
    [componentName]: tokens,
  };

  // Write output
  fs.writeFileSync(outputJsonPath, JSON.stringify(dtcgJson, null, 2) + '\n');
  console.log(
    `✓ Generated ${outputJsonPath} (${Object.keys(tokens).length} tokens)`
  );
}

// Main execution
if (require.main === module) {
  const args = process.argv.slice(2);
  if (args.length !== 2) {
    console.error(
      'Usage: node component-scss-to-dtcg.js <input.scss> <output.json>'
    );
    process.exit(1);
  }

  const [inputFile, outputFile] = args;
  const inputPath = path.resolve(__dirname, '..', inputFile);
  const outputPath = path.resolve(__dirname, '..', outputFile);

  if (!fs.existsSync(inputPath)) {
    console.error(`Error: Input file not found: ${inputPath}`);
    process.exit(1);
  }

  convertComponentTokens(inputPath, outputPath);
}

module.exports = { convertComponentTokens };
