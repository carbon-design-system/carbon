#!/usr/bin/env node

/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */

/**
 * Script to refactor story files from using <sb-template-layers> custom element
 * to using the withLayers decorator approach.
 *
 * This script:
 * 1. Finds all .stories.ts files using sb-template-layers
 * 2. Adds import for withLayers decorator
 * 3. Replaces <sb-template-layers> wrapper with decorator usage
 * 4. Adds fullscreen layout parameter to Layer stories
 * 5. Handles both wrapper pattern and .renderContent pattern
 */

// todo: delete after use

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const DRY_RUN = process.argv.includes('--dry-run');
const VERBOSE = process.argv.includes('--verbose');

console.log(`\n🔧 Refactoring layer stories to use decorator approach`);
console.log(
  `Mode: ${DRY_RUN ? 'DRY RUN (no changes will be made)' : 'LIVE (files will be modified)'}\n`
);

// Find all story files that use sb-template-layers
function findFilesWithLayerTemplate() {
  try {
    const result = execSync(
      'grep -r "sb-template-layers" packages/web-components/src/components --include="*.stories.ts" -l',
      { encoding: 'utf-8' }
    );
    return result.trim().split('\n').filter(Boolean);
  } catch (error) {
    // grep returns non-zero exit code when no matches found
    return [];
  }
}

// Check if file already has withLayers import
function hasWithLayersImport(content) {
  return /import\s+{\s*withLayers\s*}\s+from/.test(content);
}

// Add withLayers import to file
function addWithLayersImport(content) {
  // Find the last import statement
  const importRegex = /^import\s+.*?;$/gm;
  const imports = content.match(importRegex);

  if (!imports || imports.length === 0) {
    // No imports found, add at the beginning after copyright
    const copyrightEnd = content.indexOf('*/');
    if (copyrightEnd !== -1) {
      const insertPos = copyrightEnd + 2;
      return (
        content.slice(0, insertPos) +
        "\n\nimport { withLayers } from '../../../.storybook/decorators/with-layers';" +
        content.slice(insertPos)
      );
    }
    return content;
  }

  // Add after the last import
  const lastImport = imports[imports.length - 1];
  const lastImportIndex = content.lastIndexOf(lastImport);
  const insertPos = lastImportIndex + lastImport.length;

  return (
    content.slice(0, insertPos) +
    "\nimport { withLayers } from '../../../.storybook/decorators/with-layers';" +
    content.slice(insertPos)
  );
}

// Refactor story to use decorator instead of wrapper
function refactorStoryContent(content) {
  let modified = content;
  let changesMade = false;

  // Pattern 1: Handle .renderContent pattern (used in multi-select)
  // <sb-template-layers .renderContent=${renderFunction}>
  const renderContentPattern =
    /<sb-template-layers\s+\.renderContent=\$\{([^}]+)\}>\s*<\/sb-template-layers>/g;
  if (renderContentPattern.test(content)) {
    modified = modified.replace(renderContentPattern, (match, renderFn) => {
      changesMade = true;
      return `${renderFn.trim()}()`;
    });

    // For .renderContent pattern, we need to add decorators to the story export
    // This is more complex and might need manual review
    if (VERBOSE) {
      console.log(
        '  ⚠️  Found .renderContent pattern - may need manual review for decorator placement'
      );
    }
  }

  // Pattern 2: Handle wrapper pattern (most common)
  // <sb-template-layers>...</sb-template-layers>
  const wrapperPattern =
    /<sb-template-layers>([\s\S]*?)<\/sb-template-layers>/g;

  modified = modified.replace(wrapperPattern, (match, innerContent) => {
    changesMade = true;
    // Remove the wrapper, keep the inner content
    return innerContent.trim();
  });

  // Pattern 3: Add decorators and parameters to story exports that had sb-template-layers
  if (changesMade) {
    // Find story exports and add decorators if not present
    const storyExportPattern = /export const (\w+) = \{([^}]*)\}/g;

    modified = modified.replace(
      storyExportPattern,
      (match, storyName, storyContent) => {
        // Check if this story likely had layers (heuristic: contains "Layer" in name)
        if (
          storyName.includes('Layer') &&
          !storyContent.includes('decorators:')
        ) {
          // Add decorators array and parameters
          const hasParameters = storyContent.includes('parameters:');

          if (hasParameters) {
            // Just add decorators
            return `export const ${storyName} = {\n  decorators: [withLayers],${storyContent}}`;
          } else {
            // Add both decorators and parameters
            return `export const ${storyName} = {\n  decorators: [withLayers],\n  parameters: {\n    layout: 'fullscreen',\n  },${storyContent}}`;
          }
        }
        return match;
      }
    );
  }

  return { modified, changesMade };
}

