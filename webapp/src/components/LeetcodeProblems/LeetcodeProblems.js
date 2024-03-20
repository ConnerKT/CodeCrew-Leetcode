import React from 'react'
import '../LeetcodeProblems/LeetcodeProblems.css'; 

function LeetcodeProblems() {
  return (
    <div id="problemContainer" class="container">
    <div id="problemName" class="title">
      <h1>Palindrome Number</h1>
    </div>
    <div class="box-container">
      <div id="problemDescription" class="content">
      Given an integer x, return true if x is a
palindrome
, and false otherwise.
      </div>
      <div id="problemExample" class="content">
      Example 1:

Input: x = 121
Output: true
Explanation: 121 reads as 121 from left to right and from right to left.
<br></br>
Example 2:

Input: x = -121
Output: false
Explanation: From left to right, it reads -121. From right to left, it becomes 121-. Therefore it is not a palindrome.
<br></br>
Example 3:

Input: x = 10
Output: false
Explanation: Reads 01 from right to left. Therefore it is not a palindrome.

 
      </div>
    </div>
  </div>
  

  )
}

export default LeetcodeProblems
