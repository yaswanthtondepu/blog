import React from 'react'
import { IoPerson, IoHeartOutline } from "react-icons/io5";
import { FaRegComment } from "react-icons/fa";
import { BsBookmark} from "react-icons/bs";
import { Link } from 'react-router-dom';


const Post = ({ content }) => {
    return (
        <Link to={"/post/" + content.postId} className='post cursor-pointer'>
            <div className='post-author-cont'>
                <div className='post-author-img'>
                    <IoPerson style={{ fontSize: "1rem", cursor: "pointer" }} />
                </div>
                <div className='post-author-name cursor-pointer'>
                    <div style={{ fontSize: "12px" }}>{content.username}</div>
                    <div style={{ fontSize: "10px" }}>{content.updated_at}</div>
                </div>


            </div>
            <div className='post-title font-semibold'>{content.title}</div>
            <div className='pl-7 post-bottom'>
                <div className='flex gap-2'>
                    <div className='flex items-center gap-1 cursor-pointer post-likes'>
                        <div><IoHeartOutline className='text-sm' /></div>
                        <div className='text-xs font-light'>{content.reactionCount} Reactions</div>
                    </div>

                    <div className='flex items-center gap-1 cursor-pointer post-likes'>
                        <div><FaRegComment className='text-sm' /></div>
                        <div className='text-xs font-light'>{content.commentCount} Comments</div>
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