import ChallengeDetailsView from "./ChallengeDetailsView";
import { useEffect, useState } from "react";
import data from "../../leetcode_challenges.json"
import "./Content.css"
import ChallengeOptions from "./ChallengeOptions";
const { io } = require("socket.io-client");

function UserView() {
  const [challenges, setChallenges] = useState(data);
  const [focusedChallengeIndex, setFocusedChallengeIndex] = useState(null);

  useEffect(() => {
    if(challenges.length != 0){
        setFocusedChallengeIndex(0)
    }
  }, [])
  return (
    <div id="content">
      {challenges.length != 0 ? <>
                                    <ChallengeOptions challenges={challenges} focusedChallengeIndex={focusedChallengeIndex} setFocusedChallengeIndex={setFocusedChallengeIndex}/>
                                    {focusedChallengeIndex != null ? <ChallengeDetailsView challenge={challenges[focusedChallengeIndex]} /> : null}
                                </> 
      : null}
    </div>
  );
}

export default UserView;
