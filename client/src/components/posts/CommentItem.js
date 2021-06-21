import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Moment from "react-moment";

import { deleteComment } from "../../actions/post";

const CommentItem = ({ comment }) => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const params = useParams();
  const { postId } = params;

  const deleteHandler = () => {
    dispatch(deleteComment(postId, comment._id));
  };

  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <Link to={`/profile/${comment.user}`}>
          <img className="round-img" src={comment.avatar} alt="" />
          <h4>{comment.name}</h4>
        </Link>
      </div>
      <div>
        <p className="my-1">{comment.text}</p>
        <p className="post-date">
          Posted on <Moment format="DD/MM/YYYY">{comment.date}</Moment>
        </p>
        {auth.user._id === comment.user && (
          <button
            type="button"
            className="btn btn-danger"
            onClick={deleteHandler}
          >
            <i className="fas fa-times"></i>
          </button>
        )}
      </div>
    </div>
  );
};

export default CommentItem;
