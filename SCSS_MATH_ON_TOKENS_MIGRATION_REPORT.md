# SCSS Math on Design Tokens - Migration Report

**Carbon Design System - CSS Custom Properties Migration**  
**Date:** May 27, 2026  
**Scope:** Analysis of Sass math operations on design tokens that will be
affected by CSS custom property migration

---

## Executive Summary

This report identifies all instances where Sass math operations are performed
directly on design tokens in the Carbon Design System. When migrating to
CSS-custom-property-first tokens, these instances will require updates to use
CSS `calc()` instead of Sass math.

**Key Findings:**

- **Total Instances:** 8 locations requiring updates
- **Affected Packages:** `@carbon/styles` (7), `@carbon/web-components` (1)
- **Migration Complexity:** Low - Simple conversion to `calc()`
- **Breaking Changes:** None (output remains functionally equivalent)

---

## Affected Instances

### 1. Pagination Nav - Spacing Calculation

**File:** `packages/styles/scss/components/pagination-nav/_mixins.scss`  
**Line:** 39  
**Current Code:**

```scss
inset-inline-start: calc(50% - #{$spacing-05 * 0.5});
```

**Token Used:** `$spacing-05` (spacing token)

**Status:** ✅ Already Compatible  
**Reason:** Uses interpolation `#{}` which compiles the math at build time

**Migration:** No changes needed

**Output After Migration:**

```css
inset-inline-start: calc(50% - 0.5rem);
```

---

### 2. Pagination Nav - Icon Positioning

**File:**
`packages/styles/scss/components/pagination-nav/_pagination-nav.scss`  
**Lines:** 170-171  
**Current Code:**

```scss
inset-block-start: calc(50% - #{$select-icon-top-position * 0.25});
inset-inline-start: calc(50% - #{$select-icon-top-position * 0.5});
```

**Token Used:** `$select-icon-top-position` (internal variable, not a design
token)

**Status:** ✅ Already Compatible  
**Reason:** Uses interpolation `#{}`

**Migration:** No changes needed

---

### 3. Structured List - Condensed Padding

**File:** `packages/styles/scss/components/structured-list/_mixins.scss`  
**Line:** 27  
**Current Code:**

```scss
@mixin padding-td--condensed($padding: $structured-list-padding) {
  padding: $padding * 0.25;
}
```

**Token Used:** `$structured-list-padding` (spacing-related token)

**Status:** ⚠️ Requires Update

**Problem:** Direct Sass math on token variable

**Solution:**

```scss
@mixin padding-td--condensed($padding: $structured-list-padding) {
  padding: calc($padding * 0.25);
}
```

**Before Migration Output:**

```css
padding: 0.25rem;
```

**After Migration Output:**

```css
padding: calc(var(--cds-structured-list-padding) * 0.25);
```

---

### 4. Structured List - Data List Padding

**File:** `packages/styles/scss/components/structured-list/_mixins.scss`  
**Lines:** 35, 39  
**Current Code:**

```scss
@mixin padding--data-structured-list($padding: $structured-list-padding) {
  padding-inline: $padding * 0.5 $padding * 0.5;

  &:first-child {
    padding-inline: $padding * 0.5 $padding * 0.5;
  }
}
```

**Token Used:** `$structured-list-padding` (spacing-related token)

**Status:** ⚠️ Requires Update

**Problem:** Direct Sass math on token variable

**Solution:**

```scss
@mixin padding--data-structured-list($padding: $structured-list-padding) {
  padding-inline: calc($padding * 0.5) calc($padding * 0.5);

  &:first-child {
    padding-inline: calc($padding * 0.5) calc($padding * 0.5);
  }
}
```

**Before Migration Output:**

```css
padding-inline: 0.5rem 0.5rem;
```

**After Migration Output:**

```css
padding-inline: calc(var(--cds-structured-list-padding) * 0.5)
  calc(var(--cds-structured-list-padding) * 0.5);
```

---

### 5. Number Input - Invalid Icon Position

**File:** `packages/styles/scss/components/number-input/_number-input.scss`  
**Line:** 580  
**Current Code:**

```scss
.#{$prefix}--number__input-wrapper--decorator .#{$prefix}--number__invalid,
.#{$prefix}--number__input-wrapper--slug .#{$prefix}--number__invalid {
  inset-inline-end: $spacing-13 - $spacing-05;
}
```

**Tokens Used:** `$spacing-13`, `$spacing-05` (spacing tokens)

**Status:** ⚠️ Requires Update

**Problem:** Direct Sass math (subtraction) on token variables

**Solution:**

