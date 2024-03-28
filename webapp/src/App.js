import React, { useState } from "react";
import Header from "./components/Header/Header";
import Content from "./components/Content/index";
import Admin from './pages/Admin/Admin'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/admin" element={<Admin/>}></Route>
          <Route path="/" element={<Content/>}>
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
