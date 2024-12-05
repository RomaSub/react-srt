import axios from "axios";
import { makeAutoObservable } from "mobx";

type Comment = {
  id: number;
  name: string;
  email: string;
  body: string;
};

export type Names = keyof Comment;

type TypeSort = {
  asc: boolean;
  name: null | Names;
};

const URL = "https://jsonplaceholder.typicode.com/comments";

class CommentsStore {
  constructor() {
    makeAutoObservable(this);
  }

  comments: Comment[] = [];
  isLoading = false;
  error: string | null = null;
  typeSort: TypeSort = { asc: false, name: null };

  fetchComments = async () => {
    this.isLoading = true;
    this.error = null;
    try {
      const { data } = await axios.get<Comment[]>(URL);
      this.comments = data;
    } catch (err) {
      this.error = `Ошибка при получении данных: ${err}`;
    } finally {
      this.isLoading = false;
    }
  };

  sortComments = (name: Names) => {
    const commentsCopy = this.comments.slice();
    const asc =
      name === this.typeSort.name || this.typeSort.name === null
        ? !this.typeSort.asc
        : true;

    commentsCopy.sort((a, b) => {
      if (asc) {
        return a[name] > b[name] ? 1 : -1;
      }
      return a[name] < b[name] ? 1 : -1;
    });
    this.comments = commentsCopy;
    this.typeSort = { asc, name };
  };
}

export const commentsStore = new CommentsStore();
