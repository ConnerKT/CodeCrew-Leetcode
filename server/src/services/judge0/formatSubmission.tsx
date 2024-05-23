import React from 'react';
import { transform } from '@babel/core';
import { Challenge, UserSubmission } from '../../models';
import { javascriptEscortFunction } from './escortfunctions';

const formatSubmissionTSX = (challenge: Challenge, userSubmission: UserSubmission) => {
  const functionName = challenge.functionSignatures.find(
    (signature) => signature.language === userSubmission.submissionLanguage
  )?.name;

  if (!functionName) {
    throw new Error(`Function name not found for language ${userSubmission.submissionLanguage}`);
  }

  const testInputs = JSON.stringify(
    challenge.testCases.map((testCase) => Object.values(testCase.input))
  );

  return `
let testInputs = ${testInputs};

let userSubmission = ${userSubmission.submissionCode};

let result = ${javascriptEscortFunction.toString()}(testInputs, userSubmission);
  `;
};

const compiled = transform(formatSubmissionTSX.toString(), { presets: ['@babel/preset-env'] });
const formatterFunction = eval(compiled.code);

export default formatterFunction;
