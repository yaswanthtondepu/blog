import React from 'react'


import { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoClose } from 'react-icons/io5';

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import Modal from './Modal';
import { useNavigate } from 'react-router-dom';



const CreatePost = () => {

    const mdParser = new MarkdownIt(/* Markdown-it options */);

    const [postTitle, setPostTitle] = useState('');
    const [postContentHtml, setPostContentHtml] = useState('');
    const [postContentText, setPostContentText] = useState('');
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    // Finish!
    function handleEditorChange({ html, text }) {
        // console.log('handleEditorChange', html, text);
        setPostContentHtml(html);
        setPostContentText(text);
    }
    function toggleModal() {
        if (postContentText.trim().length > 0 || postTitle.trim().length > 0) {
            setShowModal(true);
        }
        else {
            navigate("/");
        }
    }

    return (
        <div className='create-post'>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
                    <Link to="/" style={{ fontFamily: "Moon Dance", fontSize: "2.5rem", marginLeft: "2rem" }}>BlogYY</Link>
                    <div style={{ fontWeight: "600" }}>Create post</div>
                </div>
                <div style={{ marginRight: "2rem", padding: "5px", fontSize: "25px", cursor: "pointer" }}
                    className="close-icon" title='Close the editor' onClick={toggleModal}>
                    <IoClose />
                </div>
            </div>

            <div>

                <div className='editor-container1'>

                    <div>
                        <input type="text" placeholder="New post title here..." className='cp-title-inp'
                            value={postTitle} onChange={(e) => setPostTitle(e.target.value)} />
                    </div>

                    <div>
                        <MdEditor style={{ height: "calc(100vh - 300px)"}} renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} />
                    </div>

                </div>
            </div>

            <div className='cp-btn-container'>
                <div>
                    <button className='cp-publish-btn'>Publish</button>
                </div>
                <div>
                    <button className='cp-draft-btn'>Save as Draft</button>
                </div>
            </div>
            {showModal && <Modal title="You have unsaved changes"
                content="You've made changes to your post. Do you want to navigate to leave this page?"
                btn1="Yes, leave the page" btn2="No, keep editing" setShowModal={setShowModal} />}
        </div>




    )
}


export default CreatePost