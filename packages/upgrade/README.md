# carbon-upgrade

[Experimental] A tool for upgrading Carbon versions (to v10): `npx carbon-upgrade`

## Getting started

`carbon-upgrade` is a tool that should be run at the root of your project. If
you're not sure where that is, most of the time this is where your
`package.json` file is located.

Once you find that folder, you can use the [`npx` tool](https://www.npmjs.com/package/npx)
to run the following commands in your terminal:

```bash
# Run carbon-upgrade in 'dry mode', which allows you to preview the changes
# before any files are changed.
npx carbon-upgrade --dry
```

If you would prefer to install the tool globally, you can run the following
command in your terminal using `npm`:

```bash
npm i carbon-upgrade -g
carbon-upgrade --dry
```

If you prefer [Yarn](https://yarnpkg.com/en/), use the following
command instead:

```bash
yarn global add carbon-upgrade
carbon-upgrade --dry
```

## Usage

```bash
Usage: carbon-upgrade [options]

Commands:
  carbon-upgrade                            run to upgrade your project[default]
  carbon-upgrade migrate <package> <from>   run a specific migration for a
  <to>                                      package

Options:
  --help        Show help                                              [boolean]
  --version     Show version number                                    [boolean]
  --verbose     display the full output while running a command [default: false]
  --dry, -d     view the result of running this command without changing any
                files                                           [default: false]
  --ignore, -i  provide a glob pattern for directories you would like ignored
                                                                   [default: ""]
```
