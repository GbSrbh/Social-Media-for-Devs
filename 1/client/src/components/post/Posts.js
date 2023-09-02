import { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { getPosts } from '../../actions/post';
import PropTypes from 'prop-types';

import PostItem from './PostItem';
import Spinner from '../../utils/spinner';

const Post = ({ getPosts, post }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return (
    <div>
      {post.loading ? (<Spinner />) : (
        <Fragment>
          <h1 class="large text-primary">
            Posts
          </h1>
          <p class="lead"><i class="fas fa-user"></i> Welcome to the community!</p>

          {!post.loading && post.posts.length > 0 &&
            post.posts.map((postItem) => (
              <PostItem postItem={postItem} />
            ))
          }
        </Fragment>)}
    </div>
  )
}

const mapStateToProps = state => ({
  post: state.post
})

Post.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
}
export default connect(mapStateToProps, { getPosts })(Post);
