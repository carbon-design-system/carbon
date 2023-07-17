This is a [Next.js](https://nextjs.org/) project bootstrapped with
[`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

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

Open [http://localhost:5173](http://localhost:5173) with your browser to see the
result.

You can start editing the page by modifying `pages/index.js`. The page
auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on
[http://localhost:3000/api/hello](http://localhost:3000/api/hello). This
endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are
treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead
of React pages.

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

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js
  features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out
[the Next.js GitHub repository](https://github.com/vercel/next.js/) - your
feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the
[Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)
from the creators of Next.js.

Check out our
[Next.js deployment documentation](https://nextjs.org/docs/deployment) for more
details.
