module.exports = {
  siteMetadata: {
    title: 'Carbon Design System',
    description: 'A Gatsby theme for the carbon design system',
    keywords: 'gatsby,theme,carbon',
  },
  plugins: [
    'gatsby-theme-carbon',
    {
      resolve: 'gatsby-plugin-compile-es6-packages',
      options: { modules: ['@carbon/addons-website'] },
    },
  ],
};
