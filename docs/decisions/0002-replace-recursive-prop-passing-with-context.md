# 2. Replace recursive prop passing with React Context in TreeView components

Date: 2025-07-22

## Status

Accepted

## Context

The TreeView and TreeNode components share props that need to be passed from
parent to child. Previously, we implemented a recursive function that would
traverse the component tree to locate TreeNode instances (including those
wrapped in other components) and pass props down to them.

This approach had several significant drawbacks:

- The recursive traversal was computationally expensive and energy-intensive
- Props were not always passed down correctly to wrapped TreeNode components
- Users could not reliably use TreeNode components inside custom wrapper classes
- The implementation was brittle and difficult to maintain

One specific issue that highlighted this problem:
https://github.com/carbon-design-system/carbon/issues/19522

## Decision

We will replace the recursive prop passing mechanism with React's Context API.
This allows direct communication between TreeView (parent) and TreeNode (child)
components through the React context system, eliminating the need to traverse
and analyze the component tree structure.

The implementation was completed in:
https://github.com/carbon-design-system/carbon/pull/19626

## Consequences

Users can now wrap TreeNode components with any number of custom wrapper
components without affecting the parent-child communication. This provides much
greater flexibility in component composition while improving performance by
eliminating the recursive tree traversal. The solution is also more maintainable
and follows React best practices for component communication.
