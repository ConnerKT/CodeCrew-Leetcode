import React from 'react';
import { transform } from '@babel/core';
import { Challenge, SubmissionLanguage, UserSubmission } from '../../models';
import { Glob } from "bun";
import { readFileSync } from "fs";
import handlebars from 'handlebars';

let glob = new Glob('*.*');
const evaluationscripts = Array.from(glob.scanSync({ cwd: __dirname + "/evaluationscripts" }));

const submissionFormatter = (challenge: Challenge, userSubmission: UserSubmission) => {
  const testInputs = JSON.stringify(challenge.testCases.map((testCase) => Object.values(testCase.input)));
  const submissionLanguage = userSubmission.submissionLanguage;
  const submissionCode = userSubmission.submissionCode;
  const submissionFunctionName = challenge.functionSignatures.find((signature) => signature.language === submissionLanguage).name;

  let evaluationFileName = evaluationscripts.find((evaluation) => evaluation.match(`${submissionLanguage}.*`));
  const evaluationScript = readFileSync(__dirname + "/evaluationscripts/" + evaluationFileName, "utf8");
  
  const template = handlebars.compile(evaluationScript);
  const formattedCode = template({ inputs: testInputs, userSubmittedFunction: submissionCode, userSubmittedFunctionName: submissionFunctionName});

  return formattedCode;


};


export default submissionFormatter 
