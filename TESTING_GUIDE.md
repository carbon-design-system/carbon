# Testing Guide: Marker Type Feature for Unordered Lists

## Prerequisites

Before starting Storybook, ensure you have:

1. **Node.js version**: Node >= 20.x (check: `node --version`)
2. **Package manager**: Yarn 4.10.3 (check: `yarn --version`)
3. **Dependencies installed**: Run `yarn install` from the root directory

---

## 1. START STORYBOOK FOR REACT

### Step 1: Navigate to React Package

```bash
# From repository root
cd packages/react
```

### Step 2: Install Dependencies (if needed)

```bash
# If you haven't installed dependencies yet
yarn install
```

### Step 3: Start Storybook

```bash
yarn storybook
```

### Step 4: Access Storybook

- **URL:** `http://localhost:3000`
- **Port:** 3000
- **Wait for:** Storybook to compile and show "Local: http://localhost:3000"

### Expected Output:

```
Storybook is starting up...
Local:   http://localhost:3000/
Network: http://192.168.x.x:3000/
```

### Navigate to UnorderedList Component:

1. In Storybook sidebar, go to: **Components → UnorderedList**
2. Or directly visit:
   `http://localhost:3000/?path=/story/components-unorderedlist--default`

---

## 2. START STORYBOOK FOR WEB COMPONENTS

### Step 1: Navigate to Web Components Package

```bash
# From repository root (or open a new terminal)
cd packages/web-components
```

### Step 2: Install Dependencies (if needed)

```bash
# If you haven't installed dependencies yet
yarn install
```

### Step 3: Start Storybook

```bash
yarn storybook
```

### Step 4: Access Storybook

- **URL:** `http://localhost:6006`
- **Port:** 6006
- **Wait for:** Storybook to compile and show "Local: http://localhost:6006"

### Expected Output:

```
Storybook is starting up...
Local:   http://localhost:6006/
Network: http://192.168.x.x:6006/
```

### Navigate to Unordered List Component:

1. In Storybook sidebar, go to: **Components → Unordered list**
2. Or directly visit:
   `http://localhost:6006/?path=/story/components-unordered-list--default`

---

## 3. TESTING CHECKLIST

### For Both React and Web Components

---

### A) DEFAULT UNORDEREDLIST STORY

**Location:** First story in the sidebar (usually named "Default")

#### ✅ Test Checklist:

- [ ] **Default rendering:**

  - Does the list render with **hyphen (–)** markers?
  - Are the markers visible before each list item?
  - Do the markers have proper spacing?

- [ ] **Controls panel (bottom of Storybook):**

  - Is there a `type` control with options: `disc`, `circle`, `square`,
    `hyphen`, `custom`?
  - Is there a `customMarker` control (should appear when `type="custom"`)?
  - Does changing the `type` control update the list markers in real-time?

- [ ] **Visual verification:**
  - Top-level list should show **en dash (–)** markers
  - Markers should be positioned to the left of each list item
  - Spacing should be consistent

#### Expected Result:

```
– Unordered List level 1
– Unordered List level 1
– Unordered List level 1
```

---

### B) MARKER TYPES STORY

**Location:** Story named "Marker Types" or "marker types"

#### ✅ Test Checklist:

#### 1. **Disc Marker (`type="disc"`)**

- [ ] Does it render **filled circle bullets (•)**?
- [ ] Are the bullets native browser style (not custom pseudo-elements)?
- [ ] Does the list have proper indentation?

#### 2. **Circle Marker (`type="circle"`)**

- [ ] Does it render **hollow circle bullets (○)**?
- [ ] Are the bullets native browser style?
- [ ] Does it look different from disc?

#### 3. **Square Marker (`type="square"`)**

- [ ] Does it render **filled square bullets (▪)**?
- [ ] Are the bullets native browser style?
- [ ] Does it look different from disc and circle?

#### 4. **Hyphen Marker (`type="hyphen"`)**

- [ ] Does it render **en dash (–)** markers?
- [ ] Are the markers using custom pseudo-elements?
- [ ] Does it match the default appearance?

#### 5. **Custom Marker (`type="custom"` with `customMarker="→"`)**

- [ ] Does it render **arrow (→)** markers?
- [ ] Are the markers using custom pseudo-elements?
- [ ] Does the custom marker appear correctly?

#### Expected Visual Results:

```
Disc:    • Item with disc marker
Circle:  ○ Item with circle marker
Square:  ▪ Item with square marker
Hyphen:  – Item with hyphen marker
Custom:  → Item with custom arrow marker
```

