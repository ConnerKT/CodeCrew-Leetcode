import React, { useState } from 'react';
import "./App.css";
import Header from "./components/Header/Header";
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="App">
      <Header />
      <div id="ContentSidebar" style={{ width: isSidebarOpen ? '10%' : '0%' }}>
        <button id="toggleButton">
          <KeyboardDoubleArrowRightIcon onClick={toggleSidebar}/>
        </button>
      </div>



      <div id="content" style={{ width: isSidebarOpen ? "90%": "calc(100% - 45px)",display: 'inline-block', backgroundColor: "red",  height: "100%"}}>
        {/* Your content here */}
      </div>
    </div>
  );
}

export default App;
