# FAQ

## Table of Contents

<!-- To run doctoc, just do `npx doctoc FAQ.md` in this directory! -->

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Why is the clear icon a button?](#why-is-the-clear-icon-a-button)
- [The close icon isn't tab-able in Safari](#the-close-icon-isnt-tab-able-in-safari)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Why is the clear icon a button?

The clear icon has been updated to use a `button` in order to be tab-able by
various browsers. If the icon is just an SVG target, than unfortunately some
screen readers may not be able to access it during the normal control flow.

## The close icon isn't tab-able in Safari

In order to tab to the close icon in an input in Safar, you'll have to use
`<Option><Tab>` instead of the standard `<Tab>` keystroke.
