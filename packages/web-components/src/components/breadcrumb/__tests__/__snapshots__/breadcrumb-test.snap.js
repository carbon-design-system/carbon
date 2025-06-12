/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["cds-breadcrumb should accept a `aria-label` for nav element"] = 
`<cds-breadcrumb
  aria-label="test-label"
  role="navigation"
  size="md"
>
</cds-breadcrumb>
`;
/* end snapshot cds-breadcrumb should accept a `aria-label` for nav element */

snapshots["cds-breadcrumb should accept children of cds-breadcrumb-item"] = 
`<cds-breadcrumb
  role="navigation"
  size="md"
>
  <cds-breadcrumb-item
    href="#a"
    role="listitem"
    size="md"
  >
    A
  </cds-breadcrumb-item>
  <cds-breadcrumb-item
    href="#b"
    role="listitem"
    size="md"
  >
    B
  </cds-breadcrumb-item>
  <cds-breadcrumb-item
    href="#c"
    role="listitem"
    size="md"
  >
    C
  </cds-breadcrumb-item>
</cds-breadcrumb>
`;
/* end snapshot cds-breadcrumb should accept children of cds-breadcrumb-item */

snapshots["cds-breadcrumb should accept a `no-trailing-slash` and omit the trailing slash"] = 
`<cds-breadcrumb
  no-trailing-slash=""
  role="navigation"
  size="md"
>
  <cds-breadcrumb-item
    href="#a"
    role="listitem"
    size="md"
  >
    A
  </cds-breadcrumb-item>
  <cds-breadcrumb-item
    href="#b"
    role="listitem"
    size="md"
  >
    B
  </cds-breadcrumb-item>
  <cds-breadcrumb-item
    href="#c"
    role="listitem"
    size="md"
  >
    C
  </cds-breadcrumb-item>
</cds-breadcrumb>
`;
/* end snapshot cds-breadcrumb should accept a `no-trailing-slash` and omit the trailing slash */

snapshots["cds-breadcrumb should respect the `size` attribute"] = 
`<cds-breadcrumb
  role="navigation"
  size="sm"
>
  <cds-breadcrumb-item
    role="listitem"
    size="sm"
  >
    <cds-breadcrumb-link
      href="#a"
      size="sm"
    >
      A
    </cds-breadcrumb-link>
  </cds-breadcrumb-item>
</cds-breadcrumb>
`;
/* end snapshot cds-breadcrumb should respect the `size` attribute */

snapshots["cds-breadcrumb should accept a `class` for outermost DOM node"] = 
`<cds-breadcrumb
  class="test"
  role="navigation"
  size="md"
>
</cds-breadcrumb>
`;
/* end snapshot cds-breadcrumb should accept a `class` for outermost DOM node */

snapshots["cds-breadcrumb should apply additional attributes to the outermost element"] = 
`<cds-breadcrumb
  data-testid="test"
  role="navigation"
  size="md"
>
</cds-breadcrumb>
`;
/* end snapshot cds-breadcrumb should apply additional attributes to the outermost element */

snapshots["cds-breadcrumb automated verification testing should have no aXe violations"] = 
`<cds-breadcrumb
  role="navigation"
  size="md"
>
  <cds-breadcrumb-item
    href="#a"
    role="listitem"
    size="md"
  >
    A
  </cds-breadcrumb-item>
  <cds-breadcrumb-item
    href="#b"
    role="listitem"
    size="md"
  >
    B
  </cds-breadcrumb-item>
  <cds-breadcrumb-item
    href="#c"
    role="listitem"
    size="md"
  >
    C
  </cds-breadcrumb-item>
</cds-breadcrumb>
`;
/* end snapshot cds-breadcrumb automated verification testing should have no aXe violations */

