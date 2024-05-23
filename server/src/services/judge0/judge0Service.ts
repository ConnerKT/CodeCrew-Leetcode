import axios from 'axios';
import appConfig from '../../config/appConfig';
import { Challenge, UserSubmission } from '../../models';
import formatterFunction from './formatSubmission';

const JUDGE0_API_URL = appConfig.JUDGE0_API_URL;
const JUDGE0_API_KEY = appConfig.JUDGE0_API_KEY;  // Add your Judge0 API key here



interface SubmissionPayload {
  source_code: string;
  language_id: number;
  stdin?: string;
}

// {
//   "stdout": "sasas\n",
//   "time": "0.031",
//   "memory": 33668,
//   "stderr": null,
//   "token": "dd5f6929-f4ea-46e6-9c06-f76ee018616f",
//   "compile_output": null,
//   "message": null,
//   "status": {
//     "id": 3,
//     "description": "Accepted"
//   }
// }

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

interface ResultResponse {
  stdout: string;
  stderr: string;
  status: {
    id: number;
    description: string;
  };
}




class Judge0Service {

  static formatSubmissionPayload(challenge: Challenge, submission: UserSubmission): SubmissionPayload {
    let inputs = challenge.testCases.map(testCase => JSON.stringify(testCase.input));
    let inputsString = inputs.join(',');
  
    //javascript
    let formattedCode = formatterFunction(challenge, submission)
    console.log("formattedCode", formattedCode);
  
    return {
      source_code: formattedCode,
      language_id: 63,
    };
  }

  static async createSubmission(payload: SubmissionPayload): Promise<SubmissionResponse> {
    const response = await axios.post(`${JUDGE0_API_URL}/submissions?wait=true`, payload, {
      headers: {
        'Content-Type': 'application/json',
        'X-RapidAPI-Key': JUDGE0_API_KEY,
      },
    });
    return response.data;
  }

  static async getSubmissionResult(token: string): Promise<ResultResponse> {
    const response = await axios.get(`${JUDGE0_API_URL}/submissions/${token}`, {
      headers: {
        'X-RapidAPI-Key': JUDGE0_API_KEY,
      },
    });
    return response.data;
  }
}

export default Judge0Service;