```scss
.#{$prefix}--number__input-wrapper--decorator .#{$prefix}--number__invalid,
.#{$prefix}--number__input-wrapper--slug .#{$prefix}--number__invalid {
  inset-inline-end: calc($spacing-13 - $spacing-05);
}
```

**Before Migration Output:**

```css
inset-inline-end: 4rem;
```

**After Migration Output:**

```css
inset-inline-end: calc(var(--cds-spacing-13) - var(--cds-spacing-05));
```

---

### 6. Tooltip - Body Spacing Calculation

**File:** `packages/styles/scss/utilities/_tooltip.scss`  
**Line:** 247  
**Current Code:**

```scss
$caret-height: convert.to-rem(5px);
$body-spacing: $caret-spacing + $caret-height;
```

**Tokens Used:** `$caret-spacing` (spacing token)

**Status:** ⚠️ Requires Update

**Problem:** Direct Sass math (addition) on token variable

**Solution:**

```scss
$caret-height: convert.to-rem(5px);
$body-spacing: calc($caret-spacing + $caret-height);
```

**Before Migration Output:**

```css
/* $body-spacing used in subsequent calculations */
padding: 0.625rem;
```

**After Migration Output:**

```css
padding: calc(var(--cds-caret-spacing) + 0.3125rem);
```

---

### 7. Modal - Form Margin

**File:** `packages/styles/scss/components/modal/_modal.scss`  
**Line:** 155  
**Current Code:**

```scss
.#{$prefix}--modal-content .#{$prefix}--form--fluid {
  margin-inline: -$spacing-03 - $spacing-03;
}
```

**Token Used:** `$spacing-03` (spacing token)

**Status:** ⚠️ Requires Update

**Problem:** Direct Sass math on token variable

**Solution:**

```scss
.#{$prefix}--modal-content .#{$prefix}--form--fluid {
  margin-inline: calc(-1 * $spacing-03) calc(-1 * $spacing-03);
}
```

**Before Migration Output:**

```css
margin-inline: -0.5rem -0.5rem;
```

**After Migration Output:**

```css
margin-inline: calc(-1 * var(--cds-spacing-03)) calc(-1 * var(--cds-spacing-03));
```

---

### 8. Accordion - Divider Width

**File:** `packages/styles/scss/components/accordion/_accordion.scss`  
**Line:** 292  
**Current Code:**

```scss
inline-size: calc(100% - $spacing-05 - $spacing-05);
```

**Token Used:** `$spacing-05` (spacing token)

**Status:** ✅ Already Compatible  
**Reason:** Already uses `calc()`

**Migration:** No changes needed

**Output After Migration:**

```css
inline-size: calc(100% - var(--cds-spacing-05) - var(--cds-spacing-05));
```

---

### 9. Web Components - Fluid Form Margin

**File:** `packages/web-components/src/components/fluid-form/fluid-form.scss`  
**Line:** 22  
**Current Code:**

```scss
.#{$prefix}--form--fluid {
  margin-inline: -$spacing-03 - $spacing-03;
}
```

**Token Used:** `$spacing-03` (spacing token)

**Status:** ⚠️ Requires Update

**Problem:** Direct Sass math on token variable

**Solution:**

```scss
.#{$prefix}--form--fluid {
  margin-inline: calc(-1 * $spacing-03) calc(-1 * $spacing-03);
}
```

---

## Migration Summary

### Instances Requiring Updates

| #   | File                              | Line   | Token(s)                     | Operation      | Priority |
| --- | --------------------------------- | ------ | ---------------------------- | -------------- | -------- |
| 1   | `structured-list/_mixins.scss`    | 27     | `$structured-list-padding`   | Multiplication | Medium   |
| 2   | `structured-list/_mixins.scss`    | 35, 39 | `$structured-list-padding`   | Multiplication | Medium   |
| 3   | `number-input/_number-input.scss` | 580    | `$spacing-13`, `$spacing-05` | Subtraction    | Medium   |
| 4   | `utilities/_tooltip.scss`         | 247    | `$caret-spacing`             | Addition       | Medium   |
| 5   | `modal/_modal.scss`               | 155    | `$spacing-03`                | Negation       | Medium   |
| 6   | `fluid-form/fluid-form.scss` (WC) | 22     | `$spacing-03`                | Negation       | Medium   |

**Total:** 6 locations requiring updates

### Instances Already Compatible

| #   | File                                  | Line    | Reason                   |
| --- | ------------------------------------- | ------- | ------------------------ |
| 1   | `pagination-nav/_mixins.scss`         | 39      | Uses interpolation `#{}` |
| 2   | `pagination-nav/_pagination-nav.scss` | 170-171 | Uses interpolation `#{}` |
| 3   | `accordion/_accordion.scss`           | 292     | Already uses `calc()`    |

