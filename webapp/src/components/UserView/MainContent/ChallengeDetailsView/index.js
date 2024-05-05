import Paper from "@mui/material/Paper";
import "./ChallengeDetailsView.css";
import { useLogin } from "../../../../contexts/LoginContext";
import CodeEditor from "./CodeEditor";
function ChallengeDetailsView({ challenge }) {
    const { isLoggedIn, user, gameRoom, login, logout } = useLogin();
    const createMarkup = (htmlContent) => {
        // Ideally, sanitize HTML content here to prevent XSS
        return { __html: htmlContent };
    };

    console.log("challenge", challenge);

    return (
        <Paper id="challengeDetailsContainer">
            <h1 id="challengeTitle">{challenge.title}</h1>
            <div id="detailsSubContainer">
                <div className="challengeDescription">
                    <h1>Description</h1>
                    <p dangerouslySetInnerHTML={createMarkup(challenge.description)}></p>
                </div>
                <CodeEditor challenge={challenge}/>

            </div>
            <h1 id="linkToLeetcode">
                <a href={`https://leetcode.com/problems/${challenge.title.toLowerCase().replace(/\s+/g, "-")}/`}>
                    View it on Leetcode
                </a>
            </h1>
        </Paper>
    );
}

export default ChallengeDetailsView;
