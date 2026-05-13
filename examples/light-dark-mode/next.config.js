/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  turbopack: {
    root: __dirname,
  },
  sassOptions: {
    quietDeps: true,
  },
};

module.exports = nextConfig;
