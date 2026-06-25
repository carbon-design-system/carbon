/**
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

export const timeAgo = ({
  previousTime,
  secondsAgoText,
  minuteAgoText,
  minutesAgoText,
  hoursAgoText,
  hourAgoText,
  daysAgoText,
  yesterdayAtText,
  monthsAgoText,
  monthAgoText,
  yearsAgoText,
  yearAgoText,
  nowText,
}) => {
  const msPerMinute = 60 * 1000;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;
  const msPerMonth = msPerDay * 30;
  const msPerYear = msPerDay * 365;
  const elapsed = new Date() - previousTime;
  switch (true) {
    case elapsed < msPerMinute:
      return Math.round(elapsed / 1000) > 10
        ? secondsAgoText(Math.round(elapsed / 1000))
        : nowText;
    case elapsed < msPerHour:
      return Math.round(elapsed / msPerMinute) > 1
        ? minutesAgoText(Math.round(elapsed / msPerMinute))
        : minuteAgoText(Math.round(elapsed / msPerMinute));
    case elapsed < msPerDay:
      return Math.round(elapsed / msPerHour) > 1
        ? hoursAgoText(Math.round(elapsed / msPerHour))
        : hourAgoText(Math.round(elapsed / msPerHour));
    case elapsed < msPerMonth:
      return Math.round(elapsed / msPerDay) > 1
        ? daysAgoText(Math.round(elapsed / msPerDay))
        : yesterdayAtText(
            new Date(previousTime).toLocaleTimeString(getBrowserLocales[0])
          );
    case elapsed < msPerYear:
      return Math.round(elapsed / msPerMonth) > 1
        ? monthsAgoText(Math.round(elapsed / msPerMonth))
        : monthAgoText(Math.round(elapsed / msPerMonth));
    default:
      return Math.round(elapsed / msPerYear) > 1
        ? yearsAgoText(Math.round(elapsed / msPerYear))
        : yearAgoText(Math.round(elapsed / msPerYear));
  }
};

const getBrowserLocales = () => {
  const browserLocales =
    navigator.languages === undefined
      ? [navigator.language, 'en'] // add fallback 'en' if we can't get locale value from browser
      : navigator.languages;
  return browserLocales.map((locale) => {
    const trimmedLocale = locale.trim();
    return trimmedLocale;
  });
};
