/**
 * Copyright IBM Corp. 2022, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import namor from 'namor';
import { inlineEditSelectItems } from './getInlineEditColumns';
import { ExampleAILabel } from './ExampleAILabel';

const getRandomInteger = (min, max, decimalPlaces) => {
  const roundedMin = Math.ceil(min);
  const roundedMax = Math.floor(max);
  const randomNumber = Math.random() * (max - min) + min;
  if (!decimalPlaces) {
    return (
      Math.floor(Math.random() * (roundedMax - roundedMin + 1)) + roundedMin
    );
  }
  const power = Math.pow(10, decimalPlaces);
  return Math.floor(randomNumber * power) / power;
};

export const makeData = (...lens) => {
  const config = lens.filter((a) => typeof a === 'object')[0];
  const filteredData = lens.filter((a) => typeof a === 'number');
  const makeDataLevel = (depth = 0) => {
    const len = filteredData[depth];
    return range(len).map((index) => ({
      ...newPerson(index, config),
      subRows: filteredData[depth + 1] ? makeDataLevel(depth + 1) : undefined,
    }));
  };

  return makeDataLevel();
};

export const range = (len) => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

/** This function is only to create a random data point when the person joined */
const getRandomDateJoined = () => {
  return randomDate(new Date(2022, 0, 1), new Date());
};

const getPasswordStrength = () => {
  const chance = Math.random();

  return chance > 0.66
    ? 'critical'
    : chance > 0.33
      ? 'minor-warning'
      : 'normal';
};

const renderDocLink = () => {
  const chance = Math.random();

  const docLinkObj = {
    href:
      chance > 0.66
        ? 'https://carbondesignsystem.com/'
        : chance > 0.33
          ? 'https://pages.github.ibm.com/carbon/ibm-products/'
          : 'https://ibm-products.carbondesignsystem.com/',
    text:
      chance > 0.66
        ? 'Carbon Design System'
        : chance > 0.33
          ? 'Carbon for IBM Products PAL'
          : 'Carbon for IBM Products storybook',
  };
  return docLinkObj;
};

const newPerson = (index, config) => {
  const statusChance = Math.random();
  const roleChance = Math.random();
  const activeChance = Math.random();

  const initialChartTypeIndex = getRandomInteger(0, 2);
  const activeSinceDate = new Date();
  let yesterdayDate = new Date();
  yesterdayDate.setDate(yesterdayDate.getDate() - 1);
  let twoDaysAgoDate = new Date();
  twoDaysAgoDate.setDate(twoDaysAgoDate.getDate() - 2);

  return {
    disabledColumn: namor.generate({ words: 1, numbers: 0 }),
    firstName: namor.generate({ words: 1, numbers: 0 }),
    lastName:
      index === 1 && config?.includeNonEditableCell && config?.column
        ? {
            value: '\u2014',
            isStaticCell: true,
            columnId: config?.column,
          }
        : namor.generate({ words: 1, numbers: 0 }),
    age: Math.floor(Math.random() * 30),
    visits: Math.floor(Math.random() * 100),
    progress: Math.floor(Math.random() * 100),
    status:
      statusChance > 0.66
        ? 'relationship'
        : statusChance > 0.33
          ? 'complicated'
          : 'single',
    role:
      roleChance > 0.66
        ? 'developer'
        : roleChance > 0.33
          ? 'designer'
          : 'researcher',
    joined: getRandomDateJoined(),

    someone1: namor.generate({ words: 1, numbers: 0 }),
    someone2: namor.generate({ words: 1, numbers: 0 }),
    someone3: namor.generate({ words: 1, numbers: 0 }),
    someone4: namor.generate({ words: 1, numbers: 0 }),
    someone5: namor.generate({ words: 1, numbers: 0 }),
    someone6: namor.generate({ words: 1, numbers: 0 }),
    someone7: namor.generate({ words: 1, numbers: 0 }),
    someone8: namor.generate({ words: 1, numbers: 0 }),
    someone9: namor.generate({ words: 1, numbers: 0 }),
    someone10: namor.generate({ words: 1, numbers: 0 }),
    someone11: namor.generate({ words: 4, numbers: 0 }),
    someone12: namor.generate({ words: 1, numbers: 0 }),
    someone13: namor.generate({ words: 1, numbers: 0 }),
    someone14: namor.generate({ words: 1, numbers: 0 }),
    someone15: namor.generate({ words: 1, numbers: 0 }),
    someone16: namor.generate({ words: 1, numbers: 0 }),
    someone17: namor.generate({ words: 1, numbers: 0 }),
    someone18: namor.generate({ words: 1, numbers: 0 }),
    someone19: namor.generate({ words: 1, numbers: 0 }),
    someone20: namor.generate({ words: 1, numbers: 0 }),
    chartType:
      initialChartTypeIndex === 0
        ? inlineEditSelectItems[0]
        : initialChartTypeIndex === 1
          ? inlineEditSelectItems[1]
          : inlineEditSelectItems[2],
    key: false,
    activeSince:
      activeChance > 0.66
        ? activeSinceDate
        : activeChance > 0.33
          ? yesterdayDate
          : '23/05/2020',
    bonus: `$\r${getRandomInteger(100, 500, 2)}`,
    passwordStrength: getPasswordStrength(),
    doc_link: renderDocLink(),
    aiLabel: config?.enableAIRow &&
      (index === 1 || index === 3 || index === 4) && (
        <ExampleAILabel align={config?.aiLabelAlign} />
      ),
    id: config?.id ? `${config?.id}__${index}` : `row_${index}`,
  };
};

export const newPersonWithTwoLines = () => {
  return {
    firstName: (
      <>
        <div>{namor.generate({ words: 1, numbers: 0 })}</div>
        <div>{namor.generate({ words: 1, numbers: 0 })}</div>
      </>
    ),
    lastName: namor.generate({ words: 1, numbers: 0 }),
    age: Math.floor(Math.random() * 30),
  };
};

const randomDate = (start, end) => {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
};
