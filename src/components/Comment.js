import React, {useState} from 'react'
import { IoPerson } from "react-icons/io5";
import moment from 'moment';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { AiOutlineDelete } from 'react-icons/ai'
import { FiEdit } from 'react-icons/fi'
import axios from 'axios';


const Comment = ({ comment, getPostComments }) => {
  const readOnlyMode = { html: true, md: false, menu: false };
  const editMode = { html: false, md: true, menu: true };
  let user = JSON.parse(sessionStorage.getItem('user'));
  const [editedComment, setEditedComment] = useState(comment?.content);
  const [showButtons, setShowButtons] = useState(false);
  const [editable, setEditable] = useState(true);
  const [editBtnClicked, setEditBtnClicked] = useState(false);
  const mdParser = new MarkdownIt(/* Markdown-it options */);

  function deleteComment() {
    let response = prompt("Are you sure you want to delete this comment? (y/n)");
    if (response.toLocaleLowerCase() === "y") {
      deleteCommentAPI();
    }

  }

  function handleEditorChange({ html, text }) {
    if (text.trim().length > 0) {
      setShowButtons(true);
    }
    else {
      setShowButtons(false);
    }

    setEditedComment(text);
  }

  function deleteCommentAPI() {
    axios({
      method: 'post',
      url: `${process.env.REACT_APP_URL}/comment/deletecommentbyid`,
      headers: {
        'content-type': 'application/json'
      },
      data: {
        comment: {
          id: comment.id,
          authorId: comment.authorId
        }
      }
    })
      .then(result => {
        if (result.data.msg) {
          alert("Comment deleted successfully");
          getPostComments();
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

  function togglePreview() {
    setEditable(!editable);
  }

  function submitEditedComment() {
    let editComment = {
      content: editedComment,
      id: comment.id,
    }
    axios({
      method: 'post',
      url: `${process.env.REACT_APP_URL}/comment/editComment`,
      headers: {
        'content-type': 'application/json'
      },
      data: { editComment }
    })
      .then(result => {

        console.log(result.data);
        if (result.data.msg) {
          alert("Comment edited successfully");
          setEditable(true);
          setEditBtnClicked(false);
          setShowButtons(false);
          getPostComments();
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
        console.log(error);
        alert("Something went wrong. Please try again later");
        return;
      });

  }

  function editComment() {
    setEditBtnClicked(true);
    setShowButtons(true);
  }
  return (
    <div className='mt-2'>
      <div className='rounded bg-white  px-5  border' >
        <div className='post-author-cont mt-4'>
          <div className='post-author-img'>
            <IoPerson style={{ fontSize: "1rem", cursor: "pointer" }} />
          </div>
          <div className='post-author-name cursor-pointer'>
            <div style={{ fontSize: "12px", textTransform: "capitalize" }}>{comment?.firstname || "First"} {comment?.lastname || "Last"}</div>
            <div style={{ fontSize: "10px" }}>{moment.utc(comment?.updated_at).format('MM/DD/YYYY HH:MM')}</div>
          </div>


        </div>
        <div>

          {comment?.content ? <MdEditor
            value={comment?.content}
            renderHTML={text => mdParser.render(text)}
            view={readOnlyMode} style={{ border: "0px" }}
          /> : <div></div>}

          {editBtnClicked  && editable ? <MdEditor
            value={editedComment}
            onChange={handleEditorChange}
            renderHTML={text => mdParser.render(text)}
            view={editMode} style={{ border: "0px" }}
          />:<></>}

          {editBtnClicked && !editable ?<> <div>Preview Mode</div> <MdEditor
            value={editedComment}
            renderHTML={text => mdParser.render(text)}
            view={readOnlyMode} style={{ border: "0px" }}
          /> </>: <div></div>}

          {showButtons && <div className='cp-btn-container'>
            <div>
              <button className='cp-publish-btn' disabled={editedComment.trim().length === 0}
                style={editedComment.trim().length === 0 ? { cursor: "not-allowed" } : { cursor: "pointer" }}
                onClick={submitEditedComment}>Submit</button>
            </div>
            <div>
              <button className='cp-draft-btn' onClick={togglePreview} disabled={editedComment.trim().length === 0}
                style={editedComment.trim().length === 0 ? { cursor: "not-allowed" } : { cursor: "pointer" }}>
                {editable ? 'Preview' : 'Continue editing'}
              </button>
            </div>

            <div>
              <button className='cp-draft-btn' onClick={()=>{setEditBtnClicked(false); setShowButtons(false); setEditedComment(comment.content); setEditable(true)}}>
               Cancel
              </button>
            </div>
          </div>}


        </div>

        {user?.id === comment.authorId && 
          <div style={{display:"flex", gap:"1rem", alignItems:"center", justifyContent:"flex-end"}}> 
              <div style={{ paddingBottom: "1rem" }} onClick={deleteComment}>
              <AiOutlineDelete style={{ fontSize: "1rem", cursor: "pointer", color: "red" }} />
            </div>
            <div style={{ paddingBottom: "1rem" }} onClick={editComment}>
              <FiEdit style={{ fontSize: "1rem", cursor: "pointer", color: "blue" }} />
            </div>
          </div>
        }
      </div>
    </div>

  )
}

export default Comment