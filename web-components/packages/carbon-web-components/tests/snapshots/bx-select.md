# `bx-select`

## `Misc attributes`

#### `should render with minimum attributes`

```
<label
  class="bx--label"
  for="input"
>
  <slot name="label-text">
  </slot>
</label>
<div class="bx--select-input__wrapper">
  <select
    aria-invalid="false"
    class="bx--select-input bx--select-input--md"
    id="input"
  >
    <optgroup
      class="bx--select-optgroup"
      label="Category 1"
    >
      <option
        class="bx--select-option"
        label="Option 1"
        value="all"
      >
        Option 1
      </option>
      <option
        class="bx--select-option"
        label="Option 2"
        value="cloudFoundry"
      >
        Option 2
      </option>
    </optgroup>
    <optgroup
      class="bx--select-optgroup"
      label="Category 2"
    >
      <option
        class="bx--select-option"
        label="Option 3"
        value="staging"
      >
        Option 3
      </option>
      <option
        class="bx--select-option"
        label="Option 4"
        value="dea"
      >
        Option 4
      </option>
      <option
        class="bx--select-option"
        label="Option 5"
        value="router"
      >
        Option 5
      </option>
    </optgroup>
  </select>
</div>
<div class="bx--form__helper-text">
  <slot name="helper-text">
  </slot>
</div>

```

#### `should render with various attributes`

```
<label
  class="bx--label bx--label--disabled"
  for="input"
>
  <slot name="label-text">
    label-text-foo
  </slot>
</label>
<div class="bx--select-input__wrapper">
  <select
    aria-invalid="false"
    class="bx--select-input bx--select-input--xl"
    disabled=""
    id="input"
  >
    <optgroup
      class="bx--select-optgroup"
      label="Category 1"
    >
      <option
        class="bx--select-option"
        label="Option 1"
        value="all"
      >
        Option 1
      </option>
      <option
        class="bx--select-option"
        label="Option 2"
        value="cloudFoundry"
      >
        Option 2
      </option>
    </optgroup>
    <optgroup
      class="bx--select-optgroup"
      label="Category 2"
    >
      <option
        class="bx--select-option"
        label="Option 3"
        value="staging"
      >
        Option 3
      </option>
      <option
        class="bx--select-option"
        label="Option 4"
        value="dea"
      >
        Option 4
      </option>
      <option
        class="bx--select-option"
        label="Option 5"
        value="router"
      >
        Option 5
      </option>
    </optgroup>
  </select>
</div>
<div class="bx--form__helper-text bx--form__helper-text--disabled">
  <slot name="helper-text">
    helper-text-foo
  </slot>
</div>

```

#### `should render invalid state`

```
<label
  class="bx--label"
  for="input"
>
  <slot name="label-text">
  </slot>
</label>
<div
  class="bx--select-input__wrapper"
  data-invalid=""
>
  <select
    aria-describedby="validity-message"
    aria-invalid="true"
    class="bx--select-input bx--select-input--md"
    id="input"
  >
    <optgroup
      class="bx--select-optgroup"
      label="Category 1"
    >
      <option
        class="bx--select-option"
        label="Option 1"
        value="all"
      >
        Option 1
      </option>
      <option
        class="bx--select-option"
        label="Option 2"
        value="cloudFoundry"
      >
        Option 2
      </option>
    </optgroup>
    <optgroup
      class="bx--select-optgroup"
      label="Category 2"
    >
      <option
        class="bx--select-option"
        label="Option 3"
        value="staging"
      >
        Option 3
      </option>
      <option
        class="bx--select-option"
        label="Option 4"
        value="dea"
      >
        Option 4
      </option>
      <option
        class="bx--select-option"
        label="Option 5"
        value="router"
      >
        Option 5
      </option>
    </optgroup>
  </select>
</div>
<div
  class="bx--form-requirement"
  id="validity-message"
>
  <slot name="validity-message">
    validity-message-foo
  </slot>
</div>

```
