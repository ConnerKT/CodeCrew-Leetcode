// tests for the judge0 service

import { mock, describe, expect, it  } from "bun:test";
import { Challenge, SubmissionLanguage, TestCase, UserSubmission } from "../../../src/models";

import Judge0Service, {SubmissionResponse} from "../../../src/services/judge0/judge0Service";



describe("processSubmissionResult", () => {
    it("should return correct pass/fails", async () => {
        const inputs: Parameters<typeof Judge0Service.processSubmissionResult> = [
            {
                testCases: [
                    {
                        output: [7, 0, 8]
                    } as TestCase,
                    {
                        output: [0]
                    } as TestCase,
                    {
                        output: [8, 9, 9, 9, 0, 0, 0, 1]
                    } as TestCase
                ]
            } as Challenge,
            {
                stdout: JSON.stringify([[7, 0, 8], [0], [8, 9, 9, 9, 0, 0, 0, 1]])
            } as SubmissionResponse
        ]

        let result = Judge0Service.processSubmissionResult(...inputs)
        expect(result.testCasesPassed.length).toBe(3);
        expect(result.testCasesFailed.length).toBe(0);
    });

    it("should return correct pass/fails", async () => {
        const inputs: Parameters<typeof Judge0Service.processSubmissionResult> = [
            {
                testCases: [
                    {
                        output: [7, 0, 8]
                    } as TestCase,
                    {
                        output: [0]
                    } as TestCase,
                    {
                        output: [8, 9, 9, 9, 0, 0, 0, 1]
                    } as TestCase
                ]
            } as Challenge,
            {
                stdout: JSON.stringify([[7, 0, 8], [0], [1, 1]])
            } as SubmissionResponse
        ]

        let result = Judge0Service.processSubmissionResult(...inputs)
        expect(result.testCasesPassed.length).toBe(2);
        expect(result.testCasesFailed.length).toBe(1);
    })

    
    it("should return correct pass/fails", async () => {
        const inputs: Parameters<typeof Judge0Service.processSubmissionResult> = [
            {
                testCases: [
                    {
                        output: [7, 0, 8] 
                    } as TestCase,
                    {
                        output: [0]
                    } as TestCase,
                    {
                        output: [8, 9, 9, 9, 0, 0, 0, 1]
                    } as TestCase
                ]
            } as Challenge,
            {
                stdout: JSON.stringify([null, null, [8, 9, 9, 9, 0, 0, 0, 1]])
            } as SubmissionResponse
        ]

        let result = Judge0Service.processSubmissionResult(...inputs)
        expect(result.testCasesPassed.length).toBe(1);
        expect(result.testCasesFailed.length).toBe(2);
    })

    it("should return correct pass/fails", async () => {
        const inputs: Parameters<typeof Judge0Service.processSubmissionResult> = [
            {
                testCases: [
                    {
                        output: 3
                    } as TestCase,
                    {

                        output: 9
                    } as TestCase,
                    {

                        output: -1
                    } as TestCase
                ]
            } as Challenge,
            {
                stdout: JSON.stringify([null, null, null])
            } as SubmissionResponse
        ]

        let result = Judge0Service.processSubmissionResult(...inputs)
        expect(result.testCasesPassed.length).toBe(0);
        expect(result.testCasesFailed.length).toBe(3);
    })

    it("should return correct pass/fails", async () => {
        const inputs: Parameters<typeof Judge0Service.processSubmissionResult> = [
            {
                testCases: [
                    {
                        output: 3
                    } as TestCase,
                    {

                        output: 9
                    } as TestCase,
                    {

                        output: -1
                    } as TestCase
                ]
            } as Challenge,
            {
                stdout: JSON.stringify([1, 9, -1])
            } as SubmissionResponse
        ]

        let result = Judge0Service.processSubmissionResult(...inputs)
        expect(result.testCasesPassed.length).toBe(2);
        expect(result.testCasesFailed.length).toBe(1);
    })

    it("should return correct pass/fails", async () => {
        const inputs: Parameters<typeof Judge0Service.processSubmissionResult> = [
            {
                testCases: [
                    {
                        output: "rar"
                    } as TestCase,
                    {

                        output: "oio"
                    } as TestCase,
                    {

                        output: "a"
                    } as TestCase
                ]
            } as Challenge,
            {
                stdout: JSON.stringify(["rar", 2, -1])
            } as SubmissionResponse
        ]

        let result = Judge0Service.processSubmissionResult(...inputs)
        expect(result.testCasesPassed.length).toBe(1);
        expect(result.testCasesFailed.length).toBe(2);
    })

    it("should return correct pass/fails", async () => {
        const inputs: Parameters<typeof Judge0Service.processSubmissionResult> = [
            {
                testCases: [
                    {
                        output: ["z", "p", "a"]
                    } as TestCase,
                    {

                        output: ["g", "t"]
                    } as TestCase,
                    {

                        output: ["a", "r"]
                    } as TestCase
                ]
            } as Challenge,
            {
                stdout: JSON.stringify(["rar", 2, -1])
            } as SubmissionResponse
        ]

        let result = Judge0Service.processSubmissionResult(...inputs)
        expect(result.testCasesPassed.length).toBe(0);
        expect(result.testCasesFailed.length).toBe(3);
    })


});