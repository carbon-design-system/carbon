# @carbon/upgrade

> A tool for upgrading projects that use Carbon

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
npx @carbon/upgrade -d
```

Below is a full output of the options and commands available:

```bash
Usage: @carbon/upgrade [options]

Options:
      --help     Show help                                             [boolean]
      --version  Show version number                                   [boolean]
      --force    force execution if the cli encounters an error while doing
                 safety checks                        [boolean] [default: false]
  -w, --write    update the files with changes found by running the migration
                                                                [default: false]
  -v, --verbose  optionally include additional logs, useful for debugging
                                                      [boolean] [default: false]
```

## 🙌 Contributing

We're always looking for contributors to help us fix bugs, build new features,
or help us improve the project documentation. If you're interested, definitely
check out our [Contributing Guide](/.github/CONTRIBUTING.md)! 👀

## 📝 License

Licensed under the [Apache 2.0 License](/LICENSE).
