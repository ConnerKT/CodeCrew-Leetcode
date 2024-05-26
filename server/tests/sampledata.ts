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
        id: "661d58f3799defea023aff45",
        testCases: [
          {
            id: "tc1",
            input: {
              l1: [2, 4, 3],
              l2: [5, 6, 4]
            },
            output: [7, 0, 8]
          },
          {
            id: "tc2",
            input: {
              l1: [0],
              l2: [0]
            },
            output: [0]
          },
          {
            id: "tc3",
            input: {
              l1: [9, 9, 9, 9, 9, 9, 9],
              l2: [9, 9, 9, 9]
            },
            output: [8, 9, 9, 9, 0, 0, 0, 1]
          }
        ],
        userSubmissions: [
          {
            challengeId: "661d58f3799defea023aff45",
            userId: "user123",
            testCasesPassed: ["tc1", "tc2", "tc3"],
            submissionCode: "function addTwoNumbers(l1, l2) {\n  // implementation\n}",
            submissionLanguage: SubmissionLanguage.JavaScript
          },
          {
            challengeId: "661d58f3799defea023aff45",
            userId: "user124",
            testCasesPassed: ["tc1", "tc2"],
            submissionCode: "function addTwoNumbers(l1, l2) {\n  // implementation\n}",
            submissionLanguage: SubmissionLanguage.JavaScript
          },
          {
            challengeId: "661d58f3799defea023aff45",
            userId: "user123",
            testCasesPassed: ["tc1", "tc2", "tc3"],
            submissionCode: "def addTwoNumbers(l1, l2):\n  # implementation",
            submissionLanguage: SubmissionLanguage.Python
          }
        ]
      }
    ]
  }
  
  import { ObjectId } from 'mongodb';
  import { Challenge, TestCase } from '../src/models';
  
  const sampleChallenges: Challenge[] = [
    {
      _id: "661d58f3799defea023aff45",
      title: 'Add Two Numbers',
      difficulty: 'Medium',
      description: 'Write a function that adds two numbers represented as linked lists.',
      link: 'https://leetcode.com/problems/add-two-numbers',
      functionSignatures: [
        {
          "name": "addTwoNumbers",
          "language": SubmissionLanguage.Python,
          "value": "def addTwoNumbers(l1: ListNode, l2: ListNode) -> ListNode:\n\n\n    pass"
        },
        {
          "name": "addTwoNumbers",
          "language": SubmissionLanguage.JavaScript,
          "value": "function addTwoNumbers(l1, l2) {\n\n\n}"
        }
      ],
      testCases: [
        {
          id: new ObjectId().toString(),
          input: {
            l1: [2, 4, 3],
            l2: [5, 6, 4]
          },
          output: [7, 0, 8]
        },
        {
          id: new ObjectId().toString(),
          input: {
            l1: [0],
            l2: [0]
          },
          output: [0]
        },
        {
          id: new ObjectId().toString(),
          input: {
            l1: [9, 9, 9, 9, 9, 9, 9],
            l2: [9, 9, 9, 9]
          },
          output: [8, 9, 9, 9, 0, 0, 0, 1]
        }
      ],
      sampleCorrectSolution: null
    }
  ];
export {sampleGameState, sampleChallenges}