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
  githubTokenInput?: string;
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
comments, and run Bob's preliminary triage for newly opened or newly typed
formal Bugs. Carbon Automation is the default GitHub client. The Bob plugin
declares the optional-at-the-action-boundary `BOB_GITHUB_TOKEN`; the plugin
runner requires it only after Bob's event and formal-Bug conditions pass, so
only Bob's managed triage comment uses the Bob Automation client. Before
invoking Bob, the plugin checks for its hidden comment header and skips an issue
it already assessed. The Bob CLI receives only its API key and returns text; it
receives neither GitHub token. That inference credential is passed through the
`BOB_INFERENCE_API_KEY` action input, then mapped to Bob Shell's required
`BOBSHELL_API_KEY` child-process environment variable. Bob runs with debug mode
and newline-delimited structured output. The plugin logs lifecycle events, tool
names, byte counts, one-minute heartbeats, exit information, and a sanitized
stderr tail. Structured model messages, tool parameters, and tool results are
discarded rather than copied into Actions logs.

Carbon Automation initializes issue fields and Project 39 metadata, so its
GitHub App installation needs Issues and Issue fields write access plus
Organization Projects read-and-write access. The workflow does not narrow the
Carbon token's permissions; it inherits the permissions approved on the App
installation. Project 39's own workflow automation is the sole owner of project
membership. The plugin never issues an add-item mutation; it performs bounded
retries until the auto-added item is visible, then fills only empty Area and
Effort fields. If membership never becomes visible or a field update fails, the
log points maintainers to both the project workflow and the App's Organization
Projects permission.

The workflow queues all events for an issue in one concurrency group instead of
allowing a newer pending delivery to replace an older one. Bob token creation is
limited to eligible Bug events and may fail without stopping Carbon-backed
plugins; the eligible Bob plugin then records the missing dedicated token and
keeps the workflow failure visible.

## Managed comments

[`./src/manage-comment.js`](./src/manage-comment.js) identifies an automated
comment by a hidden header and supports `replace`, `append`, `create`, `ignore`,
`delete`, and `collapse`. Create, update, and delete use the issue-comment REST
API. Collapse uses the GraphQL `minimizeComment` mutation, and ignore makes no
API call.
