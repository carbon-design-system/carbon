# Commit Message for Marker Type Feature

## Exact Commit Message

```
feat(unordered-list): add support for marker types

Add support for different list marker types (disc, circle, square,
hyphen, custom) to the UnorderedList component in both React and
Web Components packages.

This change allows users to customize list markers beyond the default
hyphen (top-level) and square (nested) styles. The implementation uses
native CSS list-style-type for disc/circle/square markers and custom
::before pseudo-elements for hyphen and custom markers.

Features:
- New `type` prop accepting: 'disc' | 'circle' | 'square' | 'hyphen' |
  'custom'
- New `customMarker` prop for custom marker content (requires
  type="custom")
- Default behavior: hyphen for top-level, square for nested (with
  deprecation warning)
- Backward compatible with existing lists

React Component:
- Added type and customMarker props to UnorderedListProps interface
- Deprecation warning for nested lists without explicit type prop
- CSS class application based on marker type

Web Components:
- Added type and customMarker properties with attribute reflection
- Parent inheritance for nested lists (inherits parent's type when
  not specified)
- Same deprecation warning pattern as React

SCSS Changes:
- Added marker type classes: .cds--list--marker-{type}
- Native list-style-type support for disc/circle/square
- Custom marker support via CSS custom property
- Nested list handling for all marker types

Examples:
- type="disc": renders • bullets
- type="circle": renders ○ bullets
- type="square": renders ▪ bullets
- type="hyphen": renders – bullets (default)
- type="custom" with customMarker="→": renders → bullets

Closes #16937
```

---

## Verification

### Header Check

```
feat(unordered-list): add support for marker types
```

- Length: **54 characters** ✅ (< 72 required)
- Type: `feat` ✅
- Scope: `unordered-list` ✅
- Subject: imperative, present tense ✅
- No period at end ✅
- Lowercase first letter ✅

### Body Check

- All lines < 80 characters ✅
- Imperative, present tense ✅
- Explains motivation ✅
- Contrasts with previous behavior ✅
- Includes examples ✅

### Footer Check

- References issue #16937 ✅
- Uses "Closes" keyword ✅

---

## Commit Command Options

### Option 1: Using Git Editor (Recommended)

```bash
# Stage your changes
git add .

# Open editor for commit message
git commit
```

Then paste the full commit message above into the editor.

### Option 2: Using Commit Message File

```bash
# Create commit message file
cat > /tmp/commit-msg.txt << 'EOF'
feat(unordered-list): add support for marker types

Add support for different list marker types (disc, circle, square,
hyphen, custom) to the UnorderedList component in both React and
Web Components packages.

This change allows users to customize list markers beyond the default
hyphen (top-level) and square (nested) styles. The implementation uses
native CSS list-style-type for disc/circle/square markers and custom
::before pseudo-elements for hyphen and custom markers.

Features:
- New `type` prop accepting: 'disc' | 'circle' | 'square' | 'hyphen' |
  'custom'
- New `customMarker` prop for custom marker content (requires
  type="custom")
- Default behavior: hyphen for top-level, square for nested (with
  deprecation warning)
- Backward compatible with existing lists

React Component:
- Added type and customMarker props to UnorderedListProps interface
- Deprecation warning for nested lists without explicit type prop
- CSS class application based on marker type

Web Components:
- Added type and customMarker properties with attribute reflection
- Parent inheritance for nested lists (inherits parent's type when
  not specified)
- Same deprecation warning pattern as React

SCSS Changes:
- Added marker type classes: .cds--list--marker-{type}
- Native list-style-type support for disc/circle/square
- Custom marker support via CSS custom property
- Nested list handling for all marker types

Examples:
- type="disc": renders • bullets
- type="circle": renders ○ bullets
- type="square": renders ▪ bullets
- type="hyphen": renders – bullets (default)
- type="custom" with customMarker="→": renders → bullets

Closes #16937
EOF

# Commit using the file
git commit -F /tmp/commit-msg.txt
```

### Option 3: Inline Multi-line (Not Recommended)

For very long messages, use the editor or file method above.

---

## Explanation of Each Part

### Header: `feat(unordered-list): add support for marker types`

- **`feat`**: Type indicating a new feature
- **`(unordered-list)`**: Scope specifying the component affected
- **`add support for marker types`**: Subject describing what was added
  - Imperative mood: "add" not "added" or "adds"
  - No period at end
  - Lowercase first letter
  - Under 72 characters

### Body: Explains What, Why, and How

**First paragraph:**

- What was added (marker types)
- Which components (React and Web Components)

**Second paragraph:**

- Why it matters (customization beyond defaults)
- How it's implemented (CSS approach)

**Features section:**

- Lists all new props and their types
- Mentions default behavior and deprecation

**Component sections:**

- React-specific changes
- Web Components-specific changes
- SCSS changes

**Examples section:**

- Shows how each marker type renders
- Helps reviewers understand the feature

### Footer: `Closes #16937`

- References the GitHub issue
- Uses "Closes" keyword to auto-close the issue when merged

---

## Pre-Commit Checklist

Before committing, verify:

- [ ] All files are staged (`git status` shows no unstaged changes)
- [ ] No build errors
- [ ] Tests pass (if applicable)
- [ ] Commit message follows all conventions
- [ ] Header is < 72 characters
- [ ] Body lines are < 80 characters
- [ ] Issue number is correct (#16937)

---

## After Committing

Once you've committed, you can verify the commit message:

```bash
# View last commit message
git log -1 --pretty=format:"%s%n%n%b"

# Verify commitlint passes
npx commitlint --from HEAD~1 --to HEAD --verbose
```

---

## Ready to Commit!

Use the commit message above. It follows all Carbon conventions: ✅ Header < 72
characters ✅ Body lines < 80 characters  
✅ Imperative, present tense ✅ No period at end of subject ✅ Includes
motivation ✅ References issue #16937 ✅ Includes examples
