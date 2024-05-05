import Paper from "@mui/material/Paper";
import "./ChallengeDetailsView.css"
import { useLogin } from "../../../../contexts/LoginContext";

function ChallengeDetailsView({challenge}){
    const { isLoggedIn, user, gameRoom, login, logout } = useLogin();

    console.log("challenge", challenge)
    return <Paper id="challengeDetailsContainer">
                <h1 id="challengeTitle">{challenge.title}</h1>
                <div id="detailsSubContainer">
                    <div className="challengeDescription">
                        <h1>Description</h1>
                        <p dangerouslySetInnerHTML={{"__html": challenge.description}}></p>
                    </div>
                    <div className="challengeDescription">
                        <h1>Example Input/Output</h1>

                    </div>
                </div>
                <h1 id="linkToLeetcode"><a href={`https://leetcode.com/problems/${challenge.title.toLowerCase().replace(/\s+/g, "-")}/`}> View it on Leetcode </a></h1>
            </Paper>
}

export default ChallengeDetailsView