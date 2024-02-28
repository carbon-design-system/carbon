# @carbon/cli

> Task automation for working with the Carbon Design System

## Getting started

To install `@carbon/cli` in your project, you will need to run the following
command using [npm](https://www.npmjs.com/):

```bash
npm install -S @carbon/cli
```

If you prefer [Yarn](https://yarnpkg.com/en/), use the following command
instead:

```bash
yarn add @carbon/cli
```

## Usage

You can install `@carbon/cli` in your project, or use a tool like
[`npx`](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b)
by running the following command in your project:

```bash
npx @carbon/cli --help
```

The output of the `--help` option is:

```bash
Usage: @carbon/cli [options]

Commands:
  cli ci-check              run CI checks
  cli contribute <command>  get started contributing with Carbon
  cli publish <tag>         publish packages that have different versions from
                            the package registry
  cli release [bump]        run the release step for the given version bump
  cli sync [target]         sync files across workspaces

Options:
  --help     Show help                                                 [boolean]
  --version  Show version number                                       [boolean]
```

## 🙌 Contributing

We're always looking for contributors to help us fix bugs, build new features,
or help us improve the project documentation. If you're interested, definitely
check out our [Contributing Guide](/.github/CONTRIBUTING.md)! 👀

## 📝 License

Licensed under the [Apache 2.0 License](/LICENSE).

## <picture><source height="20" width="20" media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/ibm-telemetry/telemetry-js/main/docs/images/ibm-telemetry-dark.svg"><source height="20" width="20" media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/ibm-telemetry/telemetry-js/main/docs/images/ibm-telemetry-light.svg"><img height="20" width="20" alt="IBM Telemetry" src="https://raw.githubusercontent.com/ibm-telemetry/telemetry-js/main/docs/images/ibm-telemetry-light.svg"></picture> IBM Telemetry

This package uses IBM Telemetry to collect metrics data. By installing this
package as a dependency you are agreeing to telemetry collection. To opt out,
see
[Opting out of IBM Telemetry data collection](https://github.com/ibm-telemetry/telemetry-js/tree/main#opting-out-of-ibm-telemetry-data-collection).
For more information on the data being collected, please see the
[IBM Telemetry documentation](https://github.com/ibm-telemetry/telemetry-js/tree/main#ibm-telemetry-collection-basics).
