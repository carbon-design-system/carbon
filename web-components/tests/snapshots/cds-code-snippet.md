# `cds-code-snippet`

## `Rendering`

####   `Should render with minimum attributes for single line mode`

```
<div
  aria-label="code-snippet"
  aria-multiline=""
  aria-readonly="true"
  class="cds--snippet-container"
  role="textbox"
  style=""
  tabindex="0"
>
  <pre>
    <code>
      <slot>
      </slot>
    </code>
  </pre>
</div>
<div class="cds--snippet__overflow-indicator--right">
</div>
<cds-copy-button
  button-class-name=""
  feedback="Copied!"
  feedback-timeout="2000"
>
  Copy to Clipboard
</cds-copy-button>

```

####   `Should render with minimum attributes for multi line mode`

```
<div
  aria-label="code-snippet"
  aria-multiline="true"
  aria-readonly="true"
  class="cds--snippet-container"
  role="textbox"
  style="max-height:240px;min-height:48px;"
  tabindex="0"
>
  <pre>
    <code>
      <slot>
      </slot>
    </code>
  </pre>
</div>
<cds-copy-button
  button-class-name=""
  feedback="Copied!"
  feedback-timeout="2000"
>
  Copy to Clipboard
</cds-copy-button>

```

####   `Should render with minimum attributes for inline mode`

```
<cds-copy button-class-name="cds--snippet cds--snippet--inline">
  <code slot="icon">
    <slot>
    </slot>
  </code>
  <span slot="tooltip-content">
    Copy to Clipboard
  </span>
</cds-copy>

```

####   `Should render with various attributes for single line mode`

```
<div
  aria-label="code-snippet"
  aria-multiline=""
  aria-readonly="true"
  class="cds--snippet-container"
  role="textbox"
  style=""
  tabindex="0"
>
  <pre>
    <code>
      <slot>
      </slot>
    </code>
  </pre>
</div>
<div class="cds--snippet__overflow-indicator--right">
</div>
<cds-copy-button
  button-class-name=""
  feedback="Copied!"
  feedback-timeout="2000"
>
  Copy to Clipboard
</cds-copy-button>

```

####   `Should render with various attributes for multi line mode`

```
<div
  aria-label="code-snippet"
  aria-multiline="true"
  aria-readonly="true"
  class="cds--snippet-container"
  role="textbox"
  style="max-height:240px;min-height:48px;"
  tabindex="0"
>
  <pre>
    <code>
      <slot>
      </slot>
    </code>
  </pre>
</div>
<cds-copy-button
  button-class-name=""
  feedback="Copied!"
  feedback-timeout="2000"
>
  Copy to Clipboard
</cds-copy-button>

```

####   `Should render with various attributes for inline mode`

```
<cds-copy button-class-name="cds--snippet cds--snippet--inline">
  <code slot="icon">
    <slot>
    </slot>
  </code>
  <span slot="tooltip-content">
    Copy to Clipboard
  </span>
</cds-copy>

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

