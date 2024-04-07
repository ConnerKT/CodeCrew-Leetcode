import React, { useState } from "react";
import Header from "./components/Header/Header";
import UserView from "./components/UserView";
import AdminView from "./components/AdminView";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/admin" element={<AdminView />}></Route>
          <Route path="/" element={<UserView />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