---

### C) NESTED LISTS STORY

**Location:** Story named "Nested" or "nested"

#### ✅ Test Checklist:

#### Default Behavior:

- [ ] **Top-level list:** Shows **hyphen (–)** markers
- [ ] **Nested list (level 2):** Shows **square (▪)** markers by default
- [ ] **Nested list (level 3):** Shows **square (▪)** markers by default

#### Inheritance Test (Web Components only):

- [ ] In the "Nested with Marker Types" story:
  - Change top-level `type` to `"disc"`
  - Check if nested list **inherits** the parent's type (Web Components should)
  - React should default to `"square"` for nested lists

#### Expected Result:

```
Top-level (hyphen):
  – Unordered List level 1
    ▪ Unordered List level 2  (nested, default square)
    ▪ Unordered List level 2
```

---

### D) EDGE CASES

#### ✅ Test Checklist:

#### 1. **Custom Marker Without Value**

- [ ] Set `type="custom"` but leave `customMarker` empty
- [ ] **Expected:** Should fallback to hyphen (default marker)
- [ ] **Check console:** Should not throw errors

#### 2. **Custom Marker with Other Types**

- [ ] Set `type="disc"` and provide `customMarker="→"`
- [ ] **Expected:** `customMarker` should be **ignored** (only used with
      `type="custom"`)
- [ ] **Result:** Should show disc bullets (•), not arrow

#### 3. **Unicode Characters**

Test with different Unicode characters in `customMarker`:

- [ ] `customMarker="→"` (right arrow)
- [ ] `customMarker="◆"` (diamond)
- [ ] `customMarker="★"` (star)
- [ ] `customMarker="▪"` (square)
- [ ] `customMarker="•"` (bullet)

**Expected:** All should render correctly as custom markers

#### 4. **Empty/Missing Type**

- [ ] Don't set `type` prop at all
- [ ] **Top-level:** Should default to `"hyphen"`
- [ ] **Nested:** Should default to `"square"` (with deprecation warning)

#### 5. **Invalid Type Value**

- [ ] Try setting `type="invalid"`
- [ ] **Expected:** Should either:
  - Show validation error in console
  - Fallback to default behavior
  - TypeScript should catch this in development

---

## 4. CONSOLE CHECKS

### Open Browser Developer Tools

1. **Chrome/Edge:** Press `F12` or `Ctrl+Shift+I` (Windows) / `Cmd+Option+I`
   (Mac)
2. **Firefox:** Press `F12` or `Ctrl+Shift+K` (Windows) / `Cmd+Option+K` (Mac)
3. **Safari:** Press `Cmd+Option+I` (Mac, enable Developer menu first)

### Check Console Tab

#### ✅ Deprecation Warnings (Development Mode Only)

**Test Scenario:**

1. Navigate to "Nested" story
2. Check console for deprecation warning

**Expected Warning (React):**

```
Warning: Nested unordered lists without an explicit `type` prop will default to
square markers. This behavior is deprecated. Please explicitly set
`type="square"` (or another marker type) for nested lists.
In the next major release, nested lists will inherit the parent list's marker type.
```

**Expected Warning (Web Components):**

```
Nested unordered lists without an explicit `type` attribute will default to
square markers. This behavior is deprecated. Please explicitly set
`type="square"` (or another marker type) for nested lists.
```

#### ✅ Warning Quality Check:

- [ ] **Clear message:** Does it explain what's deprecated?
- [ ] **Actionable:** Does it tell you what to do?
- [ ] **Future-aware:** Does it mention next major release?
- [ ] **Only shown once:** Does it appear only once per component instance?

#### ✅ Error Check:

- [ ] **No errors:** Console should have no red errors
- [ ] **No warnings (other than deprecation):** Only expected deprecation
      warnings
- [ ] **Clean console:** No unexpected warnings about missing props or invalid
      values

---

## 5. BUILD STEPS (If Needed)

### Before Starting Storybook:

#### Option 1: No Build Needed (Recommended)

Storybook should work with source files directly. Just run:

```bash
yarn storybook
```

#### Option 2: Build First (If Storybook Fails)

If you encounter build errors, try building first:

**For React:**

```bash
cd packages/react
yarn build
yarn storybook
```

**For Web Components:**

```bash
cd packages/web-components
yarn build
yarn storybook
```

#### Option 3: Clean Build (If Issues Persist)

```bash
# React
cd packages/react
yarn clean
yarn install
yarn storybook

# Web Components
cd packages/web-components
yarn clean
yarn install
yarn storybook
```

