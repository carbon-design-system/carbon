# `icons-react/examples/create-react-app`

This example was created using
[`create-react-app`](https://github.com/facebook/create-react-app) and
demonstrates basic usage of
[`@carbon/icons-react`](https://github.com/IBM/carbon-elements/tree/master/packages/icons-react).

After bootstrapping this example using `create-react-app`, the following
dependencies were added through the command:

```
yarn add carbon-components@next carbon-components-react@next @carbon/icons-react node-sass
```

### Usage

To run this example, install its dependencies by running `yarn install` followed
by `yarn start`.

### Notes

The following only pertains to using `create-react-app` in a monorepository
(e.g. yarn workspaces) like
[`carbon-elements`](https://github.com/IBM/carbon-elements).

The following changes were required to make this example work:

The `package.json` specifies yarn to not hoist `babel-eslint` for this child
project. This is because `react-scripts` requires an older version of
`babel-eslint` (v9) compared to the one this project consumes (v10).

Additionally, an `.env` file was created with `SKIP_PREFLIGHT_CHECK=true` to
skip the `react-scripts` preflight check when starting the app.
