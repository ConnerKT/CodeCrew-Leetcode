import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useLogin } from '../../../../contexts/LoginContext';
import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ScienceIcon from '@mui/icons-material/Science';
import ChallengeSelectMenu from './ChallengeSelectMenu';
import CodeEditor from './CodeEditor';
import Typography from '@mui/material/Typography';
import ChallengeDescription from './ChallengeDescription';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import Circle from '@mui/icons-material/Circle';
import './ChallengeDetailsView.css';
import { Tooltip } from '@mui/material';
import { pink, white } from '@mui/material/colors';

function CodingChallengesView() {
    const { user, gameRoom } = useLogin();
    const [focusedChallengeIndex, setFocusedChallengeIndex] = useState(null);
    const [focusedChallenge, setFocusedChallenge] = useState(null);
    const [editorContentsStore, setEditorContentsStore] = useState({});
    const globalEditorContentsStore = useRef({});
    const [showEditor, setShowEditor] = useState(true); // Toggle state for the editor

    const { isPending, data: challenges } = useQuery({
        queryKey: ['challenges', gameRoom.roomData.problems],
        queryFn: async () => {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/problemsbyid`, {
                ids: gameRoom.roomData.challenges.map((challenge) => challenge.id),
            }, { withCredentials: true });
            setFocusedChallengeIndex(0); // Set the first challenge as focused when data is fetched
            return response.data;
        }
    });

    useEffect(() => {
        if (focusedChallengeIndex !== null) {
            if (focusedChallenge != null) {
                globalEditorContentsStore.current[focusedChallenge._id] = editorContentsStore;
            }
            let challenge = challenges[focusedChallengeIndex];
            let languages = challenge.functionSignatures.map((signature) => signature.language);
            let editorContents = globalEditorContentsStore.current[challenge._id];
            if (!editorContents) {
                editorContents = languages.reduce(
                    (acc, lang, index) => ({ ...acc, [challenge.functionSignatures[index].language]: `\n\n${challenge.functionSignatures[index].value}\n` }),
                    {}
                );
            }
            setEditorContentsStore(editorContents);
            setFocusedChallenge(challenge);
        }
    }, [focusedChallengeIndex]);

    let testCaseBorderStyle = "3px solid rgb(35, 56, 91)"
    let submissionStatus = user.submissionsStore[focusedChallenge?._id]?.status
    console.log("submissionStatus", submissionStatus)
    if (submissionStatus == "SUCCESS") {
        testCaseBorderStyle = "3px solid green"
    }

    return (
        <>
            {isPending ? (
                <div className="loadingContainer">
                    <div className="spinnerWrapper">
                        <CircularProgress size="100px" />
                    </div>
                </div>
            ) : (
                <>
                    <ChallengeSelectMenu
                        challenges={challenges}
                        focusedChallengeIndex={focusedChallengeIndex}
                        setFocusedChallengeIndex={setFocusedChallengeIndex}
                    />
                    {focusedChallenge && (
                        <Paper id="challengeDetailsContainer">
                            <h1 id="challengeTitle">{focusedChallenge.title}</h1>

                            <div id="detailsSubContainer">
                                <div style={{ width: "100%", display: "flex", marginBottom: "6px ", justifyContent: "right" }}>
                                    <div style={{ display: 'flex', flexDirection: "column" }}>
                                        <div style={{ display: 'flex', alignItems: "center" }}>
                                            Experimental feature <ScienceIcon SX={{ display: "inline-block" }} />
                                        </div>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => setShowEditor(!showEditor)}>
                                            {showEditor ? "Close" : "Submit a solution"}
                                        </Button>


                                    </div>
                                </div>
                                <div id="detailsSubContainer2">
                                    <ChallengeDescription challenge={focusedChallenge} />

                                    {showEditor && (<>
                                        <Box className="editor" style={{backgroundColor: "rgb(30, 30, 30)"}} position={"relative"}>
                                            <CodeEditor
                                                challenge={focusedChallenge}
                                                editorContentsStore={editorContentsStore}
                                                setEditorContentsStore={setEditorContentsStore}
                                            />
                                        </Box>
                                        <div style={{ 
                                                display: "flex", 
                                                flexDirection: "column", 
                                                border: testCaseBorderStyle,
                                                borderLeft: "none"
                                            }}
                                        >
                                            {focusedChallenge.testCases.map((testCase, index) => {
                                                let testCasePassed = user.submissionsStore[focusedChallenge._id]?.testCasesPassed?.find((testCasePassed) => testCasePassed.id === testCase.id);
                                                
                                                
                                                return <Tooltip title={JSON.stringify(testCase.input)} placement="left">

                                                    <div key={index} style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "rgb(60, 60, 61)"}}>

                                                        {testCasePassed ? 
                                                            <CheckCircleRoundedIcon color="success"/> : (
                                                            !testCasePassed && user.submissionsStore[focusedChallenge._id]?.testCasesPassed != null ?
                                                                                        <CancelRoundedIcon sx={{color: "red"}} /> : <CircleOutlinedIcon sx={{color: "white"}} />

                                                        )}
                                                    </div>
                                                </Tooltip>
                                            })}
                                        </div>
                                    </>
                                    )}


                                </div>
                            </div>
                            <h1 id="linkToLeetcode">
                                <a
                                    href={`https://leetcode.com/problems/${focusedChallenge.title
                                        .toLowerCase()
                                        .replace(/\s+/g, '-')}/`}
                                >
                                    View it on Leetcode
                                </a>
                            </h1>
                        </Paper>
                    )}
                </>
            )}
        </>
    );
}

export default CodingChallengesView;
