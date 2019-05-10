# Verifying icons

<!-- prettier-ignore-start -->
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Table of Contents

- [Common issues](#common-issues)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->
<!-- prettier-ignore-end -->

Steps:

- Wait for latest build to complete and publish a staging link
  - If a pull request, it will leave a comment with a link
  - If it's merged into `master`, the latest will be published to
    https://carbon-elements.netlify.com/icons/examples/esm/
- Visit the icon example directly
- Verify icons match expected state, some common things to look for:
  - Verify icon is aliasing correctly on non-retina
  - Verify in:
    - latest Chrome
    - latest Firefox
    - Firefox ESR
    - Safari
    - IE11
    - Edge

#### Common issues

- Icon doesn't alias correctly on non-retina displays
  - Downsampled icon doesn't alias correctly
- The "transparent rectangle" layer wasn't stripped during our build process and
  so the icon looks like a black square
