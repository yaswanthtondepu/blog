import React from 'react'
import { useParams } from 'react-router-dom'
import NavBar from './NavBar'
import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { IoPerson } from 'react-icons/io5';
import moment from 'moment';
import Comments from './Comments'
import Like from './Like'
import { SlLike } from 'react-icons/sl'
import { BsBookmark } from 'react-icons/bs'
import { FaRegComments } from 'react-icons/fa'
import { AiOutlineDelete } from 'react-icons/ai'
import Modal from './Modal'
var Loader = require('react-loader');

const PostContainer = () => {
    const mdParser = new MarkdownIt(/* Markdown-it options */);
    const { postId } = useParams();
    const [post, setPost] = useState({});
    const [loaded, setLoaded] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalResponse, setModalResponse] = useState(0);
    const [isPostBookmarked, setIsPostBookmarked] = useState( post.isBookmarked === 1 ? true : false);
    const commentRef = useRef(null);
    const navigate = useNavigate();
    const obj = { html: true, md: false, menu: false };
    let user = JSON.parse(sessionStorage.getItem('user'));

    useEffect(() => {
        if (modalResponse === 1) {
            deletePost();
        }
        setShowModal(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [modalResponse]);
    useEffect(() => {

        axios({
            method: 'post',
            url: `${process.env.REACT_APP_URL}/post/getpostbyid`,
            headers: {
                'content-type': 'application/json'
            },
            data: {
                post: {
                    id: Number(postId),
                    userId: user?.id || 0
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
    }, [postId, navigate, user?.id]);

    useEffect(() => {

        if (post) {
            console.log(post);
            document.title = post.title;
            if (post.isBookmarked === 1) {
                setIsPostBookmarked(true);
            }
            else {
                setIsPostBookmarked(false);
            }
        }
        if (!post) {
            navigate("/");
        }

    }, [post, navigate])

    const executeScroll = () => {
        commentRef.current.scrollIntoView({ behavior: "smooth" })
    }

    function deletePost() {
        axios({
            method: 'post',
            url: `${process.env.REACT_APP_URL}/post/deletepostbyid`,
            headers: {
                'content-type': 'application/json'
            },
            data: {
                post: {
                    id: Number(postId),
                    userId: user.id
                }
            }
        })
            .then(result => {
                if (result.data.msg) {
                    alert("Post deleted successfully");
                    navigate("/");
                }
                else {
                    alert("Something went wrong. Please try again later");
                    return;
                }
            })
            .catch(error => {
                alert("Something went wrong. Please try again later");
            });
    }

    function toggleBookmark() {
        if (!user) {
            alert("Please login to bookmark posts");
            return;
        }
        axios({
            method: 'post',
            url: `${process.env.REACT_APP_URL}/bookmark/bookmarkpost`,
            headers: {
                'content-type': 'application/json'
            },
            data: {
                post: {
                    postId: Number(postId),
                    userId: user.id
                }
            }
        })
            .then(result => {
                if (result.data.msg) {
                    setPost({ ...post, isBookmarked: post.isBookmarked === 0 ? 1 : 0});
                    setIsPostBookmarked(!isPostBookmarked);
                }
                else {
                    alert("Something went wrong. Please try again later");
                    return;
                }
            })
            .catch(error => {
                alert("Something went wrong. Please try again later");
            });

    }

    console.log(postId);
    return (
        <>
            <NavBar />
            <div className="post-content">
                <Loader loaded={loaded} />

                <div className='post-reactions'>
                    <Like size="60px" fontSize='30px' Icon={SlLike} bg_color="bg-red-200" text_color='text-red-500' border_color='border-red-500' fill='fill-red-500' />
                    <div onClick={toggleBookmark}>
                        {isPostBookmarked && <Like size="60px" fontSize='30px' Icon={BsBookmark} bg_color="bg-blue-200" text_color='text-blue-500' border_color='border-blue-500' fill='fill-blue-500' bookmarked={true} />}
                        {!isPostBookmarked && <Like size="60px" fontSize='30px' Icon={BsBookmark} bg_color="bg-blue-200" text_color='text-blue-500' border_color='border-blue-500' fill='fill-blue-500' bookmarked={false} />}
                    </div>

                    <div onClick={executeScroll}>
                        <Like size="60px" fontSize='30px' Icon={FaRegComments} bg_color="bg-none" text_color='text-yellow-500' border_color='border-none' fill='fill-yellow-500' />
                    </div>
                    {user?.id === post?.author_id && <div onClick={() => setShowModal(true)}>
                        <Like size="60px" fontSize='30px' Icon={AiOutlineDelete} bg_color="bg-none" text_color='text-red-500' border_color='border-none' fill='fill-red-500' />
                    </div>}
                </div>
                <div className='lg:w-3/5 '>
                    <div className='rounded bg-white  lg:px-20 px-5 py-5 border' >
                        <div className='post-author-cont'>
                            <div className='post-author-img my-8'>
                                <IoPerson style={{ fontSize: "2.3rem", cursor: "pointer" }} />
                            </div>
                            <div className='post-author-name cursor-pointer'>
                                <div style={{ fontSize: "16px", textTransform: "capitalize" }}>{post?.firstname || "First"} {post?.lastname || "Last"}</div>
                                <div style={{ fontSize: "14px" }}>{moment.utc(post?.updated_at).format('MMM DD YYYY HH:MM')}</div>
                            </div>


                        </div>
                        <div className='font-bold text-4xl'>{post?.title}</div>
                        <div>

                            {post?.contenttext ? <MdEditor
                                value={post?.contenttext}
                                renderHTML={text => mdParser.render(text)}
                                view={obj} style={{ border: "0px" }}
                            /> : <div></div>}


                        </div>
                    </div>

                    <div ref={commentRef}>
                        <Comments post={post} />
                    </div>

                    {showModal && <Modal title="Delete Post"
                        content="Are you sure you want to delete this post? This action cannot be undone."
                        btn1="Yes, Delete Post" btn2="Nah! I changed my mind" setShowModal={setShowModal} setModalResponse={setModalResponse} />}
                </div>
                <div style={{ flex: "1" }}></div>
            </div>
        </>
    );
}

export default PostContainer