import { Axios, AxiosResponse } from 'axios';
import appConfig from '../../config/appConfig';
import { Challenge, TestCase, UserSubmission, SubmissionLanguage } from '../../models';
import submissionFormatter from './submissionFormatter';


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

enum Judge0LanguageIds{
  "javascript" = 63,
  "python" = 71,
}


class Judge0Service {

  static httpClient: Axios = new Axios({
      url: appConfig.JUDGE0_API_URL,
      headers: {
        'Content-Type': 'application/json',
        'X-RapidAPI-Key': appConfig.JUDGE0_API_KEY
      }
  });

  static async submitSolution(challenge: Challenge, submission: UserSubmission): Promise<SubmissionResult> {
    let payload: SubmissionPayload = this.formatSubmissionPayload(challenge, submission);
    let response: AxiosResponse<SubmissionResponse> = await this.httpClient.post(`submissions?wait=true`, payload);
    let submissionResult: SubmissionResult = this.processSubmissionResult(challenge, response.data);
    return submissionResult;
  }

  static processSubmissionResult(challenge: Challenge, result: SubmissionResponse): SubmissionResult {
    let testCasesPassed: TestCase[] = [];
    let testCasesFailed: TestCase[] = [];

    let outputs: any[] = JSON.parse(result.stdout);
    // console.log("outputs", outputs);

    for (let i = 0; i < challenge.testCases.length; i++) {
      let expectedOutput = challenge.testCases[i].output;
      let userOutput = outputs[i];
      if (this.compareOutputs(expectedOutput, userOutput)) {
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

  static compareOutputs(expectedOutput: any, userOutput: any): boolean {
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

  static formatSubmissionPayload(challenge: Challenge, submission: UserSubmission): SubmissionPayload {
    let formattedCode = submissionFormatter(challenge, submission);

    return {
      source_code: formattedCode,
      language_id: Judge0LanguageIds[submission.submissionLanguage],
    };
  }

  
}

export default Judge0Service;
export { SubmissionResult, SubmissionResponse, SubmissionPayload, Judge0LanguageIds };