# Deploying Changes

Part of our review process involves creating live staging links for Pull Requests. Ideally, this process should be automated but in the meantime here is a brief outline of how to create staging links for `carbon-components`.

## IBM Cloud

We use [Cloud Foundry](https://www.cloudfoundry.org/) on IBM Cloud to deploy our staging environment. You can find the specific [manifest.yml](../manifest.yml) which configures the deployment itself at the root of the project.

You can deploy to Cloud Foundry on IBM Cloud by making sure you've created an account and by downloading and installing the [IBM Cloud CLI](https://console.bluemix.net/docs/cli/index.html). After this is downloaded, you can use `ibmcloud cf` to invoke commands for Cloud Foundry.

_Note: you can also use the `cf` utility directly if you prefer._

Once you have the CLI installed, you'll just need to login to your personal account using `ibmcloud login`. If you are an IBMer, make sure to pass in the `--sso` flag to login with SSO!

After going through the login process, you'll need to use `ibmcloud cf target` to choose the specific Cloud Foundry organization and space that you'll want to deploy to.

Once you've selected the appropriate organization and space, the last thing you'll need to run is `ibmcloud cf push` in the root of the project. This command will read from the `manifest.yml` file and deploy our development environment to a `random-route` on IBM Cloud.

To create a link to embed in your Pull Request, you can navigate to the component that you're working on and click "View full render". This link should take you to a URL that displays only that component. Depending on the type of Pull Request you're working on, this should be your best best for a live URL to share with reviewers.
