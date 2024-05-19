enum SubmissionLanguage {
    Python = 'python',
    JavaScript = 'javascript'
}

class User {
    username!: string;
    id!: string;
}

class UserSubmission {
    userId!: string;
    testCasesPassed!: string[];
    submissionCode!: string;
    submissionLanguage!: SubmissionLanguage;
}

class TestCase {
    id!: string;
    input!: any;
    output!: any;
}

class Challenge {
    id!: string;
    title!: string;
    difficulty!: string;
    description!: string;
    link!: string;
    functionSignatures!: any;
    testCases!: TestCase[];
}

class GameRoom {
    id!: string;
    users!: User[];
    challenges!: { id: string, numberOfTestCases: number, userSubmissions: UserSubmission[] }[];

    constructor(id: string, challenges: Challenge[]) {
        this.id = id;
        this.challenges = challenges.map(challenge => ({
            id: challenge.id,
            numberOfTestCases: challenge.testCases.length,
            userSubmissions: []
        }));
        this.users = [];
    }
}

export { User, UserSubmission, Challenge, GameRoom, SubmissionLanguage, TestCase };
