import React from 'react'
import { IoPerson, IoHeartOutline } from "react-icons/io5";
import { FaRegComment } from "react-icons/fa";
import { BsBookmark } from "react-icons/bs";
import { Link } from 'react-router-dom';
import moment from 'moment';


const Post = ({ content }) => {
    return (
        <Link to={"/post/" + content.postId} className='post cursor-pointer w-[650px] border '>
            <div className='post-author-cont'>
                <Link to={"/user/" + content.username}>
                    <div className='post-author-img'>
                        <IoPerson style={{ fontSize: "1rem", cursor: "pointer" }} />
                    </div>
                </Link>
                <div className='post-author-name cursor-pointer'>
                    <Link to={"/user/" + content.username}>
                        <div style={{ fontSize: "12px", textTransform: "capitalize" }}>{content.firstname} {content.lastname}</div>
                    </Link>
                    <div style={{ fontSize: "10px" }}>{moment.utc(content.updated_at).format('MMM DD YYYY HH:MM')}</div>
                </div>


            </div>
            <div className='text-xl post-title font-semibold'>{content.title}</div>
            <div className='pl-7 post-bottom'>
                <div className='flex gap-2'>
                    <div className='flex items-center gap-1 cursor-pointer post-likes'>
                        <div><IoHeartOutline className='text-sm' /></div>
                        <div className='text-xs font-light'>{content.reactionCount || 0} {content.reactionCount === 1 ? 'Reaction' : "Reactions"}</div>
                    </div>

                    <div className='flex items-center gap-1 cursor-pointer post-likes'>
                        <div><FaRegComment className='text-sm' /></div>
                        <div className='text-xs font-light'>{content.commentCount || 0} {content?.commentCount === 1 ? `Comment` : `Comments`}</div>
                    </div>
                </div>
                <div className='flex gap-1'>
                    <div className='cursor-pointer pr-5'>
                        <div><BsBookmark className='text-xs' /></div>
                        {/* <div><BsBookmarkFill className='text-xs' /></div> */}
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default Post