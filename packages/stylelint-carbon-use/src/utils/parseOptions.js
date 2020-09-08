const parseAddDefaults = (options, defaults) => {
  const output = options ? options.filter((option) => option.length > 0) : [];
  let addDefaults = false;

  if (output.length === 0) {
    addDefaults = true;
  } else {
    const index = output.findIndex((item) => item === '*');

    if (index >= 0) {
      addDefaults = true;
      output.splice(index, 1);
    }
  }

  if (addDefaults) {
    const filteredDefaults = defaults.filter((def) => !output.includes(def));

    return output.concat(filteredDefaults);
  }

  return output;
};

export default function parseOptions(options, defaults) {
  const optsOut = {};

  // NOTE expects type of options to match default options

  for (const prop of Object.keys(defaults)) {
    if (Array.isArray(defaults[prop])) {
      optsOut[prop] = parseAddDefaults(
        (options && options[prop]) || [],
        defaults[prop]
      );
    } else {
      if (options && options[prop] !== undefined) {
        optsOut[prop] = options[prop];
      } else {
        optsOut[prop] = defaults[prop];
      }
    }
  }

  return optsOut;
}
