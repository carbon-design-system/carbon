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
<button
  class="cds--snippet-button"
  title="Copy to clipboard"
  type="button"
>
  <slot>
  </slot>
  <div
    class="cds--assistive-text cds--btn--copy__feedback"
    data-feedback="Copied!"
  >
  </div>
</button>

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
<button
  class="cds--snippet-button"
  title="Copy to clipboard"
  type="button"
>
  <slot>
  </slot>
  <div
    class="cds--assistive-text cds--btn--copy__feedback"
    data-feedback="Copied!"
  >
  </div>
</button>

```

####   `Should render with minimum attributes for inline mode`

```
<button
  class="cds--snippet cds--snippet--inline"
  title="Copy to clipboard"
  type="button"
>
  <code aria-label="code-snippet">
    <slot>
    </slot>
  </code>
  <div
    class="cds--assistive-text cds--btn--copy__feedback"
    data-feedback="Copied!"
  >
  </div>
</button>

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
<button
  class="cds--snippet-button"
  title="copy-button-assistive-text-foo"
  type="button"
>
  <slot>
  </slot>
  <div
    class="cds--assistive-text cds--btn--copy__feedback"
    data-feedback="copy-button-feedback-text-foo"
  >
  </div>
</button>

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
<button
  class="cds--snippet-button"
  title="copy-button-assistive-text-foo"
  type="button"
>
  <slot>
  </slot>
  <div
    class="cds--assistive-text cds--btn--copy__feedback"
    data-feedback="copy-button-feedback-text-foo"
  >
  </div>
</button>

```

####   `Should render with various attributes for inline mode`

```
<button
  class="cds--snippet cds--snippet--inline"
  title="copy-button-assistive-text-foo"
  type="button"
>
  <code aria-label="code-assistive-text-foo">
    <slot>
    </slot>
  </code>
  <div
    class="cds--assistive-text cds--btn--copy__feedback"
    data-feedback="copy-button-feedback-text-foo"
  >
  </div>
</button>

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

