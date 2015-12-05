# Core Team

This is documentation for team members who are responsible for maintaining the bluemix-components repo. These team members will be known and referred to as the **core team** ([see members](https://github.ibm.com/orgs/Bluemix/teams/bluemix-components-core-team)).

## Review Pull Requests Locally

Follow the steps below to review a pull request locally.
Once that's done, refer to the [wiki](https://github.ibm.com/Bluemix/bluemix-components/wiki/Review-Pull-Requests) for how to thoroughly review pull requests before merging.

```
# Add remotes for contributors (name them whatever you want)
git remote add badluckbrian git@github.ibm.com:bthan/bluemix-components.git

# Fetch all branches (easier)
git fetch --all

# Checkout into one of their branches to review
git checkout --track badluckbrian/component/calendar/refactor

# Run the project
npm run dev
```
* `badluckbrian`'s branch is now available locally at `component/calendar/refactor`
* If `badluckbrian` makes more changes to the branch, pull down his changes to your local copy of his branch: `git pull badluckbrian component/calendar/refactor`
* Don't worry about merge commits *you* create on this branch locally.

![git-remote-add-danz](https://uploads.github.ibm.com/github-enterprise-assets/0000/0076/0000/4629/5b4152b8-9da1-11e5-8a52-2bdb16b66ae4.gif)

## Publish New Releases

Bluemix Components is distributed as a private bower package called `bluemix-components`. Use GitHub releases to draft and publish new versions of the `bluemix-components` bower package. Every version must use `semver` (semantic version) numbers. New versions are published (almost) daily as Pull Requests are merged to the original project. Reference commit history to draft new releases. [Read our wiki on Semantic Versioning](https://github.ibm.com/Bluemix/bluemix-components/wiki/Semantic-Versioning-(semver)) for more details.

1. Go to [GitHub Releases](https://github.ibm.com/Bluemix/bluemix-components/releases)
2. Click the ["Draft New Release"](https://github.ibm.com/Bluemix/bluemix-components/releases/new) button.
3. Fill in the form: 
  * Tag: semantic version appended with `-alpha`
  * Release title: same as tag
  * Description: describes what's changed in the new release.
4. Check the box for "This is a pre-release"
5. Complete the release by pressing "Publish release" button
  * You can also press "Save draft" button to edit this later.

![publish-new-release](https://uploads.github.ibm.com/github-enterprise-assets/0000/0076/0000/4804/e1ba9db4-9eae-11e5-85a6-39acbba1165c.gif)

