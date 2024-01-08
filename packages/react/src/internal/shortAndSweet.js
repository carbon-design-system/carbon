/* eslint-disable curly */
/**
 * short-and-sweet v1.0.4 - Accessible character counter for input elements
 * Copyright (c) 2021 Rik Schennink <rik@pqina.nl> (https://pqina.nl/)
 * https://github.com/rikschennink/short-and-sweet/tree/master
 */

export default ((w) => {
  // no window, early exit
  if (!w) return;

  const toArray = (nodeList) => Array.prototype.slice.call(nodeList);

  const h = (name, attr = {}) => {
    const element = document.createElement(name);
    Object.keys(attr).forEach((key) => {
      element.setAttribute(key, attr[key]);
    });
    return element;
  };

  const replaceInString = (string, replacements) =>
    string.replace(/(?:{([a-zA-Z]+)})/g, (match, group) => replacements[group]);

  const toInt = (v) => (v != null ? parseInt(v, 10) : null);

  let uid = 0;

  const createCounter = ({ assistDelay, counterClassName }) => {
    // create visual counter node
    const counterVisual = h('span', {
      class: counterClassName,
      'aria-hidden': 'true',
    });

    // create assist node
    const counterAssistant = h('span', {
      style:
        'position:absolute;overflow:hidden;height:1px;width:1px;padding:0;border:0;clip:rect(1px, 1px, 1px, 1px);clip-path:inset(50%);white-space:nowrap;',
      id: `short-and-sweet-counter-${uid++}`,
      role: 'status',
      'aria-live': 'polite',
    });

    // we'll group the counter and assistant in a fragment so we can add both nodes in one go
    const fragment = document.createDocumentFragment();
    fragment.appendChild(counterVisual);
    fragment.appendChild(counterAssistant);

    // updates the counter
    const updateText = (text) => {
      counterVisual.textContent = text;
    };

    let assistTimerId = null;
    const updateAssist = (text, immidiate) => {
      clearTimeout(assistTimerId);
      if (immidiate) {
        counterAssistant.textContent = text;
        return;
      }
      assistTimerId = setTimeout(() => {
        counterAssistant.textContent = text;
      }, assistDelay);
    };

    const syncAssist = () => {
      clearTimeout(assistTimerId);
      counterAssistant.textContent = counterVisual.textContent;
    };

    const resetAssist = () => {
      clearTimeout(assistTimerId);
      counterAssistant.textContent = '';
    };

    return {
      id: counterAssistant.id,
      fragment,
      updateText,
      updateAssist,
      syncAssist,
      resetAssist,
    };
  };

  // create our short and sweet instance
  const create = (element, options) => {
    // if no max length defined, exit here
    if (!element.getAttribute('maxlength')) return;

    // get label from options or element
    const label = element.dataset.counterLabel || options.counterLabel;

    // create the counter element
    const counter = createCounter(options);

    // link the counter to the element
    element.setAttribute('aria-controls', counter.id);

    // by default is inserted as a sibling of the element
    options.append(element, counter.fragment);

    // assist timer
    let isFirstUpdate = true;

    const limit = (maxlength) =>
      (element.value = element.value.substr(0, maxlength));

    // update counter value
    const update = () => {
      const maxlength = toInt(element.getAttribute('maxlength'));

      // have we reached the maximum amount of characters
      const overflowing = element.value.length > maxlength;

      // limit textarea value to the maxlength
      if (overflowing) limit(maxlength);

      // current length (after limiting)
      const length = element.value.length;

      // determine current label
      const dynamicLabel = replaceInString(label, {
        maxlength,
        length,
        remaining: maxlength - length,
      });

      // update counter value
      counter.updateText(dynamicLabel);

      // don't update the assist the first time, this makes sure it's empty when we focus the field
      if (isFirstUpdate) {
        isFirstUpdate = false;
        return;
      }

      // update assistive counter
      counter.updateAssist(dynamicLabel, overflowing);
    };

    // tell us the amount of characters left when focusing the field
    element.addEventListener('focus', counter.syncAssist);

    // reset assist when leaving field so when we refocus the field it correctly tells us again the amount of characters left
    element.addEventListener('blur', counter.resetAssist);

    // listen for user input so we can update the counter on changes
    element.addEventListener('input', update);

    // update counter so it matches current input value
    update();
  };

  // default short and sweet options
  const defaultOptions = {
    counterClassName: 'short-and-sweet-counter',
    counterLabel: '{remaining} characters left', // {maxlength}, {length}, {remaining}
    assistDelay: 2000,
    append: (element, counter) => {
      element.parentNode.appendChild(counter);
    },
  };

  // array of elements in, short and sweet instances out
  const createAtElements = (elements, options = {}) =>
    elements.map((element) =>
      create(element, Object.assign({}, defaultOptions, options))
    );

  // export our short and sweet function
  return function shortAndSweet(target, options) {
    // if target is a string
    return typeof target === 'string'
      ? // treat it as a querySelector
        createAtElements(toArray(document.querySelectorAll(target)), options)
      : // create single short and sweet counter
        createAtElements([target], options)[0];
  };
})(typeof window === 'undefined' ? null : window);
