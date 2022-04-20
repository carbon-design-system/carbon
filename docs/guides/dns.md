# DNS

> This documentation covers the ways we set DNS for our website

## Website

- Publish to GitHub under the `gh-pages` branch
- Enable through GitHub settings
- CNAME record for apex domain should exist in `gh-pages` branch
- DNS on Cloudflare
  - Configure the apex domain by setting A records
  - Configure the www domain by adding a CNAME record

**Links & Resources**

- https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site#configuring-an-apex-domain-and-the-www-subdomain-variant
- https://github.blog/changelog/2021-04-08-github-pages-can-now-automatically-secure-the-www-variant-of-your-custom-domain/
