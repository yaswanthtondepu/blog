import React from 'react'

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoClose } from 'react-icons/io5';

const CreatePost = () => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty())

    const onEditorStateChange = (editorState) => {
        setEditorState(editorState)
        console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())))
    }
    return (
        <div className='create-post'>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                    <Link to="/" style={{ fontFamily: "Moon Dance", fontSize: "2.5rem", marginLeft: "2rem" }}>BlogYY</Link>
                </div>
                <div style={{ marginRight: "2rem", padding: "5px", fontSize: "25px", cursor: "pointer" }} className="close-icon" title='Close the editor'>
                    <IoClose />
                </div>
            </div>

            <div className='editor-container'>

                <div>
                    <input type="text" placeholder="New post title here..." />
                </div>


                <div>

                    <Editor
                        editorState={editorState}
                        toolbarClassName="toolbarClassName"
                        wrapperClassName="wrapperClassName"
                        editorClassName="editorClassName"
                        onEditorStateChange={onEditorStateChange}
                    />
                </div>
            </div>
        </div>


    )
}

export default CreatePost