import React from 'react'
import { useParams } from 'react-router-dom'
import NavBar from './NavBar'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
// import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
var Loader = require('react-loader');

const PostContainer = () => {
    const mdParser = new MarkdownIt(/* Markdown-it options */);
    const { postId } = useParams();
    const [post, setPost] = useState({});
    const [loaded, setLoaded] = useState(false);
    const navigate = useNavigate();
    const obj = { html: true, md: true, menu: false };
    useEffect(() => {

        axios({
            method: 'post',
            url: `${process.env.REACT_APP_URL}/post/getpostbyid`,
            headers: {
                'content-type': 'application/json'
            },
            data: {
                post: {
                    id: Number(postId)
                }
            }
        })
            .then(result => {
                setLoaded(true);
                console.log(result.data);
                if (result.data) {
                    setPost(result.data[0]);
                }
                else if (result.data.error) {
                    alert("Post not found");
                    navigate("/");

                }
                else {
                    alert("Something went wrong. Please try again later");
                    navigate("/");
                    return;
                }
            })
            .catch(error => {
                console.log(error);
                setLoaded(true);
                alert("Something went wrong. Please try again later");
                navigate("/");
            });
    }, [postId, navigate]);

    useEffect(() => {

        if (post) {
            console.log(post);
            document.title = post.title;
        }

    }, [post])

    console.log(postId);
    return (
        <>
            <NavBar />
            <div className="post-content">
                <Loader loaded={loaded} />

                <div style={{ flex: "1" }}>left box</div>
                <div style={{ width: "40%", backgroundColor: "white", borderRadius: "20px" }}>
                    <div>{post.title}</div>
                    <div>


                        <MdEditor
                            renderHTML={text => mdParser.render(text)}
                            view={obj}
                        />

                    </div>
                </div>
                <div style={{ flex: "1" }}>right box</div>
            </div>
        </>
    );
}

export default PostContainer