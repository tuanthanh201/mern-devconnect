import { useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import PropTypes from "prop-types";

import { getPost, addComment } from "../../actions/post";
import Spinner from "../layout/Spinner";
import CommentItem from "./CommentItem";

const Post = ({ getPost, post: { post, loading } }) => {
  const params = useParams();
  const { postId } = params;
  const textRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    getPost(postId);
  }, [getPost, postId]);

  let commentsList;
  if (post) {
    commentsList = post.comments.map((comment) => (
      <CommentItem comment={comment} key={comment._id} />
    ));
  }

  const submitHandler = (event) => {
    event.preventDefault();

    const formData = {
      text: textRef.current.value,
    };
    dispatch(addComment(postId, formData));
    textRef.current.value = "";
  };

  return (
    <>
      {loading && <Spinner />}
      {!loading && post !== null && (
        <>
          <Link to="/posts" className="btn">
            Back To Posts
          </Link>
          <div className="post bg-white p-1 my-1">
            <div>
              <a href="profile.html">
                <img className="round-img" src={post.avatar} alt="" />
                <h4>{post.name}</h4>
              </a>
            </div>
            <div>
              <p className="my-1">{post.text}</p>
            </div>
          </div>

          <div className="post-form">
            <div className="bg-primary p">
              <h3>Leave A Comment</h3>
            </div>
            <form className="form my-1" onSubmit={submitHandler}>
              <textarea
                ref={textRef}
                name="text"
                cols="30"
                rows="5"
                placeholder="Comment on this post"
                spellCheck="false"
                required
              ></textarea>
              <input
                type="submit"
                className="btn btn-dark my-1"
                value="Submit"
              />
            </form>
          </div>

          <div className="comments">{commentsList}</div>
        </>
      )}
    </>
  );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
  auth: state.auth,
});

export default connect(mapStateToProps, { getPost })(Post);
