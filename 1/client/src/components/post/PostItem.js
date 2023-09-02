import { connect } from 'react-redux';
import Moment from 'react-moment';

const PostItem = ({ postItem, post, auth }) => {

  return (
    <div className="posts">
      <div className="post bg-white p-1 my-1">
        <div>
          <a href="profile.html">
            <img
              className="round-img"
              src={postItem.avatar}
              alt=""
            />
            <h4>{postItem.name}</h4>
          </a>
        </div>
        <div>
          <p className="my-1">
            {postItem.text}
          </p>
          <p className="post-date">
            Posted on <Moment format="YYYY/MM/DD">{postItem.date}</Moment>
          </p>
          <button type="button" className="btn btn-light">
            <i className="fas fa-thumbs-up"></i>{' '}
            {postItem.likes.length > 0 && (<span>{postItem.likes.length}</span>)}
          </button>
          <button type="button" className="btn btn-light">
            <i className="fas fa-thumbs-down"></i>
          </button>
          <a href="post.html" className="btn btn-primary">
            Discussion {postItem.comments.length > 0 && (<span className='comme nt-count'>{postItem.comments.length}</span>)}
          </a>

          {!auth.loading && auth.user._id === postItem.user && (
            <button type="button" className="btn btn-danger"><i className="fas fa-times"></i></button>
          )}
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  post: state.post,
  auth: state.auth
})
export default connect(mapStateToProps)(PostItem);