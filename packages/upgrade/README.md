# @carbon/upgrade

> A tool for upgrading Carbon versions

## Getting started

To install `@carbon/upgrade` in your project, you will need to run the following
command using [npm](https://www.npmjs.com/):

```bash
npm install -S @carbon/upgrade
```

If you prefer [Yarn](https://yarnpkg.com/en/), use the following command
instead:

```bash
yarn add @carbon/upgrade
```

## Usage

You can install `@carbon/upgrade` in your project, or use a tool like
[`npx`](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b)
by running the following command in your project:

```bash
npx @carbon/upgrade
```

Below is a full output of the options and commands available:

```bash
Usage: @carbon/upgrade [options]

Commands:
  @carbon/upgrade upgrade                   upgrade your project       [default]
  @carbon/upgrade migrate <migration>       run a Carbon migration on your
  [paths...]                                source files
  @carbon/upgrade migrate list              list all available migrations

Options:
      --help     Show help                                             [boolean]
      --version  Show version number                                   [boolean]
      --force    force execution if the cli encounters an error while doing
                 safety checks                        [boolean] [default: false]
  -w, --write    update the files with changes found by running the migration
                                                      [boolean] [default: false]
  -v, --verbose  optionally include additional logs, useful for debugging
                                                      [boolean] [default: false]
```

### Migrations

Included within the CLI are a number of migrations available to you to be ran on
your project's source files.

Migrations are automated scripts (codemods) ran using the
[jscodeshift](https://github.com/facebook/jscodeshift) runner, that will apply
intelligent transformations to your code.

These migrations range from simple automations like a find and replace of import
statements, to more sophisticated migrations that rewrite component prop usage,
configuration, and set up. The source of these migrations can be viewed within
the
[transforms folder](https://github.com/carbon-design-system/carbon/tree/main/packages/upgrade/transforms).
Each is tested against a series of test fixtures to ensure transforms are
predictable and consistently provide the intended output.

## 🙌 Contributing

If you have ideas on how we could make your migration experience easier, please
reach out by
[opening a new discussion](https://github.com/carbon-design-system/carbon/discussions/new).

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
