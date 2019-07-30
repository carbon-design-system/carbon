# Endgame

## About

What is the endgame?

Who runs the endgame?

Meet the team:

- Leader (design or development)
- Sidekicks
  - 1 from design
  - 1 from development
  
### Rotation

## Releases

### Hotfixes

Quickfix needed now

### Patch releases

During a project cycle, our goal is to group up fixes contributed to the project into weekly patch release cycles. If no new fixes are contributed in a given week, then no new patch would need to be released.

All patches are based on the previous stable git tag. You can find the latest git tag by running the following command in your terminal:

```bash
git tag -l --sort=-v:refname
```

The first tag you see at the top of the screen will be the latest tag. In addition, you can use the GitHub UI to view the [latest release](https://github.com/carbon-design-system/carbon/releases/latest). The git tag associated with the latest release will be the one you'll want to use.

You can checkout git tags using `git` by running the following command:

```bash
git checkout <name-of-tag>
```

For example:

```bash
git checkout v10.4.0
```

You should then create a branch off of this tag that will include that changes for the next patch release. You should name this branch using the following pattern: `chore/release-vX.Y.Z`. The version should be one patch bump higher than the last stable git tag. For example:

- `v10.4.0` becomes `v10.4.1`
- `v10.4.1` becomes `v10.4.2`

If the last stable git tag was `v10.4.0`, then the branch would be named:

```bash
git checkout chore/release-v10.4.1
```

After creating this branch, your goal will be use the [`cherry-pick`](https://git-scm.com/docs/git-cherry-pick) feature from `git` to bring over commits with the following types:

- build
- ci
- chore
- docs
- fix
- refactor
- revert
- style
- test

The most important commit type we do not want to bring over is `feat`, as this would be a [`minor`](#minor-releases) release.

The list of commits that you will want to cherry-pick over will come from comparing the latest tag to `master`. You can do this through GitHub UI using a URl with this structure:

```http
https://github.com/carbon-design-system/carbon/compare/vX.Y.Z...vA.B.C
```

For example, if I wanted to compare `v10.4.1` to `v10.4.0`, the URL would look like:

```http
https://github.com/carbon-design-system/carbon/compare/v10.4.0...v10.4.1
```

To compare what is in `master` to the latest tag, this would look like:

```http
https://github.com/carbon-design-system/carbon/compare/v10.4.1...master
```

You can replace the latest git tag with the `v10.4.1` tag in the above URL to see all the changes that have been merged into `master` since the last git tag was published.

From this list, you should look for commits that begin the valid types detailed above. For each commit you would like you cherry-pick, you should copy the seven character commit hash found at the end of each line in the compare view (on the far right-hand side). You can then use this information using `git cherry-pick` by doing:

```bash
git cherry-pick <HASH>
```

For example:

```bash
git cherry-pick 954ac48
```

If you notice that multiple commits in succession have valid types, you can cherry-pick a range of commits by using the `..` characters between two commit hashes, where the first hash is the first commit in the range and the second hash is the last commit in the range. In practice, this looks like:

```bash
git cherry-pick 954ac48..688c8d2
```

*Note: if you run into a commit that is unstructured (it totally happens, no sweat!) try and determine whether the commit is patch-related, or not.*

If you run into a merge conflict, try and determine the root cause. If it's related to a generated file, feel free to regenerate, commit, and continue. If it's related to code, this will require a broader look to figure out what's going on. Worst-case, we can always cut a minor release from the latest `master` if an appropriate patch could not be generated.

Once you are done cherry-picking commits, it's time to version the changed packages. You can use `lerna` to accomplish this by running:

```bash
yarn lerna version patch --no-push --no-git-tag-version --exact
```

You should see a confirmation dialog similar to the following:

```bash
Changes:
 - carbon-components: 10.4.1 => 10.4.2
 - @carbon/elements: 10.4.0 => 10.4.1
 - @carbon/icons-angular: 10.4.0 => 10.4.1
 - @carbon/icons-handlebars: 10.4.0 => 10.4.1
 - @carbon/icons-react: 10.4.1 => 10.4.2
 - @carbon/icons-vue: 10.4.0 => 10.4.1
 - @carbon/icons: 10.4.0 => 10.4.1
 - carbon-components-react: 7.4.1 => 7.4.2
 - @carbon/sketch: 10.4.0 => 10.4.1 (private)

? Are you sure you want to create these versions? (ynH)
```

You should inspect the list of changed packages to make sure they align with the commits you cherry-picked over. If something looks off, feel free to stop this command and figure out what is going on before starting again.

If everything looks good, you can enter in `y` for `Yes` and `lerna` will handle versioning the corresponding packages. If you run `git status`, you should see that `package.json` files have been updated for the corresponding packages above. You should commit these changes on your branch with the commit message:

```bash
git commit -m 'chore(release): update package versions'
```

Once that's done, you should create a Pull Request in Draft state and make sure **not** to merge it. Our goal with the Pull Request is to do a final sanity check for CI checks, verify preview links work as expected, and get final reviews from the endgame team for the release.

Once everything is green and your Pull Request has been reviewed, you should **close** the draft Pull Request. On your machine, you should then follow the following steps to release:

- Run the following steps to make sure [your environment is consistent with `upstream`](#making-sure-your-environment-is-consistent-with-upstream)
- Run `yarn lerna publish from-package --dist-tag next` to publish all packages under the `next` tag
- You should run the smoke tests that we have listed [here](#smoke-tests) with the published packages
- If everything looks good to go, then you should go through each of the packages and add the `latest` tag using the command: `npm dist-tag add package-name@vX.Y.Z latest`

### Minor releases

### Major releases 

## Running the endgame

## Smoke tests

## FAQ

#### Making sure your environment is consistent with `upstream`

```bash
yarn clean && \
yarn install --offline && \
yarn build
```
