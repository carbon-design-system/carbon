# Installing dependencies

> Guidelines for how to install dependencies in this project

<!-- prettier-ignore-start -->
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Table of Contents

- [Overview](#overview)
- [Continuous Integration](#continuous-integration)
- [FAQ](#faq)
  - [How do I install a dependency?](#how-do-i-install-a-dependency)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->
<!-- prettier-ignore-end -->

# Overview

In light of potential `npm` security issues
[[1]](https://blog.npmjs.org/post/175824896885/incident-report-npm-inc-operations-incident-of)
[[2]](https://eslint.org/blog/2018/07/postmortem-for-malicious-package-publishes),
we are addressing some of the issues with installing dependencies from a live
registry by taking advantage of
[Yarn's offline feature](https://yarnpkg.com/blog/2016/11/24/offline-mirror/).
The majority of steps taken are inspired by
[this tweet](https://twitter.com/leeb/status/1017607265115750400) from Lee
Byron.

# Continuous Integration

We specify a `.yarnc` file in this project that sets the path for Yarn's offline
mirror to the folder `.yarn-offline-mirror`. This folder contains all the
tarballs for the packages that the project uses. What this allows us to do is
run `yarn install --offline` in our Continuous Integration environment so that
we don't have to fetch from the live registry in our builds.

# FAQ

## How do I install a dependency?

When installing a dependency, you can just do `yarn add <dependency-name>` as
normal. The only difference now is that you also will check in the corresponding
tarball entry in `.yarn-offline-mirror` as well so that we don't have to fetch
this dependency from the live registry during Continuous Integration builds.
