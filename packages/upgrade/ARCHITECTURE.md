# Architecture

## Overview

- CLI with Yargs
- CLI interfaces with pre-defined actions
  - We do not end-to-end

It's complicated doing end-to-end testing of a CLI. It's challenging to figure
out how to pass messages between the subprocess and the test process reliably.

As a result, this is built using a shell pattern where the CLI interops with
specific commands that are able to tested out side of a CLI environment.