---

## 6. KNOWN ISSUES & GOTCHAS

### Potential Issues:

1. **Port Already in Use:**

   - If port 3000 or 6006 is busy, Storybook will ask to use another port
   - You can specify a different port: `yarn storybook -p 3001`

2. **Build Errors:**

   - If you see TypeScript errors, they might be warnings you can ignore
   - Check if the component files are correctly formatted

3. **Styles Not Loading:**

   - Ensure SCSS files are compiled
   - Check browser console for CSS errors

4. **Web Components Not Rendering:**

   - Ensure you're using a modern browser (Chrome, Firefox, Edge, Safari)
   - Check if custom elements are registered

5. **Parent Inheritance (React):**
   - React component does NOT inherit parent type (by design)
   - Only Web Components has parent inheritance
   - This is expected behavior, not a bug

---

## 7. TESTING REPORT TEMPLATE

Use this template to document your testing:

### Testing Report

**Date:** [Your Date]  
**Tester:** [Your Name]  
**Environment:** [Browser/OS version]

#### React Component Tests

**Default Story:**

- ✅/❌ Default hyphen markers render correctly
- ✅/❌ Controls panel shows `type` and `customMarker` controls
- ✅/❌ Controls update list in real-time

**Marker Types Story:**

- ✅/❌ Disc markers render correctly
- ✅/❌ Circle markers render correctly
- ✅/❌ Square markers render correctly
- ✅/❌ Hyphen markers render correctly
- ✅/❌ Custom markers render correctly

**Nested Lists:**

- ✅/❌ Top-level shows hyphen
- ✅/❌ Nested shows square (default)
- ✅/❌ Deprecation warning appears in console

**Edge Cases:**

- ✅/❌ Custom marker without value falls back correctly
- ✅/❌ Custom marker ignored for non-custom types
- ✅/❌ Unicode characters work correctly

**Console:**

- ✅/❌ No errors in console
- ✅/❌ Deprecation warnings are clear and helpful
- ✅/❌ Warnings appear only once per component

#### Web Components Tests

[Same checklist as React]

#### Screenshots

**Add screenshots of:**

1. Each marker type (disc, circle, square, hyphen, custom)
2. Nested lists with different marker types
3. Console showing deprecation warnings

#### Issues Found

**List any issues:**

- [Issue 1]: Description
- [Issue 2]: Description

#### Recommendations

**Suggestions for improvement:**

- [Recommendation 1]
- [Recommendation 2]

---

## 8. QUICK REFERENCE

### Storybook URLs

**React:**

- Default:
  `http://localhost:3000/?path=/story/components-unorderedlist--default`
- Marker Types:
  `http://localhost:3000/?path=/story/components-unorderedlist--marker-types`
- Nested: `http://localhost:3000/?path=/story/components-unorderedlist--nested`
- Nested with Marker Types:
  `http://localhost:3000/?path=/story/components-unorderedlist--nested-with-marker-types`

**Web Components:**

- Default:
  `http://localhost:6006/?path=/story/components-unordered-list--default`
- Marker Types:
  `http://localhost:6006/?path=/story/components-unordered-list--marker-types`
- Nested: `http://localhost:6006/?path=/story/components-unordered-list--nested`
- Nested with Marker Types:
  `http://localhost:6006/?path=/story/components-unordered-list--nested-with-marker-types`

### Commands

```bash
# React Storybook
cd packages/react && yarn storybook

# Web Components Storybook
cd packages/web-components && yarn storybook

# Stop Storybook
Press Ctrl+C in the terminal
```

---

## 9. EXPECTED VISUAL RESULTS

### Marker Type Visual Guide:

```
Disc (•):    • Item one
             • Item two
             • Item three

Circle (○):  ○ Item one
             ○ Item two
             ○ Item three

Square (▪):  ▪ Item one
             ▪ Item two
             ▪ Item three

Hyphen (–):  – Item one
             – Item two
             – Item three

Custom (→):  → Item one
             → Item two
             → Item three
```

---

## 10. NEXT STEPS AFTER TESTING

Once testing is complete:

1. **Document findings** in the testing report
2. **Create screenshots** of each marker type
3. **Note any issues** or unexpected behavior
4. **Verify backward compatibility** with existing code
5. **Ready for PR** if all tests pass

---

## Questions or Issues?

If you encounter any issues during testing:

1. Check the browser console for errors
2. Verify all dependencies are installed
3. Try a clean build (see Build Steps section)
4. Check that you're using the correct Node version (>= 20.x)

Good luck with your testing! 🚀
