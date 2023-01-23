import React, { useState, useEffect } from 'react'
import NavBar from './NavBar'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { IoPerson } from "react-icons/io5";
import moment from 'moment';
import Post from './Post';
var Loader = require('react-loader');



const UserProfilePage = () => {
    const { userName } = useParams();
    const [userDetails, setUserDetails] = useState({});
    const [userPosts, setUserPosts] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        axios({
            method: 'post',
            url: `${process.env.REACT_APP_URL}/user/getuserbyusername`,
            headers: {
                'content-type': 'application/json'
            },
            data: {
                user: {
                    userName: userName
                }
            }
        })
            .then(result => {
                console.log(result.data[0]);
                setLoaded(true);
                if (result.data) {
                    setUserDetails(result.data[0]);
                }
                else if (result.data.error) {
                    alert("Something went wrong. Please try again later");
                    navigate("/");
                }
            })
            .catch(error => {
                console.log(error);
                alert("Something went wrong. Please try again later");
                navigate("/");
            });


    }, [userName, navigate])

    useEffect(() => {
        if (!userDetails.id) return;
        axios({
            method: 'post',
            url: `${process.env.REACT_APP_URL}/post/getpostbyuserid`,
            headers: {
                'content-type': 'application/json'
            },
            data: {
                author: {
                    id: userDetails.id
                }
            }
        })
            .then(result => {
                console.log(result.data);
                if (result.data) {
                    setUserPosts(result.data.filter(post => post.isPublished === 1));
                }
                else if (result.data.error) {
                    alert("Could not fetch posts. Please try again later");
                }
            })
            .catch(error => {
                console.log(error);
                alert("Could not fetch posts. Please try again later");
            });
    }, [userDetails])
    return (
        <div>
            <NavBar />
            <Loader loaded={loaded} />
            <div className='user-profile-page'>
                <div className='bg-black h-36 w-100 relative flex justify-center'>

                <div className='user-details flex justify-center items-center absolute'>
                    <div className='user-details-img'>
                        <IoPerson style={{ fontSize: "4rem", color:"#fff"}} />
                    </div>

                    <div className='font-semibold capitalize'>{userDetails?.firstname} {userDetails?.lastname}</div>
                        {userDetails?.joined && <div>Joined on {moment.utc(userDetails?.joined).format('MMM DD YYYY HH:MM')}</div>}
                        {!userDetails?.joined && <div>Founder & Developer of BlogYY</div>}
                </div>
                </div>
                <div className='flex justify-center user-posts'>
                    <div className='crayons-card'>
                        <div>{userPosts?.length} {userPosts?.length ===1 ? `post` : 'posts'} published</div>
                    </div>
                    <div>
                        {userPosts.map((post) => (<Post key={post.postId} content={post} />))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserProfilePage