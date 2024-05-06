import "./ChallengeSelectMenu.css"

function ChallengeSelectMenu({challenges, focusedChallengeIndex, setFocusedChallengeIndex}){
    return <div id="ChallengeSelectMenuContainer">
                {challenges.map((challenge, index) => {
                    return <div className={focusedChallengeIndex == index ? "focusedChallengeSelectMenu": "ChallengeSelectMenu"} onClick={()=>{setFocusedChallengeIndex(index)}}>
                                <h1>Challenge {index+1}</h1>
                            </div>
                })}
            </div>
}

export default ChallengeSelectMenu