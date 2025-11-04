# Pull Request Preparation Guide
## Marker Type Feature for Unordered Lists

This guide will help you prepare your contribution for submission to the Carbon Design System.

---

## 1. CURRENT STATE CHECK

### Step 1.1: Check if this is a Git Repository

**Run these commands:**

```bash
cd /Users/sandeepbaskaran/Documents/carbon-main
git status
```

**Expected outcomes:**

- **If you see "fatal: not a git repository"**: You need to initialize git or clone from your fork
- **If you see git status**: You're in a git repository, proceed to Step 1.2

### Step 1.2: Initialize Git (if needed)

**If this is NOT a git repository, you have two options:**

#### Option A: Initialize and link to your fork
```bash
# Initialize git
git init

# Add your fork as origin
git remote add origin git@github.com:YOUR_USERNAME/carbon.git

# Add upstream (main Carbon repo)
git remote add upstream git@github.com:carbon-design-system/carbon.git

# Verify remotes
git remote -v
```

#### Option B: Clone from your fork (if you haven't started yet)
```bash
# If you haven't started, clone from your fork
cd ..
git clone git@github.com:YOUR_USERNAME/carbon.git carbon-main
cd carbon-main

# Add upstream
git remote add upstream git@github.com:carbon-design-system/carbon.git
```

### Step 1.3: Check Current Branch and Status

**Run these commands:**

```bash
# Check current branch
git branch

# Check for uncommitted changes
git status

# See recent commits
git log --oneline -10
```

**What to look for:**
- Are you on a feature branch (not `main`)? ✅ Good!
- Are there uncommitted changes? → You'll need to commit them
- What commits have you made? → Review them before PR

---

## 2. CONTRIBUTOR SETUP

### Step 2.1: Add Yourself to Contributors

**From the root directory, run:**

```bash
# Replace YOUR_USERNAME with your GitHub username
# Replace CONTRIBUTION_TYPE with appropriate type (see below)
yarn all-contributors add YOUR_USERNAME CONTRIBUTION_TYPE

# Generate the contributor list
yarn all-contributors generate
```

### Step 2.2: Contribution Type Options

Based on your work (marker type feature), you should use:

**Primary contribution:**
- `code` - For code contributions

**Additional contributions (if applicable):**
- `test` - If you added tests
- `doc` - If you updated documentation

**Example:**
```bash
yarn all-contributors add sandeepbaskaran code
yarn all-contributors generate
```

**Common contribution types:**
- `code` - Writing code
- `test` - Writing tests
- `doc` - Documentation
- `bug` - Bug reports
- `design` - Design work
- `review` - Code reviews

**Full list:** https://allcontributors.org/docs/en/emoji-key

---

## 3. COMMIT MESSAGE

### Step 3.1: Carbon's Commit Convention

Carbon follows Angular-style commit conventions:

**Format:**
```
<type>(<scope>): <subject>

<body>

<footer>
```

**Rules:**
- Header must be **< 72 characters**
- Body lines must be **< 80 characters**
- Use imperative mood: "add" not "added" or "adds"
- No period at end of subject
- Lowercase first letter of subject

### Step 3.2: Your Commit Message

**Exact commit message to use:**

```
feat(unordered-list): add support for marker types

Add support for different list marker types (disc, circle, square,
hyphen, custom) to the UnorderedList component in both React and
Web Components packages.

Features:
- New `type` prop accepting: 'disc' | 'circle' | 'square' | 'hyphen' | 'custom'
- New `customMarker` prop for custom marker content
- Default behavior: hyphen for top-level, square for nested (with deprecation warning)
- CSS implementation using list-style-type for disc/circle/square
- CSS implementation using ::before pseudo-element for hyphen/custom
- Backward compatible with existing lists

React Component:
- Added type and customMarker props to UnorderedListProps
- Deprecation warning for nested lists without explicit type
- CSS class application based on marker type

Web Components:
- Added type and customMarker properties with reflection
- Parent inheritance for nested lists
- Same deprecation warning pattern

SCSS Changes:
- Added marker type classes: .cds--list--marker-{type}
- Native list-style-type support for disc/circle/square
- Custom marker support via CSS variable

This addresses issue #16937.
```

### Step 3.3: Create the Commit

**If you have uncommitted changes:**

```bash
# Check what files are changed
git status

# Stage all changes
git add .

# OR stage specific files
git add packages/react/src/components/UnorderedList/
git add packages/web-components/src/components/list/
git add packages/styles/scss/components/list/
git add .all-contributorsrc
git add README.md

# Create commit with the message above
git commit -m "feat(unordered-list): add support for marker types

Add support for different list marker types (disc, circle, square,
hyphen, custom) to the UnorderedList component in both React and
Web Components packages.

Features:
- New \`type\` prop accepting: 'disc' | 'circle' | 'square' | 'hyphen' | 'custom'
- New \`customMarker\` prop for custom marker content
- Default behavior: hyphen for top-level, square for nested (with deprecation warning)
- CSS implementation using list-style-type for disc/circle/square
- CSS implementation using ::before pseudo-element for hyphen/custom
- Backward compatible with existing lists

React Component:
- Added type and customMarker props to UnorderedListProps
- Deprecation warning for nested lists without explicit type
- CSS class application based on marker type

Web Components:
- Added type and customMarker properties with reflection
- Parent inheritance for nested lists
- Same deprecation warning pattern

SCSS Changes:
- Added marker type classes: .cds--list--marker-{type}
- Native list-style-type support for disc/circle/square
- Custom marker support via CSS variable

This addresses issue #16937."
```

