# DNS

> This documentation covers the ways we set DNS for our website

## Website

We use GitHub Pages to publish our website and make this website available under
https://carbondesignsystem.com.

In order to do so, we have the following checklist in terms of what the project
must do on GitHub along with the DNS configuration through our DNS provider.

**Checklist**

- The GitHub repository has enabled GitHub Pages
- The repository has published the site under the `gh-pages` branch
- The `gh-pages` branch has a CNAME record for `carbondesignsystem.com`
- The DNS provider has A records for the apex domain
  - [IP Addresses for GitHub Pages](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site#configuring-an-apex-domain)
- The DNS provider has a CNAME record that points to
  carbon-design-system.github.io

**Links & Resources**

- https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site#configuring-an-apex-domain-and-the-www-subdomain-variant
- https://github.blog/changelog/2021-04-08-github-pages-can-now-automatically-secure-the-www-variant-of-your-custom-domain/
