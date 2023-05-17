/**
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const mockAnswers = new Map();

const prompt = jest.fn().mockImplementation(async (questions) => {
  return questions
    .map((question) => {
      const answer = mockAnswers.get(question.name);
      if (!answer) {
        throw new Error(
          `Invalid mock usage for \`inquirer\`. Expected an answer to be ` +
            `mocked before prompt was called for question \`${question.name}\``
        );
      }
      mockAnswers.delete(question.name);
      return {
        key: question.name,
        value: answer,
      };
    })
    .reduce((acc, { key, value }) => {
      return {
        ...acc,
        [key]: value,
      };
    }, {});
});

function mockAnswer(key, value) {
  mockAnswers.set(key, value);
  return {
    mockAnswers,
  };
}

module.exports = {
  prompt,
  mockAnswer,
};
