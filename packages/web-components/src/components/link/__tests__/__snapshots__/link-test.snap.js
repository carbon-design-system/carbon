/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots['cds-link should render'] = `<cds-link
  href="https://carbondesignsystem.com"
  size="md"
>
  test
</cds-link>
`;
/* end snapshot cds-link should render */

snapshots['cds-link should render an <a> element'] = `<a
  class="cds--link cds--link--md"
  href="https://carbondesignsystem.com"
  id="link"
  part="link"
  tabindex="0"
>
  <slot>
  </slot>
  <div
    class="cds--link__icon"
    hidden=""
  >
    <slot name="icon">
    </slot>
  </div>
</a>
`;
/* end snapshot cds-link should render an <a> element */

snapshots['cds-link should include child content'] = `<cds-link
  href="https://carbondesignsystem.com"
  size="md"
>
  test
</cds-link>
`;
/* end snapshot cds-link should include child content */

snapshots['cds-link should support being disabled'] = `<p
  class="cds--link cds--link--disabled cds--link--md"
  id="link"
  part="link"
>
  <slot>
  </slot>
</p>
<div
  class="cds--link__icon"
  hidden=""
>
  <slot name="icon">
  </slot>
</div>
<p>
</p>
`;
/* end snapshot cds-link should support being disabled */

snapshots['cds-link should support the inline link variant'] = `<a
  class="cds--link cds--link--inline cds--link--md"
  href="https://carbondesignsystem.com"
  id="link"
  part="link"
  tabindex="0"
>
  <slot>
  </slot>
  <div
    class="cds--link__icon"
    hidden=""
  >
    <slot name="icon">
    </slot>
  </div>
</a>
`;
/* end snapshot cds-link should support the inline link variant */

snapshots['cds-link should support the sm size variant'] = `<a
  class="cds--link cds--link--sm"
  href="https://carbondesignsystem.com"
  id="link"
  part="link"
  tabindex="0"
>
  <slot>
  </slot>
  <div
    class="cds--link__icon"
    hidden=""
  >
    <slot name="icon">
    </slot>
  </div>
</a>
`;
/* end snapshot cds-link should support the sm size variant */

snapshots['cds-link should support the md size variant'] = `<a
  class="cds--link cds--link--md"
  href="https://carbondesignsystem.com"
  id="link"
  part="link"
  tabindex="0"
>
  <slot>
  </slot>
  <div
    class="cds--link__icon"
    hidden=""
  >
    <slot name="icon">
    </slot>
  </div>
</a>
`;
/* end snapshot cds-link should support the md size variant */

snapshots['cds-link should support the lg size variant'] = `<a
  class="cds--link cds--link--lg"
  href="https://carbondesignsystem.com"
  id="link"
  part="link"
  tabindex="0"
>
  <slot>
  </slot>
  <div
    class="cds--link__icon"
    hidden=""
  >
    <slot name="icon">
    </slot>
  </div>
</a>
`;
/* end snapshot cds-link should support the lg size variant */
