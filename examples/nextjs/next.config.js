/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    quietDeps: true,
  },
  transpilePackages: ['@carbon/react'],
};

module.exports = nextConfig;
