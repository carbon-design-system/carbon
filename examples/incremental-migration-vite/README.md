## Incremental migration

We have recently released a new version, v11, of our component library and a
common question we receive is if users can adopt v11 incrementally and the
answer is yes! If the burden of migrating to v11 is too big to take on all at
once, but there are features of our latest release you want to take advantage
of, it is likely that you can pull in just the parts you are wanting to use
while keeping the rest of your Carbon usage the same.

This example illustrates how v11 and v10 work together.

## Getting Started

First, run `yarn build` in the root of the `carbon` repository.

```sh
yarn install && yarn build
```

Now, all you need to do is `cd` into the directory and run:

```sh
yarn install
# or
npm install


yarn dev
# or
npm run dev
```

This example only takes a little bit of time to start, once it's up and running,
it's very fast.

Open [http://localhost:5173](http://localhost:5173) with your browser to see the
result.

## Sass

First and foremost, if you want to use v11 styles in any capacity, you'll have
to migrate to use `dart-sass`. `node-sass` has been deprecated and we migrated
to `dart-sass` in v11. For more information about migrating, visit our docs
[here](https://github.com/carbon-design-system/carbon/blob/main/docs/migration/v11.md#changing-from-node-sass-to-sass).

## V10 and V11

This example is mainly v10, but it takes advantage of the new Stack component
from v11 and uses v11's StructuredList component 🎉. StructuredList had a major
accessibilty revamp in v11 that you might want to use and this examples shows
you how.
