### HTML

No structural changes, however, the label now has a new CSS class.

Vanilla markup should be migrated to one shown in
[carbondesignsystem.com](https://next.carbondesignsystem.com/components/file-uploader/code)
site. React and other framework variants should reflect the change
automatically.

**New Markup**:

```html
<div class="bx--form-item">
  <strong class="bx--file--label">Account photo</strong> ...
</div>
```

**Old Markup**:

```html
<div class="bx--form-item">
  <strong class="bx--label">Account photo</strong> ...
</div>
```

### SCSS

| v9  | v10              | Note  |
| --- | ---------------- | ----- |
| -   | `bx--file—label` | ✨New |
