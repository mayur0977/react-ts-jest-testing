import { Todo } from "../model/todo.model";
import todoService from "./todo.service";

describe("todoService", () => {
  it("should return all todos", () => {
    const expectedTodos: Todo[] = [
      { id: 1, title: "Study React", completed: false },
      { id: 2, title: "Walk the dog", completed: false },
      { id: 3, title: "Water the plants", completed: false },
    ];

    const todos = todoService.getTodos();

    expect(todos).toEqual(expectedTodos);
  });
});
