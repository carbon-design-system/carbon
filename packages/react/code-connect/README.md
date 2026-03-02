# Figma Code Connect for @carbon/react

> [!WARNING]  
> Figma [Code Connect](https://github.com/figma/code-connect) for Carbon React
> is in an exploratory phase.

Code Connect offers a solution for linking the
[Carbon v11 All themes](https://carbondesignsystem.com/designing/kits/figma/)
Figma library components directly to their counterparts inside of
`@carbon/react`. By incorporating Code Connect into your workflow, Figma's Dev
Mode will display actual code snippets from Carbon React.

Not only does Code Connect establish connections between component definitions,
but it also facilitates the mapping of properties from Carbon React code to
Figma. This capability enables the creation of dynamic and accurate examples,
promoting consistency across both design and engineering.

## Connecting components

To work on Code Connect within Carbon, you’ll need a Figma editor license. If
you only need to view code snippets, you’ll just need a Dev Mode license.

Follow the
[documentation](https://github.com/figma/code-connect/blob/main/cli/README.md#basic-setup)
to connect a new component, or edit an existing config.

Config files for each component currently live within the react package inside
the code-connect folder. Eventually these will live alongside the component code
and/or be integrated with Storybook code.

```sh
"packages/src/react/code-connect/ComponentName/ComponentName.figma.tsx"
```

## Demo Figma File

A
[demo Figma file](https://www.figma.com/design/NwXsMCCoMg1po4KK2oUK3o/Code-connect-demo---Carbon-Design-System?node-id=612-252440&m=dev)
is available to help test and add new components while working with Code
Connect:

### Publishing

Figma code connect is set up to automatically publish when PRs are merged into
the `main` branch. If you need to test publishing while working locally you will
need to follow the
[documentation](https://github.com/figma/code-connect/blob/main/cli/README.md#publishing)
and create your own `FIGMA_ACCESS_TOKEN` variable.

```sh
npx figma connect publish --token <token>
```

You can also publish a specific component directory instead of the entire set:

```sh
npx figma connect publish --dir packages/react/code-connect/tabs
```
