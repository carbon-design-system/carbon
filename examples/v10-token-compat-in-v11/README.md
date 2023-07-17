This is a [Next.js](https://nextjs.org/) project bootstrapped with
[`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## V10 token compatibility in V11

This application is an example of how to use V10 tokens inside of a Carbon V11
application. For the most part, no extra configuration is required. For the
Color tokens, you'll need to pull in the compatibility tokens like so:

```scss
@use '@carbon/react/scss/compat/theme';
```

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

Open [http://localhost:5173](http://localhost:5173) with your browser to see the
result.

## Sass

First and foremost, if you want to use v11 styles in any capacity, you'll have
to migrate to use `dart-sass`. `node-sass` has been deprecated and we migrated
to `dart-sass` in v11. For more information about migrating, visit our docs
[here](https://github.com/carbon-design-system/carbon/blob/main/docs/migration/v11.md#changing-from-node-sass-to-sass).

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js
  features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out
[the Next.js GitHub repository](https://github.com/vercel/next.js/) - your
feedback and contributions are welcome!
