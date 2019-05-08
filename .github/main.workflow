workflow "Deploy changed packages to Netlify" {
  on = "push"
  resolves = [
    "Deploy carbon-components to Netlify",
    "Deploy carbon-components-react to Netlify",
  ]
}

action "Check if carbon-components has changed" {
  uses = "netlify/actions/diff-includes@master"
  args = "packages/components"
}

action "Deploy carbon-components to Netlify" {
  needs = "Check if carbon-components has changed"
  uses = "netlify/actions/build@master"
  secrets = ["GITHUB_TOKEN", "NETLIFY_COMPONENTS_SITE_ID"]
  env = {
    NETLIFY_BASE = "packages/components"
    NETLIFY_DIR = "packages/components/demo"
  }
}

action "Check if carbon-components-react has changed" {
  uses = "netlify/actions/diff-includes@master"
  args = "packages/react"
}

action "Deploy carbon-components-react to Netlify" {
  needs = "Check if carbon-components-react has changed"
  uses = "netlify/actions/build@master"
  secrets = ["GITHUB_TOKEN", "NETLIFY_REACT_SITE_ID"]
  env = {
    NETLIFY_BASE = "packages/react"
    NETLIFY_DIR = "packages/react/storybook-static"
  }
}