// Add fullscreen parameter to existing Layer stories that already have decorators
function addFullscreenParameter(content) {
  let modified = content;
  let changesMade = false;

  // Find Layer story exports that have decorators but no parameters
  const layerStoryPattern =
    /export const (\w*Layer\w*) = \{([^}]*decorators:\s*\[withLayers\][^}]*)\}/g;

  modified = modified.replace(
    layerStoryPattern,
    (match, storyName, storyContent) => {
      // Check if parameters already exist
      if (storyContent.includes('parameters:')) {
        return match; // Already has parameters
      }

      changesMade = true;

      // Add parameters after decorators
      const withParams = storyContent.replace(
        /(decorators:\s*\[withLayers\],?)/,
        "$1\n  parameters: {\n    layout: 'fullscreen',\n  },"
      );

      return `export const ${storyName} = {${withParams}}`;
    }
  );

  return { modified, changesMade };
}

// Process a single file
function processFile(filePath) {
  if (VERBOSE) {
    console.log(`\n📄 Processing: ${filePath}`);
  }

  let content = fs.readFileSync(filePath, 'utf-8');
  let modified = content;
  let changes = [];

  // Add import if not present
  if (!hasWithLayersImport(content)) {
    modified = addWithLayersImport(modified);
    changes.push('Added withLayers import');
  }

  // Refactor story content
  const { modified: refactored, changesMade } = refactorStoryContent(modified);
  if (changesMade) {
    modified = refactored;
    changes.push('Refactored sb-template-layers usage');
  }

  // Add fullscreen parameter to existing Layer stories
  const { modified: withParams, changesMade: paramsAdded } =
    addFullscreenParameter(modified);
  if (paramsAdded) {
    modified = withParams;
    changes.push('Added fullscreen layout parameter');
  }

  // Write changes if not dry run
  if (changes.length > 0) {
    if (!DRY_RUN) {
      fs.writeFileSync(filePath, modified, 'utf-8');
    }

    console.log(`  ✅ ${path.basename(filePath)}`);
    if (VERBOSE) {
      changes.forEach((change) => console.log(`     - ${change}`));
    }
    return true;
  } else {
    if (VERBOSE) {
      console.log(`  ⏭️  No changes needed`);
    }
    return false;
  }
}

// Main execution
function main() {
  const files = findFilesWithLayerTemplate();

  if (files.length === 0) {
    console.log('✨ No files found using sb-template-layers\n');
    return;
  }

  console.log(`Found ${files.length} files to process:\n`);

  let processedCount = 0;
  let skippedCount = 0;

  files.forEach((file) => {
    try {
      const wasProcessed = processFile(file);
      if (wasProcessed) {
        processedCount++;
      } else {
        skippedCount++;
      }
    } catch (error) {
      console.error(`\n❌ Error processing ${file}:`, error.message);
    }
  });

  console.log(`\n📊 Summary:`);
  console.log(`   Modified: ${processedCount} files`);
  console.log(`   Skipped: ${skippedCount} files`);

  if (DRY_RUN) {
    console.log(
      `\n💡 This was a dry run. Run without --dry-run to apply changes.`
    );
  } else {
    console.log(`\n✨ Refactoring complete!`);
    console.log(
      `\n⚠️  Important: Please review the changes and run tests to ensure everything works correctly.`
    );
    console.log(
      `   Some stories may need manual adjustment, especially those using .renderContent pattern.`
    );
  }
}

main();
