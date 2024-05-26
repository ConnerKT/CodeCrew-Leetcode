import React from 'react';
import { transform } from '@babel/core';
import { Challenge, SubmissionLanguage, UserSubmission } from '../../models';
import { Glob } from "bun";
import { readFileSync } from "fs";
import { renderToString } from 'react-dom/server';
import handlebars from 'handlebars';


const submissionFormatter = (challenge: Challenge, userSubmission: UserSubmission) => {
  const language = userSubmission.submissionLanguage;
  const testInputs = JSON.stringify(challenge.testCases.map((testCase) => Object.values(testCase.input)));
  let glob = new Glob('*.*');
  const evaluationscripts = Array.from(glob.scanSync({ cwd: __dirname + "/evaluationscripts" }));
  let evaluationFileName = evaluationscripts.find((evaluation) => evaluation.match(`${language}.*`));
  const evaluationScript = readFileSync(__dirname + "/evaluationscripts/" + evaluationFileName, "utf8");
  const template = handlebars.compile(evaluationScript);
  const formattedCode = template({ inputs: testInputs, userSubmittedFunction: userSubmission.submissionCode });

  return formattedCode;


};


export default submissionFormatter 
