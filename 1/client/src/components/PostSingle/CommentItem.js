import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { deleteComment } from '../../actions/post';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const CommentItem = ({ comment, postId, auth, deleteComment }) => {

  return (
    <div className="comments">
      <div className="post bg-white p-1 my-1">
        <div>
          <Link to={`/profile/${comment.user}`}>
            <img
              className="round-img"
              src={comment.avatar}
              alt=""
            />
            <h4>{comment.name}</h4>
          </Link>
        </div>
        <div>
          <p className="my-1">
            {comment.text}
          </p>
          <p className="post-date">
            Posted on {<Moment format="YYYY/MM/DD">{comment.date}</Moment>}
          </p>
          {!auth.loading && auth.user._id === comment.user && (
            <button onClick={e => deleteComment(postId, comment._id)} type="button" className="btn btn-danger">
              <i className="fas fa-times" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
const mapStateToProps = state => ({
  auth: state.auth
})
CommentItem.propTypes = {
  deleteComment: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
}
export default connect(mapStateToProps, { deleteComment })(CommentItem);