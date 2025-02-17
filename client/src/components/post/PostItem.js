import { connect } from 'react-redux';
import Moment from 'react-moment';
import { addLike, removeLike, deletePost } from '../../actions/post';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Fragment } from 'react';

const PostItem = ({ postItem, showActions = true, auth, addLike, removeLike, deletePost }) => {

  return (
    <div className="posts">
      <div className="post bg-white p-1 my-1">
        <div>
          <Link to={`/profile/${postItem.user}`}>
            <img
              className="round-img"
              src={postItem.avatar}
              alt=""
            />
            <h4>{postItem.name}</h4>
          </Link>
        </div>
        <div>
          <p className="my-1">
            {postItem.text}
          </p>
          <p className="post-date">
            Posted on <Moment format="YYYY/MM/DD">{postItem.date}</Moment>
          </p>
          {showActions && (
            <Fragment>
              <button onClick={e => addLike(postItem._id)} type="button" className="btn btn-light">
                <i className="fas fa-thumbs-up"></i>{' '}
                {postItem.likes.length > 0 && (<span>{postItem.likes.length}</span>)}
              </button>
              <button onClick={e => removeLike(postItem._id)} type="button" className="btn btn-light">
                <i className="fas fa-thumbs-down"></i>
              </button>
              <Link to={`/posts/${postItem._id}`} className="btn btn-primary">
                Discussion {postItem.comments.length > 0 && (<span className='comme nt-count'>{postItem.comments.length}</span>)}
              </Link>
              {!auth.loading && auth.user._id === postItem.user && (
                <button onClick={e => deletePost(postItem._id)} type="button" className="btn btn-danger"><i className="fas fa-times"></i></button>
              )}
            </Fragment>
          )}
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  auth: state.auth
})

PostItem.propTypes = {
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
}
export default connect(mapStateToProps, { addLike, removeLike, deletePost })(PostItem);