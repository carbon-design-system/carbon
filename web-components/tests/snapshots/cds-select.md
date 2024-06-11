# `cds-select`

## `Misc attributes`

####   `should render with minimum attributes`

```
<div class="cds--select">
  <label
    class="cds--label"
    for="input"
  >
    <slot name="label-text">
    </slot>
  </label>
  <div class="cds--select-input__wrapper">
    <select
      aria-invalid="false"
      aria-readonly="false"
      class="cds--select-input cds--select-input--md"
      id="input"
    >
      <optgroup
        class="cds--select-optgroup"
        label="Category 1"
      >
        <option
          class="cds--select-option"
          label="Option 1"
          value="all"
        >
          Option 1
        </option>
        <option
          class="cds--select-option"
          label="Option 2"
          value="cloudFoundry"
        >
          Option 2
        </option>
      </optgroup>
      <optgroup
        class="cds--select-optgroup"
        label="Category 2"
      >
        <option
          class="cds--select-option"
          label="Option 3"
          value="staging"
        >
          Option 3
        </option>
        <option
          class="cds--select-option"
          label="Option 4"
          value="dea"
        >
          Option 4
        </option>
        <option
          class="cds--select-option"
          label="Option 5"
          value="router"
        >
          Option 5
        </option>
      </optgroup>
    </select>
  </div>
</div>

```

####   `should render with various attributes`

```
<div class="cds--select cds--select--disabled">
  <label
    class="cds--label cds--label--disabled"
    for="input"
  >
    <slot name="label-text">
      label-text-foo
    </slot>
  </label>
  <div class="cds--select-input__wrapper">
    <select
      aria-invalid="false"
      aria-readonly="false"
      class="cds--select-input cds--select-input--xl"
      disabled=""
      id="input"
    >
      <optgroup
        class="cds--select-optgroup"
        label="Category 1"
      >
        <option
          class="cds--select-option"
          label="Option 1"
          value="all"
        >
          Option 1
        </option>
        <option
          class="cds--select-option"
          label="Option 2"
          value="cloudFoundry"
        >
          Option 2
        </option>
      </optgroup>
      <optgroup
        class="cds--select-optgroup"
        label="Category 2"
      >
        <option
          class="cds--select-option"
          label="Option 3"
          value="staging"
        >
          Option 3
        </option>
        <option
          class="cds--select-option"
          label="Option 4"
          value="dea"
        >
          Option 4
        </option>
        <option
          class="cds--select-option"
          label="Option 5"
          value="router"
        >
          Option 5
        </option>
      </optgroup>
    </select>
  </div>
  <div class="cds--form__helper-text cds--form__helper-text--disabled">
    <slot name="helper-text">
      helper-text-foo
    </slot>
  </div>
</div>

```

####   `should render invalid state`

```
<div class="cds--select cds--select--invalid">
  <label
    class="cds--label"
    for="input"
  >
    <slot name="label-text">
    </slot>
  </label>
  <div
    class="cds--select-input__wrapper"
    data-invalid=""
  >
    <select
      aria-describedby="invalid-text"
      aria-invalid="true"
      aria-readonly="false"
      class="cds--select-input cds--select-input--md"
      id="input"
    >
      <optgroup
        class="cds--select-optgroup"
        label="Category 1"
      >
        <option
          class="cds--select-option"
          label="Option 1"
          value="all"
        >
          Option 1
        </option>
        <option
          class="cds--select-option"
          label="Option 2"
          value="cloudFoundry"
        >
          Option 2
        </option>
      </optgroup>
      <optgroup
        class="cds--select-optgroup"
        label="Category 2"
      >
        <option
          class="cds--select-option"
          label="Option 3"
          value="staging"
        >
          Option 3
        </option>
        <option
          class="cds--select-option"
          label="Option 4"
          value="dea"
        >
          Option 4
        </option>
        <option
          class="cds--select-option"
          label="Option 5"
          value="router"
        >
          Option 5
        </option>
      </optgroup>
    </select>
  </div>
  <div class="cds--form-requirement">
    validity-message-foo
  </div>
</div>

```

