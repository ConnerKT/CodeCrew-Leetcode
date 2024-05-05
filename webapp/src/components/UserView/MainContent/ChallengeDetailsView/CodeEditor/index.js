import React, { useRef, useEffect, useState } from 'react';
import Editor, { useMonaco } from '@monaco-editor/react';
// import './CodeEditor.css';

const CodeEditor = ({functionSignatures, sampleInputOutput}) => {
    const editorRef = useRef(null);
    const monaco = useMonaco();
    const [isEditorReady, setEditorReady] = useState(false); // State to track editor readiness
    const defaultValue = 
`

${functionSignatures.javascript}


`

    useEffect(() => {
        if (editorRef.current && monaco && isEditorReady) {
            const model = editorRef.current.getModel();

            // Set up the first line as read-only
            const decorations = editorRef.current.deltaDecorations([], [
                {
                    range: new monaco.Range(1, 1, 1, Infinity),  // Only the first line
                    options: { isWholeLine: true, className: 'readOnly' }
                }
            ]);

            // Event listener to prevent modifications in the read-only area
            editorRef.current.onKeyDown(e => {
              console.log("Keydown event", e);
              let position = editorRef.current.getPosition();
              
                if (decorations.some(decoration =>
                    model.getDecorationRange(decoration).containsPosition(position))) {
                      console.log("Preventing default");
                    e.preventDefault();
                }
            });
        }
    }, [monaco, isEditorReady]);  // Update useEffect dependency

    return (
        <div className="editor">
            <Editor
                onMount={(editor) => {
                    editorRef.current = editor;
                    setEditorReady(true); // Set the editor ready state to true when mounted
                    console.log("Editor mounted!");
                }}
                defaultLanguage="javascript"
                defaultValue={defaultValue}
                theme="vs-dark"
                options={{
                    lineNumbers: "on",
                    scrollBeyondLastLine: false,
                    readOnly: false,
                }}
            />
        </div>
    );
};

export default CodeEditor;
