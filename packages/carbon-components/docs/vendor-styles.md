# Vendor Styles

While we are building towards our Carbon v10 (X) release, we are including some
additional packages in a `vendor` folder from a new project called
[Carbon Elements](https://github.com/IBM/carbon-elements). The goal of these
elements is to be the code companion for the updated IBM Design Language.

However, if we use these packages directly then we risk breaking consumers who
do not have their `node-sass` setup in a way to resolve module imports. As a
result, we have a script `tools/copy-vendor-styles.sh` that will automatically
copy over all Carbon Elements packages into `src/styles/vendor` so that we can
import these modules in our project without breaking existing consumers.

When Carbon Elements is finalized, and Carbon X is released, we can change to
importing these directly if the corresponding `node-sass` documentation is
provided for consumers.

## Usage

There is a script called `copy-vendor-styles.sh` that you can run by doing:

```bash
./tools/copy-vendor-styles.sh
```

Often times this is ran after updating our Carbon Elements dependencies so that
we can get the latest code from this project. You can update these packages
under `devDependencies` in `package.json`.
