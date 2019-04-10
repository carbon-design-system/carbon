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

1. Verify that you are on `master` and are up-to-date by running:
   - `git pull upstream master && git fetch upstream --tags`
   - This assumes you have setup `upstream` pointed towards `carbon-components`
1. Create a new branch called `release/vX.Y.Z` where `X.Y.Z` is the version you
   would like to publish
1. Update the `version` field in `package.json` to the version you used above
1. Commit this version change with the commit message: `vX.Y.Z`
1. Create a pull Request and request reviewers
1. Run the following command and include the latest changes in your pull request
   - `npx conventional-changelog-cli -p angular -i CHANGELOG.md -s -r 0`
   - If the the release range is off, ensure you fetched the upstream tags (step 1)
1. After the pull Request has been approved, merge into master
1. Now you can publish the package to `npm`. Do this you can run the following
   command for a dry run:
   - `npm publish . --dry-run`
1. If you need to tag this package, you can use the `--tag` flag, for example:
   - `npm publish . --tag next`
1. If the changes look good to go, you can run the following command to publish:
   - `npm publish .`
1. After the package is published, you should create a git tag by running:
   - `git tag vX.Y.Z`
1. You can then push this tag upstream by running:
   - `git push upstream vX.Y.Z`
1. After pushing the tag upstream, you should see the tag appear under
   [releases](https://github.com/IBM/carbon-components/releases)
1. Edit the tag under releases to include the changelog from your pull request (step 6)
1. After updating the release on GitHub, you should be good to go! Congrats on
   the release!!! <span aria-label="celebrate">🎉</span>
