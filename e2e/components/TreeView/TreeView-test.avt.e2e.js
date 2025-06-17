/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { expect, test } = require('@playwright/test');
const { visitStory } = require('../../test-utils/storybook');
const LONG_LABEL_NODE_1 = 'Application development and integration solutions';
const LONG_LABEL_NODE_2 = 'Business automation and integration solution';
const SHORT_LABEL_NODE = 'Blockchain';

const STORY_CONFIG = {
  component: 'TreeView',
  id: 'components-treeview--default',
  globals: { theme: 'white' },
};

test.describe('@avt TreeView', () => {
  test('@avt-default-state', async ({ page }) => {
    await visitStory(page, {
      component: 'TreeView',
      id: 'components-treeview--default',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('components-treeview--default');
  });

  test('@avt-advanced-states with-icons', async ({ page }) => {
    await visitStory(page, {
      component: 'TreeView',
      id: 'components-treeview--with-icons',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('components-treeview--with-icons');
  });

  test('@avt-advanced-states with-links', async ({ page }) => {
    await visitStory(page, {
      component: 'TreeView',
      id: 'components-treeview--with-links',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('components-treeview--with-links');
  });

  test('@avt-keyboard-nav', async ({ page }) => {
    await visitStory(page, {
      component: 'TreeView',
      id: 'components-treeview--with-icons',
      globals: {
        theme: 'white',
      },
    });
    const tree = page.getByRole('tree');
    const treeLeaf = page.getByRole('treeitem', {
      name: 'Artificial intelligence',
    });
    const treeBranchOne = page.getByRole('treeitem', {
      name: 'Cloud computing',
    });
    const treeBranchTwo = page.getByRole('treeitem', {
      name: 'Data & Analytics',
    });
    const deepNode = page.getByRole('treeitem', {
      name: 'Resources',
    });

    await expect(tree).toBeVisible();
    await expect(treeLeaf).toBeVisible();
    await expect(treeBranchOne).toBeVisible();
    await expect(treeBranchTwo).toBeVisible();
    await expect(deepNode).toBeVisible();

    // Tab to the first item
    await page.keyboard.press('Tab');
    await expect(treeLeaf).toBeFocused();
    // Second tab should tab off of the tree entirely
    await page.keyboard.press('Tab');
    await expect(treeLeaf).not.toBeFocused();
    await expect(tree).not.toBeFocused();
    // Tab back into tree, navigate with arrow keys
    await page.keyboard.press('Shift+Tab');
    await expect(treeLeaf).toBeFocused();
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await expect(treeBranchOne).toBeFocused();
    // Close menu with ArrowLeft
    await expect(treeBranchOne).toHaveAttribute('aria-expanded', 'true');
    await page.keyboard.press('ArrowLeft');
    await expect(treeBranchOne).toHaveAttribute('aria-expanded', 'false');
    // Down arrow should go to next branch when closed, and should not go to disabled item
    await page.keyboard.press('ArrowDown');
    await expect(treeBranchTwo).toBeFocused();
    await page.keyboard.press('ArrowDown');
    await expect(treeBranchTwo).toBeFocused();
    // Go back up to collapsed section, expand it, and traverse to bottom of branch
    await page.keyboard.press('ArrowUp');
    await expect(treeBranchOne).toBeFocused();
    await page.keyboard.press('ArrowRight');
    await expect(treeBranchOne).toHaveAttribute('aria-expanded', 'true');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await expect(deepNode).toBeFocused();
  });

  test('@avt-advanced-states tooltip functionality', async ({ page }) => {
    await visitStory(page, STORY_CONFIG);

    // Long labels: tooltip appears with correct content and accessibility
    const longNode = page.getByRole('treeitem', { name: LONG_LABEL_NODE_1 });
    await longNode.focus();

    const tooltip = longNode.locator('[role="tooltip"]');
    await expect(tooltip).toBeVisible();
    await expect(tooltip).toHaveText(LONG_LABEL_NODE_1);

    // Verify ARIA relationship
    const button = longNode.locator('.cds--tree-node__label__text-button');
    const ariaLabelledBy = await button.getAttribute('aria-labelledby');
    const tooltipId = await tooltip.getAttribute('id');
    expect(ariaLabelledBy).toBe(tooltipId);

    await expect(page).toHaveNoACViolations('TreeView-tooltip');
  });

  test('@avt-advanced-states tooltip conditional behavior', async ({
    page,
  }) => {
    await visitStory(page, STORY_CONFIG);

    // Short labels: no tooltip rendered
    const shortNode = page.getByRole('treeitem', { name: SHORT_LABEL_NODE });
    await shortNode.focus();
    await expect(shortNode.locator('[role="tooltip"]')).toHaveCount(0);

    // Regular span structure without button wrapper
    await expect(
      shortNode.locator('.cds--tree-node__label__text')
    ).toBeVisible();
    await expect(
      shortNode.locator('.cds--tree-node__label__text-button')
    ).toHaveCount(0);

    // TreeView selection functionality unaffected
    await page.keyboard.press('Enter');
    await expect(shortNode).toHaveAttribute('aria-selected', 'true');
  });
});
