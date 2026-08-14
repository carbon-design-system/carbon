# Purpose: Package the issue-triage Node action and the pinned Bob CLI into one
# reproducible Docker action image.
FROM node:24-slim

# Pin both the Bob release and archive checksum so an upstream replacement
# cannot silently change the executable used by triage.
ARG BOB_SHELL_VERSION=1.0.6
ARG BOB_SHELL_SHA256=6ec51abec4251d41ec45709030988b90baa659f535fc8d14dd003023dd163a5b

WORKDIR /usr/src/action
COPY . .
# curl downloads Bob during the image build; sha256sum verifies it before the
# global install. Runtime dependencies are installed without dev packages.
RUN apt-get update \
  && apt-get install --yes --no-install-recommends ca-certificates curl \
  && bob_shell_archive="/tmp/bobshell-${BOB_SHELL_VERSION}.tgz" \
  && curl --fail --silent --show-error --location \
    --output "${bob_shell_archive}" \
    "https://s3.us-south.cloud-object-storage.appdomain.cloud/bob-shell/bobshell-${BOB_SHELL_VERSION}.tgz" \
  && echo "${BOB_SHELL_SHA256}  ${bob_shell_archive}" | sha256sum --check - \
  && npm install --global "${bob_shell_archive}" \
  && test "$(bob --version)" = "${BOB_SHELL_VERSION}" \
  && rm "${bob_shell_archive}" \
  && rm -rf /var/lib/apt/lists/* \
  && npm install --omit=dev
ENTRYPOINT ["node", "/usr/src/action/src/run.js"]
