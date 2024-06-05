# Figma Code Connect for @carbon/react

> [!WARNING]  
> Figma [Code Connect](https://github.com/figma/code-connect) is currently in
> beta and integration with Carbon React is in an exploratory phase.

Code Connect offers a solution for linking the
[Carbon v11 All themes](https://carbondesignsystem.com/designing/kits/figma/)
Figma library components directly to their counterparts inside of @carbon/react.
By incorporating Code Connect into your workflow, Figma's Dev Mode will display
actual code snippets from Carbon React.

Not only does Code Connect establish connections between component definitions,
but it also facilitates the mapping of properties from Carbon React code to
Figma. This capability enables the creation of dynamic and accurate examples,
promoting consistency across both design and engineering.

## Conecting components

You will need a Figma license with dev mode to work on code connect within
Carbon.

To connect your first component go to Dev Mode in Figma and right-click on the
component you want to connect, then choose `Copy link to selection` from the
menu. Make sure you are copying the link to a main component and not an instance
of the component.

```sh
npx figma connect create "https://..."
```
