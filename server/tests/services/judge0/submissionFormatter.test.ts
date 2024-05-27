

import { describe, expect, it } from "bun:test";
import submissionFormatter from "../../../src/services/judge0/submissionFormatter";
import {sampleChallenges, sampleGameState} from "../../sampledata"
import { Challenge, SubmissionLanguage, User, UserSubmission } from "../../../src/models";



describe('Submission Formatter', () => {
    it("should format javascript submission correctly", async () => {
        const inputs: Parameters<typeof submissionFormatter> = [
            {
              functionSignatures:  [
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
                ]
            } as Challenge,
            {
                submissionCode: "function addTwoNumbers(l1, l2) {\n  // implementation\n}",
                submissionLanguage: SubmissionLanguage.JavaScript
            } as UserSubmission
        ]

        const expectedOutput = `
            const inputs = [[[2,4,3],[5,6,4]],[[0],[0]],[[9,9,9,9,9,9,9],[9,9,9,9]]];
            function addTwoNumbers(l1, l2) {
            // implementation
            };
            
            let outputs = [];
            for (let i = 0; i < inputs.length; i++) {
                let input = inputs[i];
                let output = addTwoNumbers(...input);
                outputs.push(output);
            }
            console.log(JSON.stringify(outputs));
        `

        let result = submissionFormatter(...inputs)
        expect(result.replace(/\n|\r|\W/g, "")).toBe(expectedOutput.replace(/\n|\r|\W/g, ""))
    })

    it("should format python submission correctly", async () => {
        let inputs: Parameters<typeof submissionFormatter> = [
            {
              functionSignatures:  [
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
                  ]
            } as Challenge,
            {
                submissionCode: "def addTwoNumbers(l1, l2):# implementation",
                submissionLanguage: SubmissionLanguage.Python
            } as UserSubmission
        ]
        let expectedOutput = `
        import json

        
        testInputs = [[[2,4,3],[5,6,4]],[[0],[0]],[[9,9,9,9,9,9,9],[9,9,9,9]]]
        def addTwoNumbers(l1, l2):
          # implementation
        
        
        outputs = []
        for i in range(len(testInputs)):
            input = testInputs[i]
            output = addTwoNumbers(**input)
            outputs.append(output)
            
        print(json.dumps(outputs))
        `

        let result = submissionFormatter(...inputs)
        expect(result.replace(/\n|\r|\W/g, "")).toBe(expectedOutput.replace(/\n|\r|\W/g, ""))
    })
})