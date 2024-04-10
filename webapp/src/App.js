import React, { useState } from "react";
import Header from "./components/Header/Header";
import UserView from "./components/UserView";
import AdminView from "./components/AdminView";
import { LoginProvider } from "./contexts/LoginContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>

          <Route path="/admin" element={<AdminView />}></Route>
          
          <Route path="/" element={<LoginProvider>
                                      <UserView />
                                   </LoginProvider>}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
