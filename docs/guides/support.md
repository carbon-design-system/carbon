# Carbon core support and maintenance

## Overview

Ongoing support for Carbon latest and previous version (which will be
prioritized in that order)

### What does "ongoing support" mean?

- Incoming pull requests (code review, initial communication, ongoing
  discussion, rejection or merge) from the community (i.e. not from the core
  team)
- Triage and shepherd issues to close. Answer questions and help our users find
  solutions to their problems
- Does not include feature enhancements or new feature requests, which currently
  fall under https://github.com/orgs/carbon-design-system/projects/8 (as of
  4/30/19)

### What repositories do we support?

- carbon-components
- carbon-components-react
- carbon-website
- carbon-elements

## Issues

When our users want to submit a new issues to one of our repositories they're
presented with the option to select from one of four templates. These templates
ask a series of specific questions that make first-aid and triage go smoothly.
They help us help them.

_If the user hasn't taken the time to fill out one of our templates feel free to
ask them to do so. Typically you'll need at least a good description of the
problem, a walkthrough of how to recreate the problem and a minimal test case to
observe the problem happening. That last one can be a real sticking point, but
there's lots of work to do and many many issues to triage — the onus is on them
to clearly define the issue their having._

### Types of issues

Using these templates also helps Project-Bot automatically move issues and new
pull requests to the right workstreams by auto labeling the issues according to
the template type. There are three types of issues The Support and Maintenance
team are concerned with:

- type: a11y ♿
- type: question ❓
- type: bug 🐛

### Triaging a new issue

Triage is the process of determing the severity and priority of issues _as they
come in_. We need to make sure we know how serious a problem is and how quickly
it should be addressed.

### Severity

There are 4 levels of severity for issues in the Carbon core repositories:

- Severity 1- "_Affects major functionality, no workaround"_
- Severity 2 - "_Affects major functionality, has a workaround"_
- Severity 3 - "_Affects minor functionality, has a workaround"_
- Severity 4 - "_Affects minor functionality, no workaround needed"_

As you can see these severity levels describe two stages of broken
functionality:

- Major - major functionality is critical to the user completing the task.
  Whatever has gone wrong has made it impossible for the user to successfully
  complete their task or action.

  _Examples of major functionality failing are menu's not opening, lack of
  keyboard accessibility, poor contrast, or broken builds_

- Minor - minor functionality isn't critical to the user completing the task,
  but might make task completion frustrating or difficult.

  _Examples of minor functionality failures are components lacking proper
  styling, a SVG arrow pointing the wrong direction, or the wrong grid being
  applied at a certain breakpoint_

These can be difficult (and vague!) concepts to wrap your head around. So here's
a handy flow chart to guide you through assigning issue severity:

```
                        There is a bug!
                              |
                  Can the user complete the task?
                  /                            \
                "no"                           "yes"
                 |                               |
       Is there someway to                 Does the bug have
       complete the task?                  a workaround?
        /           \                      /           \
     "no"          "yes"                "yes"      "none needed"
       |             |                    |              |
 +-------------+  +-------------+    +-------------+  +-------------+
 | severity: 1 |  | severity: 2 |    | severity: 3 |  | severity: 4 |
 +-------------+  +-------------+    +-------------+  +-------------+
```

### Priority

An issue's priority talks about the _scope_ of the issue. How many people does
the problem effect? There are three tiers:

- Priority: high - _"Defect affects all users"_
- Priority: medium - _"Defect affects many users"_
- Priority: low - _"Defect affects one or a few users"_

These three issues help us prioritize _when_ we resolve these issues. High
priority issues should happen as soon as possible, medium priority within the
next few chunks of work, and low priority issues happening someday _(but still
definitely happening — if the issue doesn't merit working on in the foreseeable
future no label is needed because the issue should be closed)_.

### Other labels

There are a whole host of labels that can help communicate the nature of an
issue at a glance to developers and designers. Here's a few that you might add
that can be particularly helpful:

- v9 - any issue or question pertaining to legacy versions of Carbon Components
  should be tagged v9
- good first issue 👋 - these issues don't require a deep knowledge or
  understanding of our code base and would be great for someone looking to help
  out for the first time with some code
- status: needs first aid - if you have a general _feeling_ for the severity and
  priority of an issue, but can tell it requires a skillful eye to better grasp
  the true scope of the work this is a great label to add

### Alerting a team or subject matter expert

Sometimes an issue comes in that is highly technical or about subject matter
you're unfamiliar with. Nothing wrong with that! Using Github ping system you
can alert specific sub-teams on Carbon:

- @carbon-design-system/design
- @carbon-design-system/developers
- @carbon-design-system/ibma

Using any of these @'s in a comment will send notifications to members of those
sub-teams. Typically a subject matter expert from that team will then take over.
You can also just @username anyone Carbon's team if you specifically know
someone who has experience with a particular component or issue.

## Pull requests

A good turn around time on pull requests to Carbon's core repositories looks
professional and encourages our users to contribute and work with us to solve
further problems in the future. Shepherding pull requests to merged status isn't
typically _as complex_ as issue triage/tracking, but it's equally important!

### WIP, RFC, and Draft pull requests

If the pull request is a WIP (work in progress), RFC (request for comment), or
Draft then it can be moved to the appropriate swimlane. There are usually a fair
few of these active at a time and don't need the same regard as an _external_
pull requets, but they can be helpful to reference when a Work In Progress pull
request addresses an issue and the maker of that issue asks for a status report
or update (a common occurance).

### Pull requests with failing tests or merge conflicts

When a new pull request comes in check and make sure our continuous integration
system (Circle CI) doesn't have any failing tests or merge conflicts, if it does
label it accordingly. Then politely ask the pull request maker to fix it.

### Pull Request Reviews

If you notice a pull request languishing without a review for too long. Post in
the carbon-core/carbon-devs channel asking for a review. Ideally pull requests
should have a three business day turn around time on reviews or requested
changes.
