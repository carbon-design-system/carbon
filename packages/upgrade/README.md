# carbon-upgrade

> \[Experimental] A tool for upgrading Carbon versions

## Getting started

To install `carbon-upgrade` in your project, you will need to run the following
command using [npm](https://www.npmjs.com/):

```bash
npm install -S carbon-upgrade
```

If you prefer [Yarn](https://yarnpkg.com/en/), use the following command
instead:

```bash
yarn add carbon-upgrade
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

## 🙌 Contributing

We're always looking for contributors to help us fix bugs, build new features,
or help us improve the project documentation. If you're interested, definitely
check out our [Contributing Guide](/.github/CONTRIBUTING.md)! 👀

## 📝 License

Licensed under the [Apache 2.0 License](/LICENSE).
