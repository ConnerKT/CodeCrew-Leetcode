import React, { useRef, useEffect, useState } from 'react';
import { Box, Select, MenuItem } from '@mui/material';
import { AppBar, Toolbar, Fab, Stack  } from '@mui/material';
import Editor, { useMonaco } from '@monaco-editor/react';
import './CodeEditor.css';
import PublishIcon from '@mui/icons-material/Publish';


const CodeEditor = ({ functionSignatures }) => {
    const editorRef = useRef(null);
    const monaco = useMonaco();
    const [isEditorReady, setEditorReady] = useState(false);
    const languages = Object.keys(functionSignatures);
    const [language, setLanguage] = useState('javascript');
    let editorContents = languages.reduce((acc, lang) => ({ ...acc, [lang]: `\n\n${functionSignatures[lang]}\n` }), {})
    const [editorContentsStore, setEditorContentsStore] = useState(editorContents);

    useEffect(() => {
      if (editorRef.current && monaco && isEditorReady) {

  
          const model = editorRef.current.getModel();
          if (model) {
              // Setup read-only decorations
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
          }
          
      }
  }, [monaco, isEditorReady, language, editorContents]);
  

    const handleLanguageChange = (event) => {
        const newLanguage = event.target.value;
        setEditorContentsStore({...editorContentsStore, [language]: editorRef.current.getValue()});
        setLanguage(newLanguage);
    };

    const handleSubmit = () => {
      console.log('Submit:', editorContentsStore[language]);
  };

    return (
        <Box className="editor" position={"relative"}>
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

                }}
            />
            <Fab color="primary" variant='extended' aria-label="submit" sx={{
                position: 'absolute', bottom: 34, right: 34,
                backgroundColor: 'rgb(35, 56, 91)', // Dark blue
                color: 'white', // Icon and text color
                '&:hover': {
                    backgroundColor: 'rgb(25, 46, 81)' // Darker blue on hover
                }
            }} onClick={handleSubmit}>
                <Stack direction="column" alignItems="center" spacing={-0.3}>
                    <PublishIcon />
                    <div>Submit</div>
                </Stack>
            </Fab>

        </Box>
    );
};

export default CodeEditor;
