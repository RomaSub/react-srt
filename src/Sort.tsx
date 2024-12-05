import { Button } from "react-bootstrap";

type SortProps = {
  name: "id" | "name" | "email" | "body";
  sortBy: (name: "id" | "name" | "email" | "body") => void;
};

export const Sort = ({ name, sortBy }: SortProps) => {
  console.log(sortBy)
  return (
    <>
      <Button variant="dark" onClick={() => sortBy(name)}>
        {name[0].toUpperCase() + name.slice(1)}
      </Button>
    </>
  );
};
