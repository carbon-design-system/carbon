# @carbon/cra-template

This is the official Carbon Design System template for
[Create React App](https://github.com/facebook/create-react-app).

## Usage

To use this template, add `--template @carbon` when creating a new app.

For example:

```
npx create-react-app my-app --template @carbon

# or

yarn create react-app my-app --template @carbon
```

For more information, please refer to:

- [Getting Started](https://create-react-app.dev/docs/getting-started) – How to
  create a new app.
- [User Guide](https://create-react-app.dev) – How to develop apps bootstrapped
  with Create React App.

## Prerequisites

A GitHub personal access token (PAT) is required for the example `/repopage` to
be able to fetch repository data.

1. [Create a personal access token in GitHub](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)
2. Create an `.env` file in the root directory
3. Add the token to the `.env` file

```
REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN=xxx
```
