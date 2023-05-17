/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  endOfYear,
  isBefore,
  isFriday,
  isMonday,
  nextMonday,
  nextFriday,
  previousFriday,
  startOfYear,
  eachWeekOfInterval,
} from 'date-fns';

export function getSprintsByYear(year) {
  const start = getStartDate(year);
  const end = getEndDate(year);
  const interval = {
    start,
    end,
  };
  const sprints = [];
  let sprint = {};
  let startOfSprint = true;

  for (const week of eachWeekOfInterval(interval)) {
    // Start of sprint
    if (startOfSprint) {
      sprint = {
        start: nextMonday(week),
      };
      startOfSprint = false;
    } else {
      sprint.end = nextFriday(week);
      startOfSprint = true;
      sprints.push(sprint);
    }
  }

  return sprints;
}

function getStartDate(year) {
  if (year === 2021) {
    return new Date(2021, 0, 11);
  }
  const start = startOfYear(new Date(year, 0, 1));
  if (isMonday(start)) {
    return start;
  }
  return nextMonday(start);
}

function getEndDate(year) {
  const today = new Date();
  const end = endOfYear(new Date(year, 11, 31));

  if (isBefore(today, end)) {
    return today;
  }

  if (isFriday(end)) {
    return end;
  }

  return previousFriday(end);
}
