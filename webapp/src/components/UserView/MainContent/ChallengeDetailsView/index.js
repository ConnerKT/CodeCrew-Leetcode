import Paper from "@mui/material/Paper";
import "./ChallengeDetailsView.css";
import { useLogin } from "../../../../contexts/LoginContext";
import CodeEditor from "./CodeEditor";
import { extractInputOutput } from "./utils";
function ChallengeDetailsView({ challenge }) {
    const createMarkup = (htmlContent) => {
        return { __html: htmlContent };
    };
    let sampleInputOutput = extractInputOutput(challenge.description);
    console.log(challenge)

    return (
        <Paper id="challengeDetailsContainer">
            <h1 id="challengeTitle">{challenge.title}</h1>
            <div id="detailsSubContainer">
                <div className="challengeDescription">
                    <h1>Description</h1>
                    <p dangerouslySetInnerHTML={createMarkup(challenge.description)}></p>
                </div>
                
                <CodeEditor sampleInputOutput={sampleInputOutput} functionSignatures={challenge.functionSignatures}/>

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