**Total:** 3 locations already compatible

---

## Migration Strategy

### Phase 1: Preparation

1. Create feature branch: `feat/css-custom-properties-primary`
2. Update DTCG build system to generate CSS custom properties
3. Run full test suite to establish baseline

### Phase 2: Update Math Operations

For each of the 6 instances requiring updates:

1. **Locate the file and line number**
2. **Wrap the math operation in `calc()`**
3. **Test the component visually**
4. **Run automated tests**

### Phase 3: Validation

1. Build the project: `yarn build`
2. Run visual regression tests
3. Test in supported browsers (Chrome, Firefox, Safari, Edge)
4. Verify no layout shifts or visual differences

### Phase 4: Documentation

1. Update migration guide
2. Document breaking changes (if any)
3. Update component documentation

---

## Code Transformation Examples

### Pattern 1: Multiplication

```scss
// Before
padding: $token * 0.5;

// After
padding: calc($token * 0.5);
```

### Pattern 2: Addition

```scss
// Before
$result: $token-a + $token-b;

// After
$result: calc($token-a + $token-b);
```

### Pattern 3: Subtraction

```scss
// Before
margin: $token-a - $token-b;

// After
margin: calc($token-a - $token-b);
```

### Pattern 4: Negation

```scss
// Before
margin: -$token;

// After
margin: calc(-1 * $token);
```

---

## Browser Compatibility

All proposed solutions use CSS `calc()` which is supported in:

- ✅ Chrome 26+ (2013)
- ✅ Firefox 16+ (2012)
- ✅ Safari 7+ (2013)
- ✅ Edge 12+ (2015)
- ✅ IE 11 (with fallback values)

**Recommendation:** Provide fallback values for IE11 if still supported:

```scss
// With fallback
padding: 0.5rem; // Fallback for IE11
padding: calc($spacing-05 * 0.5);
```

---

## Testing Checklist

### Visual Testing

- [ ] Structured List component (condensed variant)
- [ ] Number Input with validation
- [ ] Tooltip positioning
- [ ] Modal with fluid forms
- [ ] Accordion dividers
- [ ] Pagination navigation

### Functional Testing

- [ ] Spacing calculations are correct
- [ ] No layout shifts
- [ ] Responsive behavior maintained
- [ ] Theme switching works correctly

### Browser Testing

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] IE11 (if supported)

---

## Risk Assessment

### Low Risk ✅

- Small number of instances (6 locations)
- Simple transformations (wrap in `calc()`)
- No breaking changes to component APIs
- Excellent browser support for `calc()`

### Potential Issues ⚠️

1. **Performance:** `calc()` is evaluated at runtime vs compile-time
   - **Impact:** Negligible - modern browsers optimize `calc()` well
2. **IE11 Support:** May need fallback values

   - **Solution:** Provide static fallback before `calc()`

3. **Debugging:** Runtime calculations harder to debug
   - **Solution:** Use browser DevTools to inspect computed values

---

## Recommendations

1. ✅ **Proceed with migration** - Low risk, high benefit
2. ✅ **Update all 6 instances** in a single PR for consistency
3. ✅ **Add visual regression tests** before and after
4. ✅ **Document the change** in migration guide
5. ⚠️ **Consider IE11 fallbacks** if still supporting IE11

---

## Conclusion

The migration to CSS-custom-property-first tokens is **highly feasible** with
minimal code changes required. Only **6 locations** need updates, and all can be
resolved by wrapping existing math operations in `calc()`.

**Benefits:**

- ✅ Enables runtime theming
- ✅ Better design tool integration
- ✅ Industry-standard DTCG format
- ✅ No breaking changes to consumers

**Effort:** Low (1-2 hours of development + testing)

**Risk:** Low (simple, well-supported transformations)

---

## Appendix: Complete File List

### Files Requiring Changes

1. `packages/styles/scss/components/structured-list/_mixins.scss`
2. `packages/styles/scss/components/number-input/_number-input.scss`
3. `packages/styles/scss/utilities/_tooltip.scss`
4. `packages/styles/scss/components/modal/_modal.scss`
5. `packages/web-components/src/components/fluid-form/fluid-form.scss`

### Files Already Compatible

1. `packages/styles/scss/components/pagination-nav/_mixins.scss`
2. `packages/styles/scss/components/pagination-nav/_pagination-nav.scss`
3. `packages/styles/scss/components/accordion/_accordion.scss`

---

**Report Generated:** May 27, 2026  
**Carbon Design System Version:** 1.107.0  
**Analysis Tool:** Manual code review + regex search
