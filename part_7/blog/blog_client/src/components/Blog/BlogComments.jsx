import { useContext, useState } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { NotificationContext } from '../../context/notification.context';
import blogService from '../../services/blog.service';
import {
  CommentForm,
  CommentInput,
  CommentItem,
  CommentList,
  CommentSection,
} from '../../style/styled.comment';

const BlogComments = ({ blog, id }) => {
  const queryClient = useQueryClient();
  const [comment, setComment] = useState('');
  const { showNotification } = useContext(NotificationContext);

  const { mutate: addComent } = useMutation({
    mutationFn: commentData => {
      const { comment, id } = commentData;

      return blogService.postComment(comment, id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['blogs']);
      showNotification('info', 'Comment added');
      setComment('');
    },
    onError: error => {
      showNotification('error', error.response.data.error);
    },
  });

  return (
    <CommentSection>
      <h4>Comments</h4>
      {blog.comments && blog.comments.length > 0 ? (
        <CommentList>
          {blog.comments.map((comment, index) => (
            <CommentItem key={index}>{comment}</CommentItem>
          ))}
        </CommentList>
      ) : (
        <p>No comments yet</p>
      )}
      <CommentForm
        onSubmit={e => {
          e.preventDefault();
          addComent({ comment, id });
        }}>
        <CommentInput
          type="text"
          name="comment"
          placeholder="Write a comment..."
          onChange={({ target }) => setComment(target.value)}
        />
        <button className="comment-button" type="submit">
          Add comment
        </button>
      </CommentForm>
    </CommentSection>
  );
};

export default BlogComments;
