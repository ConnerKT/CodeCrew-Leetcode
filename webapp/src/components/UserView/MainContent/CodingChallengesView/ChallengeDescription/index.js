import "./ChallengeDescription.css";

function ChallengeDescription({challenge}){
    const createMarkup = (htmlContent) => {
        return { __html: htmlContent };
    };
    return <div className="challengeDescription">
                <h1>Description</h1>
                <p dangerouslySetInnerHTML={createMarkup(challenge.description)}></p>
            </div>
}

export default ChallengeDescription;