import axios from 'axios';
import appConfig from '../../config/appConfig';
import { Challenge, TestCase, UserSubmission } from '../../models';
import formatterFunction from './formatSubmission';

const JUDGE0_API_URL = appConfig.JUDGE0_API_URL;
const JUDGE0_API_KEY = appConfig.JUDGE0_API_KEY;  // Add your Judge0 API key here

interface SubmissionPayload {
  source_code: string;
  language_id: number;
  stdin?: string;
}

interface SubmissionResponse {
  stdout: string;
  time: string;
  memory: number;
  stderr: string;
  token: string;
  compile_output: string;
  message: string;
  status: {
    id: number;
    description: string;
  };
}

interface SubmissionResult {
  challengeId: string;
  testCasesPassed: TestCase[];
  testCasesFailed: TestCase[];
}

function compareOutputs(expectedOutput: any, userOutput: any): boolean {
  if (Array.isArray(expectedOutput) && Array.isArray(userOutput)) {
    // Sort and compare arrays
    expectedOutput.sort();
    userOutput.sort();
    return JSON.stringify(expectedOutput) === JSON.stringify(userOutput);
  } else if (typeof expectedOutput === 'object' && typeof userOutput === 'object') {
    // Compare objects
    return JSON.stringify(expectedOutput) === JSON.stringify(userOutput);
  } else {
    // Compare primitive values
    return expectedOutput === userOutput;
  }
}

class Judge0Service {
  static formatSubmissionPayload(challenge: Challenge, submission: UserSubmission): SubmissionPayload {
    let formattedCode = formatterFunction(challenge, submission);
    console.log("formattedCode", formattedCode);
    return {
      source_code: formattedCode,
      language_id: 63,
    };
  }

  static async submitSolution(challenge: Challenge, submission: UserSubmission): Promise<SubmissionResult> {
    const payload = this.formatSubmissionPayload(challenge, submission);
    const response = await axios.post(`${JUDGE0_API_URL}/submissions?wait=true`, payload, {
      headers: {
        'Content-Type': 'application/json',
        'X-RapidAPI-Key': JUDGE0_API_KEY,
      },
    });
    let submissionResult = this.processSubmissionResult(challenge, response.data);
    return submissionResult;
  }

  private static processSubmissionResult(challenge: Challenge, result: SubmissionResponse): SubmissionResult {
    let testCasesPassed: TestCase[] = [];
    let testCasesFailed: TestCase[] = [];

    let outputs = JSON.parse(result.stdout);
    // console.log("outputs", outputs);

    for (let i = 0; i < challenge.testCases.length; i++) {
      let expectedOutput = challenge.testCases[i].output;
      let userOutput = outputs[i];
      if (compareOutputs(expectedOutput, userOutput)) {
        testCasesPassed.push(challenge.testCases[i]);
      } else {
        testCasesFailed.push(challenge.testCases[i]);
      }
    }

    return {
      challengeId: challenge._id,
      testCasesPassed,
      testCasesFailed,
    };
  }
}

export default Judge0Service;
