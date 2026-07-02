# Issues action

## Overview

The issues action is responsible for adding appropriate labels during the triage
process. The action is currently executed through
[`./src/run.js`](./src/run.js).

This entrypoint will load up the plugins available from the
[`plugins` directory](./src/plugins) and run them for the given workflow events.
The most relevant events include the following:

```yml
on:
  issues:
    types: [opened]
  issue_comment:
    types: [created]
```

## Plugins

Each process for adding labels is separated out into a `plugin`. A plugin takes
on the following shape:

```ts
interface ActionPlugin {
  name: string;
  conditions?: [ActionPluginCondition];
  run: (context: GitHubActionContext, octokit: Octokit) => Promise<void>;
}

interface ActionPluginCondition {
  key: string;
  run: (context: GitHubActionContext, octokit: Octokit) => Promise<void>;
}
```

Each `plugin` may specify a set of `conditions` that must be true for the plugin
to run. Common conditions are available in
[`./src/conditions.js`](./src/conditions.js), including:

- Only run when an issue is open
- Only run when a comment is created
- Only run when an issue has a specific label

When a `plugin` is run, it is given the `context` for the action, along with an
optional instance of `octokit` to use for API requests. A plugin can do any
operations needed during its lifecycle to the issue in question.
