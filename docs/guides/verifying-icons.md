# Verifying icons

Steps:

- Wait for latest build to complete and publish a staging link
  - If a pull request, it will leave a comment with a link
  - If it's merged into `master`, the latest will be published to https://carbon-elements.netlify.com/icons/examples/esm/
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
- The "transparent rectangle" layer wasn't stripped during our build process and so the icon looks like a black square
