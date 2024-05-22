import { GameRoom, SubmissionLanguage } from "../src/models"

const sampleGameState: GameRoom = {
    id: "1234",
    users: [
        {
            username: "playerOne",
            id: "user123"
        },
        {
            username: "playerTwo",
            id: "user124"
        }
    ],
    challenges: [
        {
            id: "challenge1",
            testCases: [
                {
                    id: "tc1",
                    input: [1, 2],
                    output: 3
                },
                {
                    id: "tc2",
                    input: [10, 20],
                    output: 30
                }
            ],
            userSubmissions: [
                {
                    challengeId: "challenge1",
                    userId: "user123",
                    testCasesPassed: [
                        "tc1",
                        "tc2"
                    ],
                    submissionCode: "function add(a, b) { return a + b; }",
                    submissionLanguage: SubmissionLanguage.JavaScript
                },
                {
                    challengeId: "challenge1",
                    userId: "user124",
                    testCasesPassed: [
                        "tc1"
                    ],
                    submissionCode: "function add(a, b) { return a + b; }",
                    submissionLanguage: SubmissionLanguage.JavaScript
                }
            ]
        },
        {
            id: "challenge2",
            testCases: [
                {
                    id: "tc1",
                    input: [1, 2],
                    output: 3
                }
            ],
            userSubmissions: [
                {
                    challengeId: "challenge2", // Add the 'challengeId' property
                    userId: "user123",
                    testCasesPassed: [
                        "tc1"
                    ],
                    submissionCode: "function subtract(a, b) { return a - b; }",
                    submissionLanguage: SubmissionLanguage.JavaScript
                }
            ]
        }
    ]
}

import { ObjectId } from 'mongodb';
import { Challenge, TestCase } from '../src/models';

const sampleChallenges: Challenge[] = [
    {
        _id: new ObjectId().toString(),
        title: 'Sum of Two Numbers',
        difficulty: 'Easy',
        description: 'Write a function that returns the sum of two numbers.',
        link: 'https://example.com/challenges/sum-of-two-numbers',
        functionSignatures: {
            python: 'def sum_two_numbers(a: int, b: int) -> int:',
            javascript: 'function sumTwoNumbers(a, b) {'
        },
        testCases: [
            {
                id: new ObjectId().toString(),
                input: [1, 2],
                output: 3
            },
            {
                id: new ObjectId().toString(),
                input: [10, 20],
                output: 30
            },
            {
                id: new ObjectId().toString(),
                input: [-1, -2],
                output: -3
            }
        ],
        sampleCorrectSolution: null // Add the 'sampleCorrectSolution' property
    },
    {
        _id: new ObjectId().toString(),
        title: 'Reverse a String',
        difficulty: 'Medium',
        description: 'Write a function that reverses a string.',
        link: 'https://example.com/challenges/reverse-a-string',
        functionSignatures: {
            python: 'def reverse_string(s: str) -> str:',
            javascript: 'function reverseString(s) {'
        },
        testCases: [
            {
                id: new ObjectId().toString(),
                input: 'hello',
                output: 'olleh'
            },
            {
                id: new ObjectId().toString(),
                input: 'world',
                output: 'dlrow'
            },
            {
                id: new ObjectId().toString(),
                input: 'OpenAI',
                output: 'IAnepO'
            }
        ],
        sampleCorrectSolution: null // Add the 'sampleCorrectSolution' property
    },
    {
        _id: new ObjectId().toString(),
        title: 'Find Maximum Value',
        difficulty: 'Hard',
        description: 'Write a function that finds the maximum value in an array.',
        link: 'https://example.com/challenges/find-maximum-value',
        functionSignatures: {
            python: 'def find_maximum(arr: list) -> int:',
            javascript: 'function findMaximum(arr) {'
        },
        testCases: [
            {
                id: new ObjectId().toString(),
                input: [1, 2, 3, 4, 5],
                output: 5
            },
            {
                id: new ObjectId().toString(),
                input: [10, 20, 30, 40, 50],
                output: 50
            },
            {
                id: new ObjectId().toString(),
                input: [-10, -20, -30, -40, -50],
                output: -10
            }
        ],
        sampleCorrectSolution: null // Add the 'sampleCorrectSolution' property
    }
];

export default sampleChallenges;


export {sampleGameState, sampleChallenges}