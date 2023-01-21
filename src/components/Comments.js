import React, {useState, useEffect} from 'react'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import axios from 'axios';
import Comment from './Comment';

const Comments = ({post}) => {
  const mdParser = new MarkdownIt(/* Markdown-it options */);
  const [postContentText, setPostContentText] = useState('');
  const [editiable, setEditiable] = useState(true);
  const [showButtons, setShowButtons] = useState(false);
  const [comments, setComments] = useState([]);
  
  
  let hideHtml = { html: false, md: true, menu: true };
  let preview = { html: true, md: false, menu: false};

  useEffect(() => {
    getPostComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[post.postId])

  function getPostComments(){
    axios({
      method: 'post',
      url: `${process.env.REACT_APP_URL}/comment/getcommentbypostid`,
      headers: {
        'content-type': 'application/json'
      },
      data: {
        post: {
          id: Number(post.postId)
        }
      }
    })
      .then(result => {
        if (result.data) {
          setComments(result.data);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }


  function handleEditorChange({ html, text }) {
    console.log('handleEditorChange', html, text);
    if(text.trim().length > 0){
      setShowButtons(true);
    }
    else{
      setShowButtons(false);
    }

    setPostContentText(text);
  }

  function togglePreview(){
    setEditiable(!editiable);
  }

  function submitComment(){
    const comment = {
      content: postContentText,
      postId: post.postId,
      authorId: JSON.parse(sessionStorage.getItem('user')).id,
    }
    axios({
      method: 'post',
      url: `${process.env.REACT_APP_URL}/comment/addNewComment`,
      headers: {
        'content-type': 'application/json'
      },
      data: { comment }
    })
      .then(result => {
       
        console.log(result.data);
        if (result.data.msg) {
          alert("Comment added successfully");
          setPostContentText('');
          setEditiable(true);
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
  return (
    <div className='py-5'>
        <div className='text-2xl'>Comments</div>
        <div>
        {editiable && <MdEditor style={{height:"175px"}}
          renderHTML={text => mdParser.render(text)}
          value={postContentText}
          onChange={handleEditorChange} view={hideHtml} placeholder="Add a comment..."/>}

        {!editiable  && <MdEditor style={{ height: "175px" }}
          renderHTML={text => mdParser.render(text)}
          value={postContentText} readOnly={true}
          onChange={handleEditorChange} view={preview}/>}
            
        </div>
      {showButtons && <div className='cp-btn-container'>
        <div>
          <button className='cp-publish-btn' disabled={postContentText.trim().length === 0}
            style={postContentText.trim().length === 0 ? { cursor: "not-allowed" } : { cursor: "pointer" }}
            onClick={submitComment}>Submit</button>
        </div>
        <div>
          <button className='cp-draft-btn' onClick={togglePreview} disabled={postContentText.trim().length === 0}
            style={postContentText.trim().length === 0 ? {cursor:"not-allowed"} : {cursor:"pointer"}}>
            {editiable ? 'Preview' : 'Continue editing'}
          </button>
        </div>
      </div>}
      <div className='mt-5'>
        {comments.length>0 && comments.map((comment) => (
          <Comment comment={comment} key={comment.id} getPostComments={getPostComments}/>
        ))}
      </div>
    </div>
  )
}

export default Comments