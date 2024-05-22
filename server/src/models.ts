enum SubmissionLanguage {
    Python = 'python',
    JavaScript = 'javascript'
}

interface User {
    username: string;
    id: string;
}

interface UserSubmission {
    challengeId: string;
    userId: string;
    testCasesPassed: string[];
    submissionCode: string;
    submissionLanguage: SubmissionLanguage;
}

interface TestCase {
    id: string;
    input: any;
    output: any;
}

interface FunctionSignature {
    name: string;
    language: SubmissionLanguage;
    value: string
}


interface Challenge {
    _id: string;
    title: string;
    difficulty: string;
    description: string;
    link: string;
    functionSignatures: FunctionSignature[];
    testCases: TestCase[];
    sampleCorrectSolution: any
}

class GameRoom {
    id: string;
    users: User[];
    challenges!: { id: string, testCases: TestCase[], userSubmissions: UserSubmission[] }[];

    constructor(id: string, challenges: Challenge[]) {
        this.id = id;
        this.challenges = challenges.map(challenge => ({
            id: challenge._id,
            testCases: challenge.testCases,
            userSubmissions: []
        }));
        this.users = [];
    }
}

export { User, UserSubmission, Challenge, GameRoom, SubmissionLanguage, TestCase };
