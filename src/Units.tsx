import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Alert, Table } from "react-bootstrap";
import { Sceleton } from "./Sceleton";
import { commentsStore, Names } from "./stores/comments";
import { Sort } from "./Sort";

export const Units = observer(() => {
  useEffect(() => {
    commentsStore.fetchComments();
  }, []);

  if (commentsStore.isLoading) {
    return <Sceleton />;
  }

  if (commentsStore.error) {
    return <Alert variant="danger">{commentsStore.error}</Alert>;
  }

  return (
    <>
      <Table bordered hover>
        <thead className="text-center">
          <tr>
            {["id", "name", "email", "body"].map((name) => (
              <th key={name}>
                <Sort name={name as Names} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {commentsStore.comments.map((comment) => (
            <tr key={comment.id}>
              <td>{comment.id}</td>
              <td>{comment.name}</td>
              <td>{comment.email}</td>
              <td>{comment.body}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
});
