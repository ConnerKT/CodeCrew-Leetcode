import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useLogin } from '../../../../contexts/LoginContext';
import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';

import ChallengeSelectMenu from './ChallengeSelectMenu';
import CodeEditor from './CodeEditor';
import ChallengeDescription from './ChallengeDescription';
import './ChallengeDetailsView.css';

function CodingChallengesView() {
    const { user, gameRoom } = useLogin();
    const [focusedChallengeIndex, setFocusedChallengeIndex] = useState(null);
    const [focusedChallenge, setFocusedChallenge] = useState(null);
    const [editorContentsStore, setEditorContentsStore] = useState({});
    const globalEditorContentsStore = useRef({});
    const { isPending, data: challenges } = useQuery({
        queryKey: ['challenges', gameRoom.roomData.problems],
        queryFn: async () => {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/problemsbyid`, {
                ids: gameRoom.roomData.challenges
            }, { withCredentials: true });
            setFocusedChallengeIndex(0); // Set the first challenge as focused when data is fetched
            return response.data;
        }
    });

    useEffect(() => {
        if (focusedChallengeIndex !== null) {
            // console.log("focusedChallengeIndex", focusedChallengeIndex)
            if (focusedChallenge!=null) {
                // console.log("currentStore", editorContentsStore)
                globalEditorContentsStore.current[focusedChallenge._id] = editorContentsStore;
            }
            let challenge = challenges[focusedChallengeIndex];
            let languages = Object.keys(challenge.functionSignatures);
            let editorContents = globalEditorContentsStore.current[challenge._id]
            if (!editorContents) {

                editorContents = languages.reduce((acc, lang) => ({ ...acc,  [lang]: `\n\n${challenge.functionSignatures[lang]}\n` }), {})
            }
            setEditorContentsStore(editorContents)
            setFocusedChallenge(challenge);
            console.log("globalEditorContentsStore.current", globalEditorContentsStore.current)
        }
    }, [focusedChallengeIndex]);

    // console.log("editorContentsStore", editorContentsStore)

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
                                <ChallengeDescription challenge={focusedChallenge} />
                                <CodeEditor challenge={focusedChallenge} editorContentsStore={editorContentsStore} setEditorContentsStore={setEditorContentsStore} />
                            </div>
                            <h1 id="linkToLeetcode">
                                <a href={`https://leetcode.com/problems/${focusedChallenge.title.toLowerCase().replace(/\s+/g, '-')}/`}>
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
