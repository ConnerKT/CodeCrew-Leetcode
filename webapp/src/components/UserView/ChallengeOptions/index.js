import "./ChallengeOptions.css"

function ChallengeOptions({challenges, focusedChallengeIndex, setFocusedChallengeIndex}){
    return <div id="challengeOptionContainer">
                {challenges.map((challenge, index) => {
                    return <div className={focusedChallengeIndex == index ? "focusedChallengeOption": "challengeOption"} onClick={()=>{setFocusedChallengeIndex(index)}}>
                                <h1>Challenge {index+1}</h1>
                            </div>
                })}
            </div>
}

export default ChallengeOptions