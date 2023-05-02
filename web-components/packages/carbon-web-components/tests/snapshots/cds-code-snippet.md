# `cds-code-snippet`

## `Rendering`

####   `Should render with minimum attributes for single line mode`

```
<div
  aria-label="code-snippet"
  class="cds--snippet-container"
  role="textbox"
  tabindex="0"
>
  <code>
    <pre>
      <slot>
      </slot>
    </pre>
  </code>
</div>
<cds-copy-button feedback="Copied!">
  Copy to clipboard
</cds-copy-button>

```

####   `Should render with minimum attributes for multi line mode`

```
<div
  aria-label="code-snippet"
  class="cds--snippet-container"
  role="textbox"
  tabindex="0"
>
  <code>
    <pre>
      <slot>
      </slot>
    </pre>
  </code>
</div>
<cds-copy-button feedback="Copied!">
  Copy to clipboard
</cds-copy-button>

```

####   `Should render with minimum attributes for inline mode`

```
<cds-copy-button feedback="Copied!">
  Copy to clipboard
</cds-copy-button>

```

####   `Should render with various attributes for single line mode`

```
<div
  aria-label="code-assistive-text-foo"
  class="cds--snippet-container"
  role="textbox"
  tabindex="0"
>
  <code>
    <pre>
      <slot>
      </slot>
    </pre>
  </code>
</div>
<cds-copy-button feedback="copy-button-feedback-text-foo">
  copy-button-assistive-text-foo
</cds-copy-button>

```

####   `Should render with various attributes for multi line mode`

```
<div
  aria-label="code-assistive-text-foo"
  class="cds--snippet-container"
  role="textbox"
  tabindex="0"
>
  <code>
    <pre>
      <slot>
      </slot>
    </pre>
  </code>
</div>
<cds-copy-button feedback="copy-button-feedback-text-foo">
  copy-button-assistive-text-foo
</cds-copy-button>

```

####   `Should render with various attributes for inline mode`

```
<cds-copy-button feedback="copy-button-feedback-text-foo">
  copy-button-assistive-text-foo
</cds-copy-button>

```

## `Expand/collapse button in multi line mode`

####   `Should render the expando`

```
<button
  class="cds--snippet-btn--expand"
  type="button"
>
  <span
    class="cds--snippet-btn--text"
    id="button-text"
  >
    <slot name="expand-button-text">
      expand-button-text-foo
    </slot>
  </span>
</button>

```

