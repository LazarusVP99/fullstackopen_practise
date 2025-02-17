import styled from 'styled-components';

export const CommentSection = styled.div`
  margin: 2rem 0;
  padding: 1rem;
  width: 40%;
  border-top: 1px solid #eee;
`;

export const CommentForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
`;

export const CommentInput = styled.textarea`
  width: 98%;
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
  min-height: 100px;
  font-family: inherit;
  resize: vertical;
`;

export const CommentList = styled.div`
  display: flex;
  border-radius: 4px;
  border: 1px solid #ddd;
  margin: 1rem 0;
  flex-direction: column;
  gap: 1rem;
`;

export const CommentItem = styled.div`
  padding: 1rem;
  background-color: #f9f9f9;
  border-radius: 4px;
  border: 1px solid #eee;
`;

export const CommentContent = styled.p`
  margin: 0;
  color: #666;
`;
