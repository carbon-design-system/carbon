# Icons

<!-- prettier-ignore-start -->
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Table of Contents

- [Building an Icon Library](#building-an-icon-library)
- [Software design notes](#software-design-notes)
- [FAQ](#faq)
    - [Why aren't we distributing an iconfont package?](#why-arent-we-distributing-an-iconfont-package)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->
<!-- prettier-ignore-end -->

## Building an Icon Library

## Software design notes

- Fan-out pattern is strongly encouraged given the number of icons
- Need utilities for setting, saving, and retrieving icon names for developers
- Need utilities to help create a bundle, write it, and then output other bundle
  types like CommonJS and UMD

## FAQ

#### Why aren't we distributing an iconfont package?

Iconfonts have several issues with performance and accessibility, namely for
individuals with dyslexia.

Reference:

- https://twitter.com/sarah_edo/status/1044580394052403200
- https://speakerdeck.com/ninjanails/death-to-icon-fonts
