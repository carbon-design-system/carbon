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

### Minor releases

### Major releases 

## Running the endgame

## FAQ

#### Making sure your environment is consistent with `upstream`

```bash
yarn clean && \
yarn install --offline && \
yarn build
```
