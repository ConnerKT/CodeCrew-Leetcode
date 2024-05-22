import React from 'react';
// import * as babel from "@babel/core";
import { transform } from "@babel/core";
import { Challenge, UserSubmission } from '../../models';

// {
//   "_id": {
//     "$oid": "661d58f1799defea023aff42"
//   },
//   "title": "Two Sum",
//   "difficulty": "Easy",
//   "description": "<p>Given an array of integers <code>nums</code>&nbsp;and an integer <code>target</code>, return <em>indices of the two numbers such that they add up to <code>target</code></em>.</p>\n\n<p>You may assume that each input would have <strong><em>exactly</em> one solution</strong>, and you may not use the <em>same</em> element twice.</p>\n\n<p>You can return the answer in any order.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [2,7,11,15], target = 9\n<strong>Output:</strong> [0,1]\n<strong>Explanation:</strong> Because nums[0] + nums[1] == 9, we return [0, 1].\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [3,2,4], target = 6\n<strong>Output:</strong> [1,2]\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [3,3], target = 6\n<strong>Output:</strong> [0,1]\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>2 &lt;= nums.length &lt;= 10<sup>4</sup></code></li>\n\t<li><code>-10<sup>9</sup> &lt;= nums[i] &lt;= 10<sup>9</sup></code></li>\n\t<li><code>-10<sup>9</sup> &lt;= target &lt;= 10<sup>9</sup></code></li>\n\t<li><strong>Only one valid answer exists.</strong></li>\n</ul>\n\n<p>&nbsp;</p>\n<strong>Follow-up:&nbsp;</strong>Can you come up with an algorithm that is less than <code>O(n<sup>2</sup>)</code><font face=\"monospace\">&nbsp;</font>time complexity?",
//   "link": "https://leetcode.com/problems/two-sum",
//   "functionSignatures": {
//     "python": "def twoSum(nums: List[int], target: int) -> List[int]:\n\n\n    pass",
//     "javascript": "function twoSum(nums, target) {\n\n\n}"
//   },
//   "testCases": [
//     {
//       "id": "tc1",
//       "input": {
//         "nums": [
        //   2,
        //   7,
        //   11,
        //   15
        // ],
//         "target": 9
//       },
//       "output": [
//         0,
//         1
//       ]
//     },
//     {
//       "id": "tc2",
//       "input": {
//         "nums": [
//           3,
//           2,
//           4
//         ],
//         "target": 6
//       },
//       "output": [
//         1,
//         2
//       ]
//     },
//     {
//       "id": "tc3",
//       "input": {
//         "nums": [
//           3,
//           3
//         ],
//         "target": 6
//       },
//       "output": [
//         0,
//         1
//       ]
//     }
//   ]
// }


/*
inputs: 
[
  [[2, 7, 11, 15], 9],
  [[3, 2, 4], 6],
  [[3, 3], 6]
]

output:
[
  [0, 1],
  [1, 2],
  [0, 1]
]
*/




const formatSubmissionTSX = (challenge: Challenge, userSubmission: UserSubmission) => {
  // accept inputs from command line
  


  for (let i = 1; i < process.argv.length; i++) {

  }



  let lines = challenge.testCases.map(testCase => {
    return `input: ${JSON.stringify(testCase.input)}`
  })
  let line1 = `input: ${JSON.stringify(challenge.testCases[0].input)}`

  
  return (
    <>

      {userSubmission.submissionCode}
    </>
  );
};
const compiled = transform(formatSubmissionTSX.toString());


console.log(compiled.code);



const formattedFunction = new Function(compiled.code);
const formatSubmission = (challenge, userSubmission) => formattedFunction(challenge, userSubmission);

export default eval(compiled.code)