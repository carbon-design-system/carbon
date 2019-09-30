import rangePlugin from 'flatpickr/dist/plugins/rangePlugin';

/**
 * @param {object} config Plugin configuration.
 * @returns {Plugin} An extension of Flatpickr `rangePlugin` that does the following:
 *   * Better ensures the calendar dropdown is always aligned to the `<input>` for the starting date.
 *     Workaround for: https://github.com/flatpickr/flatpickr/issues/1944
 */
export default config => {
  const factory = rangePlugin(Object.assign({ position: 'left' }, config));
  return fp =>
    Object.assign(factory(fp), {
      onPreCalendarPosition() {},
    });
};
