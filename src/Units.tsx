import axios from "axios";
import { useEffect, useState } from "react";
import { Alert, Table } from "react-bootstrap";
import { Sceleton } from "./Sceleton";
import { Sort } from "./Sort";

const URL = "https://jsonplaceholder.typicode.com/comments";

type Comment = {
  id: number;
  name: string;
  email: string;
  body: string;
};

type Names = keyof Comment;

type TypeSort = {
  asc: boolean;
  property: Names | null;
};

export const Units = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [typeSort, setTypeSort] = useState<TypeSort>({
    asc: true,
    property: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const { data } = await axios.get<Comment[]>(URL);
        setComments(data);
      } catch (err) {
        setError(`Ошибка при получении данных: ${err}`);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const sortBy = (name: Names) => {
    const asc =
      name === typeSort.property || typeSort.property === null
        ? !typeSort.asc
        : true;
    const commentsCopy = comments.slice();
    commentsCopy.sort((a, b) => {
      if (asc) {
        return a[name] > b[name] ? 1 : -1;
      }
      return a[name] < b[name] ? 1 : -1;
    });
    setComments(commentsCopy);
    setTypeSort({
      asc,
      property: name,
    });
  };

  if (isLoading) {
    return <Sceleton />;
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <>
      <Table bordered hover>
        <thead className="text-center">
          <tr>
            {["id", "name", "email", "body"].map((name) => (
              <th key={name}>
                <Sort name={name as Names} sortBy={sortBy} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {comments.map((comment) => (
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
};
