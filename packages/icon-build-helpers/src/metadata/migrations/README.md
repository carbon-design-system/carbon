# Migrations

These are scripts that have been run to migrate metadata information from one
format to another. They are kept in this directory as a running history of
modifications that have been made to metadata files on a specific date.

These migrations are run from the command line using `node`. For example:

```bash
# From packages/icons
node ../icons-build-helpers/src/metadata/migrations/2020-01-27.js
```
