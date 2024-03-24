import Paper from "@mui/material/Paper";
import challenges from "../../leetcode_challenges.json"
let challenge = challenges[0]

function Content() {
    return <div id="content">
                <div id="challengeOptionContainer">
                    <div className="challengeOption">
                        <h1>Challenge 1</h1>
                    </div>
                    <div className="challengeOption">
                        <h1>Challenge 2</h1>
                    </div>
                    <div className="challengeOption">
                        <h1>Challenge 3</h1>
                    </div>
                </div>
                <Paper id="challengeDetailsContainer">
                <h1 id="challengeTitle">{challenge.title}</h1>
                <div id="detailsSubContainer">
                    <div className="challengeDescription">
                    <h1>Description</h1>
                    <p>
                        {challenge.description}
                    </p>
                    </div>
                    <div className="challengeDescription">
                    <h1>Example Input/Output</h1>
                    {challenge.examples.map((example) => {
                        return <div className="example">
                                <div className="exampleInput">
                                <h2>Input</h2>
                                <p>{example.input}</p>
                                </div>
                                <div className="exampleOutput">
                                <h2>Output</h2>
                                <p>{example.output}</p>
                                </div>
                            </div>
                    })}
                    </div>
                </div>
                <h1 id="linkToLeetcode"><a href={`https://leetcode.com/problems/${challenge.title.toLowerCase().replace(/\s+/g, "-")}/`}> View it on Leetcode </a></h1>
                </Paper>
            </div>
}

export default Content