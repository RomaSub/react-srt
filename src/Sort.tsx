import { observer } from "mobx-react-lite";
import { Button } from "react-bootstrap";
import { commentsStore, type Names } from "./stores/comments";

export const Sort = observer(({ name }: { name: Names }) => {
  return (
    <Button variant="dark" onClick={() => commentsStore.sortComments(name)}>
      {name[0].toUpperCase() + name.slice(1)}
    </Button>
  );
});
