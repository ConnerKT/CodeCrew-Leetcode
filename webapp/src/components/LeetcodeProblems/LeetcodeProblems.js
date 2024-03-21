import React, { useState } from "react";
import "../LeetcodeProblems/LeetcodeProblems.css";
import Data from '../../leetcode_challenges.json'

function LeetcodeProblems() {
  const [selectedProblem, setSelectedProblem] = useState(null);

  const handleSelectProblem = (event) => {
    const problemId = parseInt(event.target.value);
    const problem = Data.find(problem => problem.id === problemId);
    setSelectedProblem(problem);
  };

  return (
    <div id="problemContainer" className="container">
      <select onChange={handleSelectProblem} value={selectedProblem ? selectedProblem.id : ""}>
        <option value="">Select a problem</option>
        {Data.map((problem) => (
          <option key={problem.id} value={problem.id}>
            {problem.title}
          </option>
        ))}
      </select>
      {selectedProblem && (
        <>
          <div id="problemName" className="title">
            <h1>{selectedProblem.title}</h1>
          </div>
          <div className="box-container">
            <div id="problemDescription" className="content">
              {selectedProblem.description}
            </div>
            {selectedProblem.examples && (
              <div id="problemExample" className="content">
                {selectedProblem.examples.map((example, index) => (
                  <div key={index}>
                    <strong>Example {index + 1}:</strong> Input: {example.input} Output: {example.output}
                  </div>
                ))}
              </div>
            )}
          </div>
          <a href={`https://leetcode.com/problems/${selectedProblem.title.toLowerCase().replace(/\s+/g, "-")}/`}>
            Problem Link
          </a>
        </>
      )}
    </div>
  );
}

export default LeetcodeProblems;