**Note:** For multi-line commit messages, use a text editor:
```bash
git commit
# This opens your default editor where you can paste the full message
```

---

## 4. DCO SIGNATURE (Developer Certificate of Origin)

### What is DCO?

The Developer Certificate of Origin (DCO) is a lightweight way for contributors to certify that they wrote or have the right to submit the code they are contributing to the project.

### How to Sign DCO

**You DON'T need to sign before submitting your PR.** The DCO bot will automatically check when you open your PR.

**When you open your PR:**
1. A bot will check if you've signed the DCO
2. If NOT signed, it will comment on your PR with instructions
3. Follow the link in the comment to sign the DCO
4. The bot will automatically update the PR status

**Signing process (after PR is created):**
1. Click the link provided by the bot in the PR comment
2. You'll be redirected to: https://github.com/carbon-design-system/carbon-dco
3. Sign in with your GitHub account
4. Click "Sign"
5. The bot will automatically update your PR

**What to include in your commit:**
- You DON'T need to add anything special to your commit message
- Just use `-s` or `--signoff` flag if you want to sign-off in the commit itself:
```bash
git commit -s -m "your message"
```

This adds: `Signed-off-by: Your Name <your.email@example.com>`

---

## 5. PULL REQUEST CHECKLIST

Use this checklist before creating your PR:

### Pre-Submission Checklist

- [ ] **Tested the changes**
  - [ ] Tested in Storybook (React)
  - [ ] Tested in Storybook (Web Components)
  - [ ] Verified all marker types work correctly
  - [ ] Verified backward compatibility

- [ ] **Added yourself to contributors**
  - [ ] Ran `yarn all-contributors add YOUR_USERNAME code`
  - [ ] Ran `yarn all-contributors generate`
  - [ ] Committed the changes

- [ ] **Followed commit conventions**
  - [ ] Commit type: `feat`
  - [ ] Commit scope: `unordered-list`
  - [ ] Subject: descriptive and < 72 chars
  - [ ] Body: explains what, why, and how
  - [ ] Footer: references issue #16937

- [ ] **Code quality**
  - [ ] No console errors
  - [ ] No TypeScript errors
  - [ ] Follows Carbon coding style
  - [ ] Proper prop types/types

- [ ] **Documentation**
  - [ ] Code is well-commented
  - [ ] Storybook stories demonstrate feature
  - [ ] README updated (if needed)

- [ ] **Breaking changes**
  - [ ] No breaking changes (backward compatible) ✅
  - [ ] Deprecation warnings added where appropriate ✅

- [ ] **DCO**
  - [ ] Will sign DCO when bot prompts (after PR creation)

- [ ] **Issue reference**
  - [ ] Commit message references issue #16937
  - [ ] PR description will reference issue #16937

---

## 6. PRE-SUBMISSION VALIDATION

### Step 6.1: Build the Project

**Run from root directory:**

```bash
# Build all packages
yarn build
```

**What to check:**
- ✅ No build errors
- ✅ All packages compile successfully
- ⚠️  Warnings are usually okay (review them)

**If build fails:**
- Check error messages
- Fix any TypeScript errors
- Ensure all dependencies are installed (`yarn install`)

### Step 6.2: Run Linter

**Run from root directory:**

```bash
# Check code style
yarn lint
```

**What to check:**
- ✅ No linting errors
- ⚠️  Some warnings may be acceptable

**If linting fails:**
```bash
# Auto-fix what can be fixed
yarn lint:fix
```

### Step 6.3: Run Tests

**Run from root directory:**

```bash
# Run all tests
yarn test
```

**What to check:**
- ✅ All tests pass
- ✅ No new test failures
- ⚠️  Some snapshot updates may be needed

**If tests fail:**
- Review error messages
- Update snapshots if needed: `yarn test -u`
- Fix any failing tests

### Step 6.4: Format Check

**Run from root directory:**

```bash
# Check formatting
yarn format:diff
```

**If formatting issues found:**
```bash
# Auto-fix formatting
yarn format
```

---

## 7. CREATE PULL REQUEST

### Step 7.1: Push Your Branch

**Before creating PR, push your branch:**

```bash
# Make sure you're on your feature branch
git branch

# Push to your fork
git push origin YOUR_BRANCH_NAME

# If this is first push, set upstream:
git push -u origin YOUR_BRANCH_NAME
```

### Step 7.2: PR Title

**Use this exact title:**

```
feat(unordered-list): add support for marker types
```

