import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotificationDispatch } from "../hooks/notification.hook";
import service from "../service";

const VoteAnecdote = ({ anecdote }) => {
  const notificationDispatch = useNotificationDispatch();
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: (anecdote) => service.updateVote(anecdote.id, anecdote),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
      notificationDispatch({
        type: "SUCCESS_NOTIFICATION",
        payload: `anecdote '${anecdote.content}' voted!`,
      });
    },
    onError: (error) =>
      notificationDispatch({
        type: "ERROR_NOTIFICATION",
        payload: error.response.data.error,
      }),
  });

  return (
    <>
      <div className="anecdote_content">{anecdote.content}</div>
      <div className="anecdote_vote">
        has {anecdote.votes}
        <button onClick={() => mutateAsync(anecdote)}>vote</button>
      </div>
    </>
  );
};

export default VoteAnecdote;
