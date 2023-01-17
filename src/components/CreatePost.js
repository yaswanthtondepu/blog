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
import axios from 'axios';
var Loader = require('react-loader');




const CreatePost = () => {

    const mdParser = new MarkdownIt(/* Markdown-it options */);

    const [postTitle, setPostTitle] = useState('');
    const [postContentHtml, setPostContentHtml] = useState('');
    const [postContentText, setPostContentText] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [loaded, setLoaded] = useState(true);
    const navigate = useNavigate();
    console.log(postContentHtml)

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
    function publishPost(status) {
        setLoaded(false);
        const id = JSON.parse(sessionStorage.getItem('user')).id;
        const newPost = {
            title: postTitle,
            content: postContentHtml,
            contentText: postContentText,
            status: status,
            authorId: id
        }
        axios({
            method: 'post',
            url: `${process.env.REACT_APP_URL}/post/createpost`,
            headers: {
                'content-type': 'application/json'
            },
            data: { newPost }
        })
            .then(result => {
                setLoaded(true);
                console.log(result.data);
                if (result.data.msg) {
                    alert("Post published successfully");
                    navigate("/");
                }
                else if (result.data.error) {
                    if (result.data.error.code === 1) {
                        alert("Something went wrong. Please try again later");
                        return;
                    }
                }
                else {
                    alert("Something went wrong. Please try again later");
                    return;
                }
            })
            .catch(error => {
                setLoaded(true);
                console.log(error);
                alert("Something went wrong. Please try again later");
                return;
            });
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
            <Loader loaded={loaded} />

            <div>

                <div className='editor-container1'>

                    <div>
                        <input type="text" placeholder="New post title here..." className='cp-title-inp'
                            value={postTitle} onChange={(e) => setPostTitle(e.target.value)} />
                    </div>

                    <div>
                        <MdEditor style={{ height: "calc(100vh - 300px)" }} renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} />
                    </div>

                </div>
            </div>

            <div className='cp-btn-container'>
                <div>
                    <button className='cp-publish-btn' onClick={() => publishPost(1)}>Publish</button>
                </div>
                <div>
                    <button className='cp-draft-btn' onClick={() => publishPost(0)}>Save as Draft</button>
                </div>
            </div>
            {showModal && <Modal title="You have unsaved changes"
                content="You've made changes to your post. Do you want to navigate to leave this page?"
                btn1="Yes, leave the page" btn2="No, keep editing" setShowModal={setShowModal} />}
        </div>




    )
}


export default CreatePost