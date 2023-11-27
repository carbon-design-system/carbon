/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { expect, test } = require('@playwright/test');
const { visitStory } = require('../../test-utils/storybook');

test.describe('TreeView @avt', () => {
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
});
