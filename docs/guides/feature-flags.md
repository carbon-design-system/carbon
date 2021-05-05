# Sass

<!-- prettier-ignore-start -->
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Table of Contents

- [Overview](#overview)
- [Sass](#sass) 
- [React](#react)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->
<!-- prettier-ignore-end -->

## Overview

We've started adding in new functionality to the codebase that will be included
as part of our V11 release. To try out these new features, you can enable a
feature flag that will use the new V11 code by default. There is both a Sass and
React feature flag implementation, and this guide will get you up to speed on
how to use both of them.

## Sass

To enable the V11 feature flag in Sass, you'll need to include a feature flag
declaration _before_ you import the Carbon style package. Here's an example:

```scss
$feature-flags: (
  enable-2021-release: true,
);

@import 'carbon-components/scss/globals/scss/styles.scss';
```

## React
