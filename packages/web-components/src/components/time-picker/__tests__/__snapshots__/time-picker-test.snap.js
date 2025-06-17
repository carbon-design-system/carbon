/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots['cds-time-picker should not call onBlur when disabled'] =
  `<div class="cds--form-item">
  <label class="cds--label cds--label--disabled">
    Select a time
  </label>
  <div class="cds--time-picker cds--time-picker--md">
    <div class="cds--time-picker__input">
      <input
        class="cds--text-input cds--time-picker__input-field"
        disabled=""
        maxlength="5"
        pattern="(1[012]|[1-9]):[0-5][0-9](s)?"
        placeholder="hh:mm"
        type="text"
      >
    </div>
    <slot>
    </slot>
  </div>
</div>
`;
/* end snapshot cds-time-picker should not call onBlur when disabled */

snapshots['cds-time-picker events should write text inside the textbox'] =
  `<div class="cds--form-item">
  <label class="cds--label">
    Select a time
  </label>
  <div class="cds--time-picker cds--time-picker--md">
    <div class="cds--time-picker__input">
      <input
        class="cds--text-input cds--time-picker__input-field"
        maxlength="5"
        pattern="(1[012]|[1-9]):[0-5][0-9](s)?"
        placeholder="hh:mm"
        type="text"
      >
    </div>
    <slot>
    </slot>
  </div>
</div>
`;
/* end snapshot cds-time-picker events should write text inside the textbox */
