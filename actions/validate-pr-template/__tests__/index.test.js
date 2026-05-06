/**
 * Copyright IBM Corp. 2018, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const fs = require('fs');
const path = require('path');

const {
  getLines,
  isHeading,
  isHtmlComment,
  normalizeChecklistLine,
  getTemplateHeadings,
  getChecklistItemsFromTemplate,
  getMissingHeadings,
  getMissingChecklistItems,
} = require('../index.js');

// Read the actual PR template as the source of truth
const TEMPLATE_PATH = path.join(
  __dirname,
  '../../../.github/PULL_REQUEST_TEMPLATE.md'
);
const ACTUAL_TEMPLATE = fs.readFileSync(TEMPLATE_PATH, 'utf8');
const ACTUAL_TEMPLATE_HEADINGS = getTemplateHeadings(ACTUAL_TEMPLATE);
const ACTUAL_TEMPLATE_CHECKLIST_ITEMS =
  getChecklistItemsFromTemplate(ACTUAL_TEMPLATE);

describe('validate-pr-template', () => {
  describe('getLines', () => {
    it('should split markdown into trimmed lines', () => {
      const markdown = '  line 1  \n  line 2  \n  line 3  ';
      expect(getLines(markdown)).toEqual(['line 1', 'line 2', 'line 3']);
    });

    it('should handle empty lines', () => {
      const markdown = 'line 1\n\nline 3';
      expect(getLines(markdown)).toEqual(['line 1', '', 'line 3']);
    });
  });

  describe('isHeading', () => {
    it('should identify markdown headings', () => {
      expect(isHeading('# Heading 1')).toBe(true);
      expect(isHeading('## Heading 2')).toBe(true);
      expect(isHeading('### Heading 3')).toBe(true);
      expect(isHeading('#### Heading 4')).toBe(true);
    });

    it('should not identify non-headings', () => {
      expect(isHeading('Not a heading')).toBe(false);
      expect(isHeading('- List item')).toBe(false);
      expect(isHeading('')).toBe(false);
    });
  });

  describe('isHtmlComment', () => {
    it('should identify HTML comments', () => {
      expect(isHtmlComment('<!-- comment -->')).toBe(true);
      expect(isHtmlComment('<!-- multi word comment -->')).toBe(true);
    });

    it('should not identify non-comments', () => {
      expect(isHtmlComment('<!-- incomplete comment')).toBe(false);
      expect(isHtmlComment('incomplete comment -->')).toBe(false);
      expect(isHtmlComment('not a comment')).toBe(false);
    });
  });

  describe('normalizeChecklistLine', () => {
    it('should normalize unchecked checklist items', () => {
      expect(normalizeChecklistLine('- [ ] Task to do')).toBe('Task to do');
      expect(normalizeChecklistLine('  - [ ] Task to do  ')).toBe('Task to do');
    });

    it('should normalize checked checklist items', () => {
      expect(normalizeChecklistLine('- [x] Completed task')).toBe(
        'Completed task'
      );
      expect(normalizeChecklistLine('- [X] Completed task')).toBe(
        'Completed task'
      );
    });

    it('should normalize struck-through checklist items', () => {
      expect(normalizeChecklistLine('- [ ] ~Struck through task~')).toBe(
        'Struck through task'
      );
      expect(normalizeChecklistLine('~- [ ] Struck through task~')).toBe(
        'Struck through task'
      );
      expect(normalizeChecklistLine('~~- [ ] Double struck~~')).toBe(
        'Double struck'
      );
    });

    it('should handle mixed strikethrough and checkbox states', () => {
      expect(normalizeChecklistLine('~- [x] Done and struck~')).toBe(
        'Done and struck'
      );
      expect(normalizeChecklistLine('- [x] ~Done and struck~')).toBe(
        'Done and struck'
      );
    });

    it('should handle items without checkboxes', () => {
      expect(normalizeChecklistLine('- Plain list item')).toBe(
        'Plain list item'
      );
      expect(normalizeChecklistLine('Plain text')).toBe('Plain text');
    });
  });

  describe('getTemplateHeadings', () => {
    it('should extract all headings from template', () => {
      const template = `
# Main Heading
Some text
## Section 1
More text
### Subsection
#### Details
Not a heading
`;
      expect(getTemplateHeadings(template)).toEqual([
        '# Main Heading',
        '## Section 1',
        '### Subsection',
        '#### Details',
      ]);
    });

    it('should return empty array for template without headings', () => {
      const template = 'Just some text\nNo headings here';
      expect(getTemplateHeadings(template)).toEqual([]);
    });
  });

  describe('getChecklistItemsFromTemplate', () => {
    it('should extract checklist items from PR Checklist section', () => {
      const template = `
## PR Checklist

- [ ] Reviewed every line of the diff
- [ ] Updated documentation and storybook examples
- [ ] Wrote passing tests that cover this change

## Other Section
- [ ] This should not be included
`;
      expect(getChecklistItemsFromTemplate(template)).toEqual([
        'Reviewed every line of the diff',
        'Updated documentation and storybook examples',
        'Wrote passing tests that cover this change',
      ]);
    });

    it('should find checklist section with different heading formats', () => {
      const template1 = `
### PR Checklist

- [ ] Task 1
- [ ] Task 2
`;
      expect(getChecklistItemsFromTemplate(template1)).toEqual([
        'Task 1',
        'Task 2',
      ]);

      const template2 = `
## Checklist

- [ ] Task 1
- [ ] Task 2
`;
      expect(getChecklistItemsFromTemplate(template2)).toEqual([
        'Task 1',
        'Task 2',
      ]);

      const template3 = `
# PR CHECKLIST

- [ ] Task 1
- [ ] Task 2
`;
      expect(getChecklistItemsFromTemplate(template3)).toEqual([
        'Task 1',
        'Task 2',
      ]);
    });

    it('should ignore HTML comments in checklist section', () => {
      const template = `
## PR Checklist

<!-- This is a comment -->
- [ ] Task 1
<!-- Another comment -->
- [ ] Task 2
`;
      expect(getChecklistItemsFromTemplate(template)).toEqual([
        'Task 1',
        'Task 2',
      ]);
    });

    it('should handle checked items in template', () => {
      const template = `
## PR Checklist

- [x] Already checked item
- [ ] Unchecked item
`;
      expect(getChecklistItemsFromTemplate(template)).toEqual([
        'Already checked item',
        'Unchecked item',
      ]);
    });

    it('should return empty array if no checklist section exists', () => {
      const template = `
## Some Other Section
- [ ] This is not in a checklist section
`;
      expect(getChecklistItemsFromTemplate(template)).toEqual([]);
    });

    it('should stop at next heading after checklist section', () => {
      const template = `
## PR Checklist

- [ ] Item 1
- [ ] Item 2

## Next Section

- [ ] This should not be included
`;
      expect(getChecklistItemsFromTemplate(template)).toEqual([
        'Item 1',
        'Item 2',
      ]);
    });

    it('should handle empty lines in checklist section', () => {
      const template = `
## PR Checklist

- [ ] Item 1

- [ ] Item 2

`;
      expect(getChecklistItemsFromTemplate(template)).toEqual([
        'Item 1',
        'Item 2',
      ]);
    });
  });

  describe('getMissingHeadings', () => {
    it('should identify missing headings', () => {
      const templateHeadings = [
        '### Changelog',
        '#### Testing / Reviewing',
        '## PR Checklist',
      ];
      const prBody = `
### Changelog
Some content
## PR Checklist
More content
`;
      expect(getMissingHeadings(templateHeadings, prBody)).toEqual([
        '#### Testing / Reviewing',
      ]);
    });

    it('should return empty array when all headings are present', () => {
      const templateHeadings = ['### Changelog', '## PR Checklist'];
      const prBody = `
### Changelog
Content
## PR Checklist
Content
`;
      expect(getMissingHeadings(templateHeadings, prBody)).toEqual([]);
    });

    it('should be case-sensitive for headings', () => {
      const templateHeadings = ['### Changelog'];
      const prBody = '### changelog';
      expect(getMissingHeadings(templateHeadings, prBody)).toEqual([
        '### Changelog',
      ]);
    });

    it('should require exact heading match', () => {
      const templateHeadings = ['### Changelog'];
      const prBody = '### Changelog Extra Text';
      expect(getMissingHeadings(templateHeadings, prBody)).toEqual([
        '### Changelog',
      ]);
    });
  });

  describe('getMissingChecklistItems', () => {
    it('should identify missing checklist items', () => {
      const templateItems = [
        'Reviewed every line of the diff',
        'Updated documentation and storybook examples',
        'Wrote passing tests that cover this change',
      ];
      const prBody = `
- [x] Reviewed every line of the diff
- [ ] Wrote passing tests that cover this change
`;
      expect(getMissingChecklistItems(templateItems, prBody)).toEqual([
        'Updated documentation and storybook examples',
      ]);
    });

    it('should return empty array when all items are present', () => {
      const templateItems = ['Task 1', 'Task 2'];
      const prBody = `
- [x] Task 1
- [ ] Task 2
`;
      expect(getMissingChecklistItems(templateItems, prBody)).toEqual([]);
    });

    it('should be case-insensitive for checklist items', () => {
      const templateItems = ['Reviewed every line of the diff'];
      const prBody = '- [x] REVIEWED EVERY LINE OF THE DIFF';
      expect(getMissingChecklistItems(templateItems, prBody)).toEqual([]);
    });

    it('should find items anywhere in PR body', () => {
      const templateItems = ['Task 1', 'Task 2'];
      const prBody = `
Some text mentioning Task 1 here.
More text with Task 2 mentioned.
`;
      expect(getMissingChecklistItems(templateItems, prBody)).toEqual([]);
    });

    it('should handle checked checklist items', () => {
      const templateItems = ['Task 1', 'Task 2'];
      const prBody = `
- [x] Task 1
- [X] Task 2
`;
      expect(getMissingChecklistItems(templateItems, prBody)).toEqual([]);
    });

    it('should handle struck-through checklist items', () => {
      const templateItems = ['Task 1', 'Task 2'];
      const prBody = `
- [x] Task 1
- [ ] ~Task 2~
`;
      expect(getMissingChecklistItems(templateItems, prBody)).toEqual([]);
    });

    it('should handle partial text matches', () => {
      const templateItems = ['Reviewed every line'];
      const prBody = 'I have reviewed every line of code carefully';
      expect(getMissingChecklistItems(templateItems, prBody)).toEqual([]);
    });
  });

  describe('integration: valid PR body', () => {
    it('should pass validation for a complete PR body', () => {
      const template = `
### Changelog

**New**

- {{new thing}}

**Changed**

- {{changed thing}}

#### Testing / Reviewing

{{ Add steps }}

## PR Checklist

- [ ] Reviewed every line of the diff
- [ ] Updated documentation and storybook examples
- [ ] Wrote passing tests that cover this change
`;

      const prBody = `
Closes #123

This PR adds a new feature.

### Changelog

**New**

- Added new component

**Changed**

- Updated styles

#### Testing / Reviewing

1. Run the app
2. Test the feature

## PR Checklist

- [x] Reviewed every line of the diff
- [x] Updated documentation and storybook examples
- [x] Wrote passing tests that cover this change
`;

      const templateHeadings = getTemplateHeadings(template);
      const templateChecklistItems = getChecklistItemsFromTemplate(template);
      const missingHeadings = getMissingHeadings(templateHeadings, prBody);
      const missingChecklistItems = getMissingChecklistItems(
        templateChecklistItems,
        prBody
      );

      expect(missingHeadings).toEqual([]);
      expect(missingChecklistItems).toEqual([]);
    });

    it('should pass validation with struck-through checklist items', () => {
      const template = `
## PR Checklist

- [ ] Task 1
- [ ] Task 2
- [ ] Task 3
`;

      const prBody = `
## PR Checklist

- [x] Task 1
- [ ] ~Task 2~
- [x] Task 3
`;

      const templateChecklistItems = getChecklistItemsFromTemplate(template);
      const missingChecklistItems = getMissingChecklistItems(
        templateChecklistItems,
        prBody
      );

      expect(missingChecklistItems).toEqual([]);
    });
  });

  describe('integration: actual PR template', () => {
    it('should correctly parse the actual PR template headings', () => {
      // This test ensures we can parse the real template
      expect(ACTUAL_TEMPLATE_HEADINGS.length).toBeGreaterThan(0);
      expect(ACTUAL_TEMPLATE_HEADINGS.every(isHeading)).toBe(true);
    });

    it('should correctly parse the actual PR template checklist items', () => {
      // This test ensures we can parse the real template checklist
      expect(ACTUAL_TEMPLATE_CHECKLIST_ITEMS.length).toBeGreaterThan(0);
      expect(
        ACTUAL_TEMPLATE_CHECKLIST_ITEMS.every((item) => item.length > 0)
      ).toBe(true);
    });

    it('should validate a PR body that matches the actual template structure', () => {
      // Create a valid PR body based on the actual template
      const validPRBody = `
Closes #123

This PR adds a new feature.

### Changelog

**New**

- Added new component

**Changed**

- Updated styles

**Removed**

- Nothing removed

#### Testing / Reviewing

1. Run the app
2. Test the feature

## PR Checklist

As the author of this PR, before marking ready for review, confirm you:

- [x] Reviewed every line of the diff
- [x] Updated documentation and storybook examples
- [x] Wrote passing tests that cover this change
- [x] Addressed any impact on accessibility (a11y)
- [x] Tested for cross-browser consistency
- [x] Validated that this code is ready for review and status checks should pass

More details can be found in the pull request guide
`;

      const missingHeadings = getMissingHeadings(
        ACTUAL_TEMPLATE_HEADINGS,
        validPRBody
      );
      const missingChecklistItems = getMissingChecklistItems(
        ACTUAL_TEMPLATE_CHECKLIST_ITEMS,
        validPRBody
      );

      expect(missingHeadings).toEqual([]);
      expect(missingChecklistItems).toEqual([]);
    });

    it('should detect missing headings from the actual template', () => {
      const incompletePRBody = `
Closes #123

### Changelog

**New**

- Added something

## PR Checklist

- [x] Reviewed every line of the diff
- [x] Updated documentation and storybook examples
- [x] Wrote passing tests that cover this change
- [x] Addressed any impact on accessibility (a11y)
- [x] Tested for cross-browser consistency
- [x] Validated that this code is ready for review and status checks should pass
`;

      const missingHeadings = getMissingHeadings(
        ACTUAL_TEMPLATE_HEADINGS,
        incompletePRBody
      );

      // Should be missing "#### Testing / Reviewing"
      expect(missingHeadings.length).toBeGreaterThan(0);
      expect(
        missingHeadings.some((h) => h.toLowerCase().includes('testing'))
      ).toBe(true);
    });

    it('should detect missing checklist items from the actual template', () => {
      const incompletePRBody = `
Closes #123

### Changelog

**New**

- Added something

#### Testing / Reviewing

Test it

## PR Checklist

- [x] Reviewed every line of the diff
- [x] Updated documentation and storybook examples
`;

      const missingChecklistItems = getMissingChecklistItems(
        ACTUAL_TEMPLATE_CHECKLIST_ITEMS,
        incompletePRBody
      );

      // Should be missing several checklist items
      expect(missingChecklistItems.length).toBeGreaterThan(0);
    });

    it('should handle struck-through checklist items from actual template', () => {
      const prBodyWithStrikethrough = `
Closes #123

### Changelog

**New**

- Added something

#### Testing / Reviewing

Test it

## PR Checklist

- [x] Reviewed every line of the diff
- [x] Updated documentation and storybook examples
- [ ] ~Wrote passing tests that cover this change~
- [x] Addressed any impact on accessibility (a11y)
- [ ] ~Tested for cross-browser consistency~
- [x] Validated that this code is ready for review and status checks should pass
`;

      const missingChecklistItems = getMissingChecklistItems(
        ACTUAL_TEMPLATE_CHECKLIST_ITEMS,
        prBodyWithStrikethrough
      );

      // Struck-through items should count as present
      expect(missingChecklistItems).toEqual([]);
    });
  });
});
