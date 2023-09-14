import { useState } from 'react';
import { addComment } from '../../actions/post';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const CommentForm = ({ addComment, post }) => {
  const [text, setText] = useState('');
  function submitForm(e) {
    e.preventDefault();
    addComment(post.post._id, text);
    // console.log(auth);
    setText('');
  }
  return (
    <div className='post-form'>
      <div className="bg-primary p">
        <h3>Say Something...</h3>
      </div>
      <form className='form my-1' onSubmit={e => submitForm(e)}>
        <textarea
          name='text'
          cols='30'
          rows='2'
          placeholder='Write a comment'
          value={text}
          onChange={e => setText(e.target.value)}
          required
        />
        <input type='submit' className='btn btn-dark my-1' value='Submit' />
      </form>
    </div>
  )
}
CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
  post: PropTypes.object,
}

const mapStateToProps = (state) => ({
  post: state.post
})
export default connect(mapStateToProps, { addComment })(CommentForm);