**Or slightly more descriptive:**

```
feat(unordered-list): add support for marker types (disc, circle, square, hyphen, custom)
```

### Step 7.3: PR Description Template

**Use this template for your PR description:**

```markdown
## Description

Adds support for different list marker types to the `UnorderedList` component in both React and Web Components packages.

## What was changed

- Added `type` prop to `UnorderedList` component accepting: `'disc' | 'circle' | 'square' | 'hyphen' | 'custom'`
- Added `customMarker` prop for custom marker content
- Implemented CSS classes for each marker type
- Added deprecation warnings for nested lists without explicit type
- Maintained backward compatibility

## React Component

- New props: `type` and `customMarker`
- Default behavior: hyphen for top-level, square for nested
- Deprecation warning for nested lists

## Web Components

- New properties: `type` and `customMarker` (with attribute reflection)
- Parent inheritance for nested lists
- Same deprecation warning pattern

## SCSS Changes

- Added marker type modifier classes: `.cds--list--marker-{type}`
- Native `list-style-type` support for disc/circle/square
- Custom marker support via CSS variable

## Testing

- ✅ Tested in Storybook (React)
- ✅ Tested in Storybook (Web Components)
- ✅ Verified all marker types render correctly
- ✅ Verified backward compatibility
- ✅ Verified deprecation warnings appear

## Breaking Changes

None. This feature is fully backward compatible.

## Related Issue

Closes #16937

## Checklist

- [x] I have tested the changes
- [x] I have added myself to the contributors list
- [x] I have followed Carbon's commit conventions
- [x] I have signed the DCO (will sign when bot prompts)
- [x] My code follows the project's style guidelines
- [x] I have updated documentation as needed
```

### Step 7.4: Create PR on GitHub

**Steps:**

1. Go to: https://github.com/carbon-design-system/carbon
2. You should see a banner: "YOUR_USERNAME:YOUR_BRANCH_NAME had recent pushes"
3. Click **"Compare & pull request"**
4. Or manually:
   - Click **"Pull requests"** tab
   - Click **"New pull request"**
   - Select **"compare across forks"**
   - Base: `carbon-design-system:main`
   - Compare: `YOUR_USERNAME:YOUR_BRANCH_NAME`

5. Fill in:
   - **Title:** Use the title from Step 7.2
   - **Description:** Use the template from Step 7.3

6. **Before submitting:**
   - ✅ Review all changes in the "Files changed" tab
   - ✅ Ensure CI checks will run
   - ✅ Add issue reference: `Closes #16937` or `Fixes #16937`

7. Click **"Create pull request"**

### Step 7.5: After PR Creation

**What happens:**

1. **DCO Bot:** Will check if you've signed DCO
   - If not signed: Bot will comment with instructions
   - Follow the link to sign
   - Bot will automatically update PR status

2. **CI Checks:** Will automatically run
   - Build check
   - Lint check
   - Test check
   - Type check

3. **Review:** Maintainers will review your PR
   - They may ask for changes
   - Address any feedback
   - Push additional commits if needed

**GitHub Features to Use:**

- **Labels:** Don't add labels yourself (maintainers will add them)
- **Assignees:** Don't assign yourself (maintainers will assign reviewers)
- **Milestone:** Don't set milestone (maintainers will set if needed)
- **Linked Issues:** Use "Closes #16937" in PR description to auto-link

---

## 8. COMMON ISSUES & SOLUTIONS

### Issue: "Not a git repository"

**Solution:**
```bash
git init
git remote add origin git@github.com:YOUR_USERNAME/carbon.git
git remote add upstream git@github.com:carbon-design-system/carbon.git
```

### Issue: Build fails

**Solution:**
```bash
# Clean and reinstall
yarn clean
yarn install
yarn build
```

### Issue: Lint errors

**Solution:**
```bash
# Auto-fix
yarn lint:fix

# Review remaining issues manually
```

### Issue: Tests fail

**Solution:**
```bash
# Update snapshots if needed
yarn test -u

# Run specific test to debug
yarn test UnorderedList
```

### Issue: DCO not signed

**Solution:**
- Bot will comment with link
- Follow the link to sign
- Bot will update automatically

---

## 9. SUMMARY CHECKLIST

Before you submit, verify:

- [ ] Git repository initialized/linked to fork
- [ ] All changes committed with proper message
- [ ] Added yourself to contributors
- [ ] Build passes: `yarn build`
- [ ] Lint passes: `yarn lint`
- [ ] Tests pass: `yarn test`
- [ ] Formatting correct: `yarn format`
- [ ] Branch pushed to your fork
- [ ] PR created with proper title and description
- [ ] Issue #16937 referenced in PR

---

## Need Help?

- **Carbon Discord:** https://discord.gg/J7JEUEkTRX
- **Carbon GitHub Discussions:** https://github.com/carbon-design-system/carbon/discussions
- **Contributing Guide:** `.github/CONTRIBUTING.md`
- **Developer Handbook:** `docs/developer-handbook.md`

---

**Good luck with your PR! 🚀**

