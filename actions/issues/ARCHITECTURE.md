<!--
  Purpose: Maintainer-oriented map of the issue action's event, plugin, token,
  and managed-comment contracts. Update this when the plugin lifecycle changes.
-->

# Issues action

## Overview

The issues action is responsible for issue metadata, automated comments, and
preliminary triage. The action is currently executed through
[`./src/run.js`](./src/run.js).

This entrypoint will load up the plugins available from the
[`plugins` directory](./src/plugins) and run them for the given workflow events.
The most relevant events include the following:

```yml
on:
  issues:
    types: [opened, edited, labeled, unlabeled, typed]
```

## Plugins

Each triage process is separated into a `plugin`. A plugin takes on the
following shape:

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
[`./src/conditions.js`](./src/conditions.js), including issue opened, typed,
labeled, and unlabeled events.

When a `plugin` is run, it is given the `context` for the action, along with an
optional instance of `octokit` to use for API requests. A plugin can do any
operations needed during its lifecycle to the issue in question.

The registered plugins initialize formal Bug metadata, manage contribution
comments, and run Bob's preliminary triage for newly opened formal Bugs. GitHub
API operations use the Carbon Automation token. Bob receives only its API key
and returns text; the action validates that text before the Carbon Automation
client posts it.

## Managed comments

[`./src/manage-comment.js`](./src/manage-comment.js) identifies an automated
comment by a hidden header and supports `replace`, `append`, `create`, `ignore`,
`delete`, and `collapse`. Create, update, and delete use the issue-comment REST
API. Collapse uses the GraphQL `minimizeComment` mutation, and ignore makes no
API call.
