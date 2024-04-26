import ChallengeDetailsView from "./ChallengeDetailsView";
import { useEffect, useState } from "react";
import data from "../../leetcode_challenges.json";
import "./Content.css";
import ChallengeOptions from "./ChallengeOptions";
import { useLogin } from "../../contexts/LoginContext";
const { io } = require("socket.io-client");

function UserView() {
  const [challenges, setChallenges] = useState(data);
  const [focusedChallengeIndex, setFocusedChallengeIndex] = useState(null);
  const { isLoggedIn, user, gameRoom, login, logout } = useLogin();

  useEffect(() => {
    setFocusedChallengeIndex(0);
  }, []);
  console.log({gameRoom})
  console.log({user})
  let content = <div id="joinForm" style={{display: "flex", justifyContent: "center", flexDirection: "column"}}>
                  <form onSubmit={function(event){
                    event.preventDefault();
                    login(document.getElementById('username').value, document.getElementById('gameroomId').value);
                  }}>
                    <h1 style={{textAlign: "center"}}>Join a session</h1>
                    <input type="text" id="username" placeholder="Username" />
                    <input type="text" id="gameroomId" placeholder="Game Room ID" />
                    <button>Join</button>
                  </form>
                </div>

  if (user != null) {
    content = <>
                <h1>gameRoom: {gameRoom.gameroomId}</h1>
                <ChallengeOptions challenges={challenges} focusedChallengeIndex={focusedChallengeIndex} setFocusedChallengeIndex={setFocusedChallengeIndex}/>
                <ChallengeDetailsView challenge={challenges[focusedChallengeIndex]} /> 
              </> 
  }

  return (
    <div id="content">
      {content}
    </div>
  );
}

export default UserView;
