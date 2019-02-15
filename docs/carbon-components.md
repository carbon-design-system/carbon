# Carbon Components

> Tips & tricks for working with styles out of `carbon-components`

While working on components in `carbon-components-react`, it may be helpful to
open up `carbon-components` so that you can edit styles and see them appear in
the React.js Storybook for your component. In order to do that, you'll need to
follow these steps:

When in the directory of your `carbon-components` folder, run the following
command:

```bash
yarn link
```

You should see a success message similar to:

```bash
success Registered "carbon-components".
info You can now run `yarn link "carbon-components"` in the projects where you want to use this package and it will be used instead.
```

Now, go to the folder where `carbon-components-react` is located and run:

```bash
yarn link carbon-components
```

You should see a success message similar to:

```bash
success Using linked package for "carbon-components".
```

The `yarn link` command will allow us to point the `carbon-components` package
under `node_modules` to the folder on our filesystem. So, if we make a change in
`carbon-components` and re-compile the project it will update in the Storybook
environment for `carbon-components-react`.

In addition, if you would like to have your changes to styles automatically
compile and update Storybook you can run the following command in the
`carbon-components` folder on your machine:

```bash
yarn gulp watch -s
```

This will execute the `watch` command in `gulpfile.js`. As a result, whenever
you make a change to the project styles it will automatically copy over into the
`scss` folder which Storybook uses in `carbon-components-react`.
