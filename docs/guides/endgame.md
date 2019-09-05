# Endgame

## About

Inspired by the release process of [VSCode](https://github.com/Microsoft/vscode/wiki/Development-Process#end-game), Carbon follows a release process that we refer to as the endgame. Given that our work is structured in a series of projects across an iteration, the endgame is an opportunity in the final week of an iteration for us to coordinate final deliverables, run verification testing, and lean on the Carbon community to help verify pre-release builds.

### Meet the endgame team

Every release cycle, we have three team members participate in running the endgame in addition to their project-specific responsibilities. Running the endgame involves a variety of tasks outlined in our [timeline](#timeline). This endgame team is composed of a release leader, and two sidekicks. There should be at minimum one designer and one developer in each endgame team.

The objectives of the release leader include the following:

- Coordinate the initial project proposals into a single iteration cycle planning issue that is shared in our issue tracker
- Share through an external blog the top-level objectives of the projects we're working for a given cycle
- Help coordinate across projects throughout the project cycle in order to run a succesful endgame
- Help to familiarize sidekicks with the endgame process so each of them may run a future endgame
- Successfully run the endgame at the conclusion of a release cycle

The objectives of the release sidekicks include:

- Assisting the release leader in endgame tasks at the end of the release cycle
- Creating documentation to make the onboarding process easier for future sidekicks
- Learning and understanding how to run a future endgame process

After a release cycle completes, the endgame team will be reorganized. The endgame leader will become a sidekick to help out with the release, and one of the sidekicks will become the new endgame leader. New team members will fill in the remaining sidekick role over time.

At a high-level, this sequence might look like the following:

Given the team:
- A (Developer)
- B (Developer)
- C (Designer)
- D (Designer)
- E (Developer)

|            | Leader        | Sidekick 1    | Sidekick 2    |
| ---------- | ------------- | ------------- | ------------- |
| Rotation 1 | A (Developer) | B (Developer) | C (Designer)  |
| Rotation 2 | B (Developer) | C (Designer)  | A (Developer) |
| Rotation 3 | C (Designer)  | D (Developer) | B (Developer) |
| Rotation 4 | D (Developer) | E (Designer)  | C (Designer)  |
| Rotation 5 | E (Designer)  | A (Developer) | D (Developer) |

## Timeline

Release cycles tend to last between four and six weeks. During that time, the endgame team is responsible for the following high-level milestones:

- [Week 1: Project planning](#week-1-project-planning)
- [Week 2: Project work](#week-2-project-work)
- [Week 3: Pre-endgame planning](#week-3-pre-endgame-planning)
- [Week 4: The endgame](#week-4-the-endgame)
- [Week 5: Release](#week-5-release)

### Week 1: Project planning

### Week 2: Project work

### Week 3: Project work

Checklist:

- Schedule mid-project playbacks

### Week 4: Pre-endgame planning

Checklist:

- [ ] Reach out to teams and figure out critical dependencies that are ship/no-ship criteria
  - Document these in the endgame issue for the Monday task
- [ ] Create endgame issue and pin it to the Carbon repo by end of week

### Week 5: The endgame

Checklist:

- Collect feedback from teams for critical dates
- Follow-up and help to coordinate delivery of items
- Make determination on ship/no-ship together with endgame team

#### Templates

<details>
  <summary>Issue template</summary>
  
```md
Title: {Month} 20XX Endgame

This is the endgame schedule for our Month 20XX iteration, which includes the following projects:

- [Project 1](#project-1)
- [Project 2](#project-2)
- [Project 3](#project-3)

## Schedule

- Endgame leader: @username
- Endgame sidekicks: @username (role), @username (role)
- XX/YY: Code freeze (EOD)
- XX/YY: Endgame done
- XX/YY: Expected release date

### Monday XX/YY

- [ ] Set endgame-specific branch protection rules
- [ ] Coordinate delivery or resolution of the following items:
  - [ ]
- [ ] Start code freeze (EOD)

### Tuesday XX/YY

- [ ] First Release Candidate cut
- [ ] Complete first round of smoke tests
- [ ] Share with Carbon Insiders for first round of testing

### Wednesday XX/YY

- [ ] Collect first round of feedback from Carbon Insiders (if available)
- [ ] Triage release-specific issues and bucket them into two categories:
  - [ ] Stop release
  - [ ] Ship with known issues
- [ ] Coordinate merging of bug fixes related to release
- [ ] Cut next Release Candidate, if applicable
  - [ ] Share newest release with Carbon Insiders for additional rounds of testing

### Thursday XX/YY

- [ ] Collect second round of feedback from Carbon Insiders (if available)
- [ ] Coordinate merging of bug fixes related to release
- [ ] Cut next Release Candidate, if applicable
  - [ ] Share newest release with Carbon Insiders for additional rounds of testing

### Friday XX/YY

- [ ] Collect final round of feedback from Carbon Insiders (if available)
- [ ] Run final smoke tests on release
- [ ] Make determination to release on following Monday

### Monday XX/YY

- [ ] Release Monday morning
- [ ] Coordinate release communications on Slack and Twitter
- [ ] Summarize top-level release notes for next blog post
```
</details>

### Week 6: Release

Checklist:

- Release on Monday under `next` tag
- Switch to `latest` on Tuesday alongside morning announcements
- Schedule release retro
- Schedule release demo

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
