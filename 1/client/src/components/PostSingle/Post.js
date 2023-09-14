import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../../utils/spinner';
import PostItem from '../post/PostItem';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';
import { getPost } from '../../actions/post';

const Post = ({ getPost, post }) => {
  const { id } = useParams();
  useEffect(() => {
    getPost(id);
  }, [getPost, id]);

  return post.loading || post.post === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to="/posts" className="btn">
        Back To Posts
      </Link>
      <PostItem postItem={post.post} showActions={false} />
      <CommentForm />

      {/* <CommentForm postId={post._id} /> */}

      <div className="comments">
        {post.post.comments.length >0 && post.post.comments.map((comment) => (
          <CommentItem key={comment._id} comment={comment} postId={post.post._id} />
        ))}
      </div>
    </Fragment>
  );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  post: state.post
});

export default connect(mapStateToProps, { getPost })(Post);