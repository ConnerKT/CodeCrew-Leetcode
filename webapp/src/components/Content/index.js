import ChallengeDetailsView from "./ChallengeDetailsView";
import { useEffect, useState } from "react";
import data from "../../leetcode_challenges.json"
import "./index.css"
function Content() {
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
                                    <div id="challengeOptionContainer">
                                        {challenges.map((challenge, index) => {
                                            return <div className={focusedChallengeIndex == index ? "focusedChallengeOption": "challengeOption"} onClick={()=>{setFocusedChallengeIndex(index)}}>
                                                        <h1>Challenge {index+1}</h1>
                                                    </div>
                                        })}
                                    </div>
                                    {focusedChallengeIndex != null ? <ChallengeDetailsView challenge={challenges[focusedChallengeIndex]} /> : null}
                                </> 
      : null}
    </div>
  );
}

export default Content;
