import React, { useRef, useEffect, useState } from 'react';
import { Box, Select, MenuItem, CircularProgress } from '@mui/material';
import { AppBar, Toolbar, Fab, Stack  } from '@mui/material';
import Editor, { useMonaco } from '@monaco-editor/react';
import './CodeEditor.css';
import PublishIcon from '@mui/icons-material/Publish';
import { useLogin } from '../../../../../contexts/LoginContext';
import { StrictMode } from 'react';


const CodeEditor = ({ challenge, editorContentsStore, setEditorContentsStore }) => {
    const monaco = useMonaco();
    const [isEditorReady, setEditorReady] = useState(false);
    const languages = challenge.functionSignatures.map(signature => signature.language);
    const [language, setLanguage] = useState("javascript");
    const languageRef = useRef(language); // Ref to track the current language
    const {user, gameRoom} = useLogin()
    const editorRef = useRef(null);
    const [awaitingSubmissionResult, setAwaitingSubmissionResult] = useState(false)
    useEffect(() => {
        languageRef.current = language;
    }, [language]);

    useEffect(() => {
      if (editorRef.current && monaco && isEditorReady) {

          const model = editorRef.current.getModel();
          if (model) {
              const decorations = editorRef.current.deltaDecorations([], [
                  { range: new monaco.Range(1, 1, 3, Infinity), options: { isWholeLine: true, className: 'readOnly' } }
              ]);
              // Prevent modification on read-only lines
              editorRef.current.onKeyDown(e => {
                  let position = editorRef.current.getPosition();
                  decorations.forEach(decoration => {
                      let range = model.getDecorationRange(decoration);
                      if (range && range.containsPosition(position)) {
                          e.preventDefault();
                      }
                  });
              });

              editorRef.current.onDidChangeModelContent(() => {
                setEditorContentsStore(prev => {
                    return { ...prev, [languageRef.current]: editorRef.current.getValue() }
                });
            });   
          }
      }
    }, [monaco, isEditorReady]);


    const handleLanguageChangeTriggered = useRef(false)
    const handleLanguageChange = (event) => {
        handleLanguageChangeTriggered.current = true
        const newLanguage = event.target.value;
        setEditorContentsStore(prev => {
        return { ...prev, [language]: editorRef.current.getValue() }
        });
        setLanguage(newLanguage);

    };

    const handleSubmit = () => {
        setAwaitingSubmissionResult(true)
        gameRoom.connection.timeout(5000).emit("submission", 
            {
                challenge: challenge,
                submission: {
                    challengeId: challenge._id,
                    submissionCode: editorRef.current.getValue(),
                    submissionLanguage: language,
                    userId: user.username
                },
            },
            function(err, submissionResult){
                setAwaitingSubmissionResult(false)
                console.log("Submission result:", submissionResult)
            }
        )
    };
    return (
        <>
            <AppBar position="static" color="default" elevation={1}>
                <Toolbar variant="dense" sx={{backgroundColor: "rgb(60, 60, 61)"}}>
                    <Select
                        value={language}
                        onChange={handleLanguageChange}
                        inputProps={{ 'aria-label': 'Without label' }}
                        sx={{ ml: 'auto', borderColor: 'rgb(255, 255, 255)', color: 'common.white',
                        backgroundColor: 'rgb(35, 56, 91)', // Dark blue
                        padding: '0px 0px',
                        height: '30px', // Set a fixed height for the button to ensure it is smaller
                        }} // Styling to fit AppBar aesthetics
                    >
                        {languages.map(lang => (
                            <MenuItem key={lang} value={lang}>{lang}</MenuItem>
                        ))}
                    </Select>
                </Toolbar>
            </AppBar>
            <Editor
                onMount={(editor) => {
                  editorRef.current = editor;
                  setEditorReady(true);
               
                }}
                language={language}
                value={editorContentsStore[language]}
                theme="vs-dark"
                options={{
                    lineNumbers: "on",
                    scrollBeyondLastLine: false,
                    readOnly: false,
                    minimap: { enabled: false },
                    contrastBorder: '#6fc3df',
                    wordWrap: 'on'
                }}
            />
            <Fab variant='extended' aria-label="submit" sx={{
                position: 'absolute', bottom: 34, right: 34,
                backgroundColor: awaitingSubmissionResult == false ? 'rgb(35, 56, 91)' : "rgb(171, 171, 171)", // Dark blue
                color: 'white', // Icon and text color
                '&:hover': {
                  backgroundColor: awaitingSubmissionResult == false ? 'rgb(35, 56, 91)' : "rgb(171, 171, 171)"
                }
            }} onClick={handleSubmit}>
                {awaitingSubmissionResult == false ? 
                                                    <Stack direction="column" alignItems="center" spacing={-0.3}>
                                                        <PublishIcon />
                                                        <div>Submit</div>
                                                    </Stack>
                                                    :
                                                    <CircularProgress color='info'/>
                                                    
                }
            </Fab>

        </>
    );
};

export default CodeEditor;
