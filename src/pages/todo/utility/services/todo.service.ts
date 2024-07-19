import { Todo } from "../model/todo.model";

const todosData: Todo[] = [
  {
    id: 1,
    title: "Study React",
    completed: false,
  },
  {
    id: 2,
    title: "Walk the dog",
    completed: false,
  },
  {
    id: 3,
    title: "Water the plants",
    completed: false,
  },
];

const todoService = {
  getTodos: () => todosData,
};

export default todoService;
