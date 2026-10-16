/**
 * Copyright IBM Corp. 2020, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

interface TimeAgoParams {
  previousTime: Date | undefined;
  secondsAgoText: (value: number) => string;
  minuteAgoText: (value: number) => string;
  minutesAgoText: (value: number) => string;
  hoursAgoText: (value: number) => string;
  hourAgoText: (value: number) => string;
  daysAgoText: (value: number) => string;
  yesterdayAtText: (value: number) => string;
  monthsAgoText: (value: number) => string;
  monthAgoText: (value: number) => string;
  yearsAgoText: (value: number) => string;
  yearAgoText: (value: number) => string;
  nowText: string;
}

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
}: TimeAgoParams): string => {
  if (!previousTime) {
    return nowText;
  }
  const msPerMinute = 60 * 1000;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;
  const msPerMonth = msPerDay * 30;
  const msPerYear = msPerDay * 365;
  const elapsed = new Date().getTime() - previousTime.getTime();

  const getBrowserLocale = (): string => {
    const locales =
      navigator.languages === undefined
        ? [navigator.language, 'en']
        : [...navigator.languages];
    return locales[0]?.trim() ?? 'en';
  };

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
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            new Date(previousTime).toLocaleTimeString(getBrowserLocale()) as any
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
