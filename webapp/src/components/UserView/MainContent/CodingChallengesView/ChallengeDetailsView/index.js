import Paper from "@mui/material/Paper";
import "./ChallengeDetailsView.css";
import CodeEditor from "./CodeEditor";
import ChallengeDescription from "./ChallengeDescription";
function ChallengeDetailsView({ challenge }) {
    const createMarkup = (htmlContent) => {
        return { __html: htmlContent };
    };
    console.log(challenge)

    return (
        <Paper id="challengeDetailsContainer">
            <h1 id="challengeTitle">{challenge.title}</h1>
            <div id="detailsSubContainer">
                <ChallengeDescription challenge={challenge}/>
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
