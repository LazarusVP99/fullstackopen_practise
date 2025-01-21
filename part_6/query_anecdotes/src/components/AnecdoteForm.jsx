import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotificationDispatch } from "../hooks/notification.hook";
import service from "../service";

const AnecdoteForm = () => {
  const notificationDispatch = useNotificationDispatch();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: service.createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"]);
      queryClient.setQueryData(["anecdotes"], [...anecdotes, newAnecdote]);
      notificationDispatch({
        type: "SUCCESS_NOTIFICATION",
        payload: {
          message: `anecdote '${newAnecdote.content}' created!`,
        },
      });
    },
    onError: (error) =>
      notificationDispatch({
        type: "ERROR_NOTIFICATION",
        payload: error.response.data.error,
      }),
  });

  const onCreate = (event) => {
    event.preventDefault();

    const { value } = event.target.anecdote;

    mutate({ content: value, votes: 0 });

    event.target.anecdote.value = "";
  };

  return (
    <div className="anecdote_form">
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
