import axios from 'axios';

const JUDGE0_API_URL = 'https://api.judge0.com';
const JUDGE0_API_KEY = 'your_judge0_api_key';  // Add your Judge0 API key here

interface SubmissionPayload {
  source_code: string;
  language_id: number;
  stdin?: string;
}

interface SubmissionResponse {
  token: string;
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
  static async createSubmission(payload: SubmissionPayload): Promise<SubmissionResponse> {
    const response = await axios.post(`${JUDGE0_API_URL}/submissions?base64_encoded=false&wait=false`, payload, {
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
