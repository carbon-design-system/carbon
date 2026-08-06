/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Consolidates the four retired contribution-comment workflows. Each rule
 * reacts only to the label transition that makes its message relevant, then
 * uses a hidden header to avoid duplicate comments on webhook reruns.
 */
import * as core from '@actions/core';
import { events, or } from '../conditions.js';
import { manageComment } from '../manage-comment.js';

const labels = {
  accepted: 'proposal: accepted',
  codeContribution: 'needs: code contribution',
  communityContribution: 'needs: community contribution',
  designContribution: 'needs: design contribution',
  enhancement: 'type: enhancement 💡',
  notPursuing: 'proposal: not pursuing',
};

// Keep legacy visible text unchanged so manageComment can adopt exact-match
// comments created before hidden headers were introduced.
const comments = {
  accepted: {
    header: '<!-- contribution-proposal-accepted -->',
    body: "The Carbon team has accepted this proposal! Our team doesn't have the capacity to work on this now, so we are requesting community contributors. Please see the labels for roles that are needed. If you are willing to help out, comment below and we will get in touch!",
  },
  enhancement: {
    header: '<!-- contribution-proposal-open -->',
    body: 'Thank you for submitting a feature request. Your proposal is open and will soon be triaged by the Carbon team.<br><br>If your proposal is accepted and the Carbon team has bandwidth they will take on the issue, or else request you or other volunteers from the community to work on this issue.',
  },
  notPursuing: {
    header: '<!-- contribution-proposal-not-pursuing -->',
    body: "Thank you for submitting your proposal. Unfortunately, it doesn't align with our roadmap or philosophy at this time. We value your contribution and encourage you to keep engaging with the community.",
  },
  ready: {
    header: '<!-- contribution-ready-to-be-worked -->',
    body: 'This issue is ready to be worked on. Volunteers, please feel free to join any of the [relevant meetups](https://carbondesignsystem.com/whats-happening/meetups/) to get guidance and feedback. We encourage you to bring any work in progress, no matter its state of completion. You can also ask any questions on Slack. For design questions, the best channels are: [#carbon-design-system](https://ibm-studios.slack.com/archives/C0M053VPT) and [#figma-guild](https://ibm-studios.slack.com/archives/C023WKW6J5U). For developer questions, the best channels are: [#carbon-react](https://ibm-studios.slack.com/archives/C2K6RFJ1G), [#carbon-web-components](https://ibm-studios.slack.com/archives/CL83LMKSA).',
  },
};

/** Test a normalized Set of current issue labels. */
function hasLabel(issueLabels, name) {
  return issueLabels.has(name);
}

/**
 * A labeled webhook includes the one label responsible for the event. Checking
 * it prevents unrelated future label changes from retriggering old messages.
 */
function isRelevantLabelEvent(action, eventLabel, names) {
  return action === 'labeled' && names.includes(eventLabel);
}

const plugin = {
  name: 'Manage contribution comments',
  conditions: [
    or(events.issues.opened, events.issues.labeled, events.issues.unlabeled),
  ],
  async run(context, octokit) {
    const { action, issue, label } = context.payload;
    const issueLabels = new Set((issue.labels ?? []).map(({ name }) => name));
    const eventLabel = label?.name;

    core.info(
      `[contributions] Evaluating issue #${issue.number}; action=${action}; eventLabel=${eventLabel ?? 'none'}`
    );
    core.info(
      `[contributions] Current labels: ${Array.from(issueLabels).join(', ') || 'none'}`
    );

    // Rules are data kept near the legacy message text, which makes workflow
    // parity easier to review without introducing a plugin abstraction per rule.
    const rules = [
      {
        name: 'enhancement proposal opened',
        comment: comments.enhancement,
        matches:
          (action === 'opened' && hasLabel(issueLabels, labels.enhancement)) ||
          isRelevantLabelEvent(action, eventLabel, [labels.enhancement]),
      },
      {
        name: 'accepted community proposal',
        comment: comments.accepted,
        matches:
          hasLabel(issueLabels, labels.accepted) &&
          hasLabel(issueLabels, labels.communityContribution) &&
          (action === 'opened' ||
            isRelevantLabelEvent(action, eventLabel, [
              labels.accepted,
              labels.communityContribution,
            ])),
      },
      {
        name: 'proposal not pursuing',
        comment: comments.notPursuing,
        matches:
          hasLabel(issueLabels, labels.notPursuing) &&
          (action === 'opened' ||
            isRelevantLabelEvent(action, eventLabel, [labels.notPursuing])),
      },
      {
        name: 'contribution ready to be worked',
        comment: comments.ready,
        matches:
          action === 'unlabeled' &&
          [labels.codeContribution, labels.designContribution].includes(
            eventLabel
          ),
      },
    ];

    let matchedRule = false;
    for (const rule of rules) {
      core.info(`[contributions] Rule "${rule.name}" matched=${rule.matches}`);
      if (!rule.matches) {
        continue;
      }
      matchedRule = true;
      const result = await manageComment(context, octokit, {
        // Replace creates a missing managed comment, upgrades a legacy exact
        // match with a header, or becomes a no-op when content is current.
        operation: 'replace',
        ...rule.comment,
      });
      core.info(
        `[contributions] Rule "${rule.name}" completed with action=${result.action}`
      );
    }

    if (!matchedRule) {
      core.info('[contributions] No contribution comment rules matched');
    }
  },
};

export default plugin;
