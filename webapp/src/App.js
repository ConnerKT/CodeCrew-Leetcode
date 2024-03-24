import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Content from "./components/Content";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };


  return (
    <div className="App">
      <Header />
      <Content />
    </div>
  );
}

export default App;
