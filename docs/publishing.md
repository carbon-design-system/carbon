# Publishing

<!-- prettier-ignore-start -->
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Table of Contents

- [Publishing a stable release](#publishing-a-stable-release)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->
<!-- prettier-ignore-end -->

## Publishing a stable release

You can publish a release of `carbon-components` by following these steps:

- Verify that you are on `master` and are up-to-date by running `git pull upstream master`
  - This assumes you have setup `upstream` pointed towards `carbon-components`
- Create a new branch called `release/vX.Y.Z` where `X.Y.Z` is the version you
  would like to publish
- Update the `version` field in `package.json` to the version you used above
- Commit this version change with the commit message: `vX.Y.Z`
- Create a Pull Request and request reviewers
- After the Pull Request has been approved, merge into master
- Now you can publish the package to `npm`. Do this you can run the following
  command for a dry run:
  - `npm publish . --dry-run`
- If you need to tag this package, you can use the `--tag` flag, for example:
  - `npm publish . --tag next`
- If the changes look good to go, you can run the following command to publish:
  - `npm publish .`
- After the package is published, you should create a git tag by running:
  - `git tag vX.Y.Z`
- You can then push this tag upstream by running:
  - `git push upstream vX.Y.Z`
- After pushing the tag upstream, you should see the tag appear under
  [releases](https://github.com/IBM/carbon-components/releases)
- Edit the tag under releases with our CHANGELOG format, you can get the most
  recent changelog by running the following command and viewing the generated
  `CHANGELOG.md` file:
  - `npx conventional-changelog-cli -p angular -i CHANGELOG.md -s -r 0`
- After updating the release on GitHub, you should be good to go! Congrats on
  the release!!! <span aria-label="celebrate">🎉</span>
