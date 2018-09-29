# Icons

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
