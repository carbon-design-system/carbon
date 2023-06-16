<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

## Table of Contents

- [Overview](#overview)
- [Dev Sprint Plannning](#dev-sprint-plannning)
  - [Process](#process)
    - [Dev Sprint Planning Meeting](#dev-sprint-planning-meeting)
      - [Previous to meeting](#previous-to-meeting)
      - [In meeting](#in-meeting)
    - [System Squad Sprint Planning Meeting](#system-squad-sprint-planning-meeting)
      - [Previous to meeting](#previous-to-meeting-1)
      - [In meeting](#in-meeting-1)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Overview

Sprint Planning is a ritual that happens once a sprint during the second week of
the sprint in order to prepare for the next upcoming sprint. The purpose is to
determine the work items that will be completed in the following sprint and who
is responsible for each of these work items.

## Dev Sprint Plannning

Participating developers in the Design System take turns leading the sprint
planning sessions in a rotational matter per sprint as defined in the
[Sprint Planning Rotation](https://github.com/carbon-design-system/carbon/wiki/Sprint-Planning-Rotation).
The Sprint lead is responsible for preparing the sprint, running the sprint
planning meeting and presenting the sprint plan to the wider team, these steps
are outlined below.

### Process

During sprint planning, the team will go through the following checkpoints:

| Checkpoint                                                                    | Description                                                                                                                                       |
| :---------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------ |
| [Dev Sprint Planning Meeting](#dev-sprint-planning-meeting)                   | Load up the dev sprint in [Github Project](https://github.com/orgs/carbon-design-system/projects/39) with the sprint items and assign accordingly |
| [System Squad Sprint Planning Meeting](#system-squad-sprint-planning-meeting) | Playback the sprint plan along with design leader to the wider team, identify and correct any issues                                              |

#### Dev Sprint Planning Meeting

This meeting occurs on the second Thursday of a sprint at 11-11:30 CT and is in
preparation for the upcoming sprint, which starts the following Monday. This is
where the sprint board is loaded with work items and issues are assigned to
devs.

##### Previous to meeting

- [ ] Review the backlog of items to get a general understanding of the work
      that can/needs to be picked up, this includes:
  - [ ] Features/Enhancements in the
        [ready to be picked up](https://github.com/orgs/carbon-design-system/projects/39/views/86)
        project board.
  - [ ] The standing list of
        [support issues](https://github.com/carbon-design-system/carbon/issues?q=is%3Aopen+is%3Aissue+label%3A%22severity%3A+2%22),
        prioritizing `Sev1`s and `Sev2`s.
  - [ ] Umbrella issues that are planned for the
        [current quarter](https://github.com/orgs/carbon-design-system/projects/39/views/28?filterQuery=label%3Aepic%2C%22planning%3A+umbrella%22+milestone%3A%222023+Q2%22)
        (remember to adjust filter): Review the current state of the umbrella
        issues planned for the quarter and see what is unblocked and can be
        added onto the next sprint or what can be closed out next sprint.
- [ ] You may choose to pre-fill the
      [next sprint](https://github.com/orgs/carbon-design-system/projects/39/views/13)
      board with items you find or add them later after discussing with the team
      during the sprint planning meeting.

##### In meeting

- [ ] Share your screen on the
      [current sprint](https://github.com/orgs/carbon-design-system/projects/39/views/12)
      project board.
- [ ] Go over all dev items that do not have a status of "done" with the
      assigned developer and carry over to the next sprint any items necessary.
- [ ] Move focus to the
      [next sprint](https://github.com/orgs/carbon-design-system/projects/39/views/13)
      project board.
- [ ] Add draft "Release v11.x (and v10.x if necessary)" issue:
  - [ ] Area: Support
  - [ ] Effort: 3
  - [ ] Role: Dev
  - [ ] Status: Backlog
  - [ ] Assignees: Check who is next on
        [release rotation](https://github.com/carbon-design-system/carbon/wiki/Release-rotation),
        should be 2 devs
- [ ] Add draft "Dev Sprint Planning" issue:
  - [ ] Area: Support
  - [ ] Effort: 1
  - [ ] Role: Dev
  - [ ] Status: Backlog
  - [ ] Assignee: Check who is next on
        [sprint planning rotation](https://github.com/carbon-design-system/carbon/wiki/Release-rotation),
        should be 1 dev
- [ ] Add draft "Developer PR Reviews" issue:
  - [ ] Area: Support
  - [ ] Effort: 5x number of developers working in the upcoming sprint, adjust
        accordingly to OOO or away missions
  - [ ] Role: Dev
  - [ ] Status: Backlog
  - Assignees: All devs who will be working in the upcoming sprint
- [ ] Add draft "Design PR Reviews" placeholder issue:
  - [ ] Area: Support
  - [ ] Effort: leave empty, will be filled by design
  - [ ] Role: Design
  - [ ] Status: Backlog
- [ ] Assign any unassigned issues that are loaded up on the board already.
- [ ] Bring in new items and assign them as necessary from:

  - The
    [ready to be picked up](https://github.com/orgs/carbon-design-system/projects/39/views/86)
    project board.
  - The standing list of
    [support issues](https://github.com/carbon-design-system/carbon/issues?q=is%3Aopen+is%3Aissue+label%3A%22severity%3A+2%22),
    prioritizing `Sev1`s and `Sev2`s.
  - Other items you might have identified from the
    [previous to meeting](#previous-to-meeting) section.

  You generally want to assign 1-2 support tickets and 1 feature per developer.
  You may choose to add some "nice to have" items into the sprint and leave them
  unassigned for devs to pick up if they finish their sprint early.

- [ ] Check the
      [Dev Velocity](https://github.com/orgs/carbon-design-system/projects/39/insights/6)
      chart and make sure the sprint is not under or overplanned and adjust
      accordingly. You generally want to get as close to the previous sprints
      without going over.
- [ ] Make sure all devs feel good about the sprint plan and no one feels
      under/overloaded before closing out the meeting.

#### System Squad Sprint Planning Meeting

This meeting occurs on the first Monday of a sprint, 10-10:30 CT. During this
meeting the sprint leader plays back the current sprint plan to the wider team.

##### Previous to meeting

- [ ] Review the previous sprint board and carry over any items that didn't make
      it before the sprint closed out.
- [ ] Review the
      [current sprint](https://github.com/orgs/carbon-design-system/projects/39/views/12?filterQuery=sprint%3A%40current+role%3ADev%2C%22Cross-discipline%22)
      board and make sure everything looks correct, make any last minute
      adjustments.

##### In meeting

- Share your screen on the
  [current sprint](https://github.com/orgs/carbon-design-system/projects/39/views/12?filterQuery=sprint%3A%40current+role%3ADev%2C%22Cross-discipline%22)
  board and go over all the dev items that will be worked on this sprint, design
  will share their own updates.
- Answer any questions
- Make any necessary adjustments
