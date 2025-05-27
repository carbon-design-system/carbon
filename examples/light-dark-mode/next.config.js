/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@carbon/feature-flags', '@carbon/react'],
  experimental: {
    esmExternals: 'loose',
  },
};

module.exports = nextConfig;
