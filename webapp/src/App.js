import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Paper from "@mui/material/Paper";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="App">
      <Header />

      <div id="content">
        <div id="challengeOptionContainer">
          <div className="challengeOption">
            <h1>Challenge 1</h1>
          </div>
          <div className="challengeOption">
            <h1>Challenge 2</h1>
          </div>
          <div className="challengeOption">
            <h1>Challenge 3</h1>
          </div>
        </div>

        <Paper id="challengeDetailsContainer">
          <h1 id="challengeTitle">Rotated Sorted Array Search</h1>
          <div id="detailsSubContainer">
            <div className="challengeDescription">
              <h1>Description</h1>
              <p>
                Suppose an array sorted in ascending order is rotated at some
                pivot unknown to you beforehand (i.e., [0,1,2,4,5,6,7] might
                become [4,5,6,7,0,1,2]). You are given a target value to search.
                If found in the array, return its index; otherwise, return -1.
                You may assume no duplicate exists in the array. Your
                algorithm's runtime complexity must be in the order of O(log n).
                If found in the array, return its index; otherwise, return -1.
                You may assume no duplicate exists in the array. Your
                algorithm's runtime complexity must be in the order of O(log n).
                If found in the array, return its index; otherwise, return -1.
                You may assume no duplicate exists in the array. Your
                algorithm's runtime complexity must be in the order of O(log n).
                If found in the array, return its index; otherwise, return -1.
                You may assume no duplicate exists in the array. Your
                algorithm's runtime complexity must be in the order of O(log n).
                If found in the array, return its index; otherwise, return -1.
                You may assume no duplicate exists in the array. Your
                algorithm's runtime complexity must be in the order of O(log n).
                If found in the array, return its index; otherwise, return -1.
                You may assume no duplicate exists in the array. Your
                algorithm's runtime complexity must be in the order of O(log n).
                If found in the array, return its index; otherwise, return -1.
                You may assume no duplicate exists in the array. Your
                algorithm's runtime complexity must be in the order of O(log n).
                If found in the array, return its index; otherwise, return -1.
                You may assume no duplicate exists in the array. Your
                algorithm's runtime complexity must be in the order of O(log n).
                If found in the array, return its index; otherwise, return -1.
                You may assume no duplicate exists in the array. Your
                algorithm's runtime complexity must be in the order of O(log n).
                If found in the array, return its index; otherwise, return -1.
                You may assume no duplicate exists in the array. Your
                algorithm's runtime complexity must be in the order of O(log n).
                If found in the array, return its index; otherwise, return -1.
                You may assume no duplicate exists in the array. Your
                algorithm's runtime complexity must be in the order of O(log n).
                If found in the array, return its index; otherwise, return -1.
                You may assume no duplicate exists in the array. Your
                algorithm's runtime complexity must be in the order of O(log n).
                If found in the array, return its index; otherwise, return -1.
                You may assume no duplicate exists in the array. Your
                algorithm's runtime complexity must be in the order of O(log n).
                If found in the array, return its index; otherwise, return -1.
                You may assume no duplicate exists in the array. Your
                algorithm's runtime complexity must be in the order of O(log n).
                If found in the array, return its index; otherwise, return -1.
                You may assume no duplicate exists in the array. Your
                algorithm's runtime complexity must be in the order of O(log n).
                If found in the array, return its index; otherwise, return -1.
                You may assume no duplicate exists in the array. Your
                algorithm's runtime complexity must be in the order of O(log n).
              </p>
            </div>
            <div className="challengeDescription">
              <h1>Example Input/Output</h1>
              <div className="example">
                <div className="exampleInput">
                  <h2>Input</h2>
                  <p>nums = [4,5,6,7,0,1,2], target = 0</p>
                </div>
                
                <div className="exampleOutput">
                  <h2>Output</h2>
                  <p>4</p>
                </div>
              </div>
              <div className="example">
                <div className="exampleInput">
                  <h2>Input</h2>
                  <p>nums = [4,5,6,7,0,1,2], target = 0</p>
                </div>
                <div className="exampleOutput">
                  <h2>Output</h2>
                  <p>4</p>
                </div>
              </div>
              <div className="example">
                <div className="exampleInput">
                  <h2>Input</h2>
                  <p>nums = [4,5,6,7,0,1,2], target = 0</p>
                </div>
                <div className="exampleOutput">
                  <h2>Output</h2>
                  <p>4</p>
                </div>
              </div>
            </div>
          </div>
          <h1 id="linkToLeetcode"><a href={`https://leetcode.com/problems/${"Search in Rotated Sorted Array".toLowerCase().replace(/\s+/g, "-")}/`}> View it on Leetcode </a></h1>
        </Paper>
      </div>
    </div>
  );
}

export default App;
