import { Container } from "react-bootstrap";
import { Units } from "./Units";
import { observer } from "mobx-react-lite";

export const App = observer(() => {
  return (
    <Container>
      <h1 className="text-center mb-5">Comments</h1>
      <Units />
    </Container>
  );
});
