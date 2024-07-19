// import { renderHook, act } from "@testing-library/react-hooks";
import { useTodos } from "./useTodo";
import todoService from "../utility/services/todo.service";
import { Todo } from "../utility/model/todo.model";
import { renderHook } from "@testing-library/react";
import { act } from "react";

// Mock the localStorage
const localStorageMock = (() => {
  let store: { [key: string]: string } = {};

  return {
    getItem(key: string) {
      return store[key] || null;
    },
    setItem(key: string, value: string) {
      store[key] = value;
    },
    clear() {
      store = {};
    },
    removeItem(key: string) {
      delete store[key];
    },
  };
})();

Object.defineProperty(window, "localStorage", { value: localStorageMock });

describe("useTodos", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should initialize with todos from localStorage if available", () => {
    const savedTodos: Todo[] = [
      { id: 1, title: "Test Todo 1", completed: false },
    ];
    localStorage.setItem("todos", JSON.stringify(savedTodos));

    const { result } = renderHook(() => useTodos());

    expect(result.current.Todos).toEqual(savedTodos);
  });

  it("should initialize with todos from todoService if localStorage is empty", () => {
    const { result } = renderHook(() => useTodos());

    expect(result.current.Todos).toEqual(todoService.getTodos());
  });

  it("should add a new todo", () => {
    const { result } = renderHook(() => useTodos());

    act(() => {
      result.current.addTodo("New Todo");
    });

    expect(result.current.Todos[0]).toMatchObject({
      title: "New Todo",
      completed: false,
    });
  });

  it("should set a todo as completed", () => {
    const { result } = renderHook(() => useTodos());

    act(() => {
      result.current.addTodo("New Todo");
      // result.current.setTodoCompleted(result.current.Todos[0].id, true);
    });
    act(() => {
      // result.current.addTodo("New Todo");
      result.current.setTodoCompleted(result.current.Todos[0].id, true);
    });
    console.log(result.current.Todos);

    expect(result.current.Todos[0].completed).toBe(true);
  });

  it("should delete a todo", () => {
    const { result } = renderHook(() => useTodos());
    // console.log("##1", result.current.Todos);

    act(() => {
      result.current.addTodo("New Todo");
      // console.log("##2", result.current.Todos);
      // result.current.deleteTodo(result.current.Todos[0].id);
    });

    act(() => {
      // result.current.addTodo("New Todo");
      // console.log("##21", result.current.Todos);
      result.current.deleteTodo(result.current.Todos[0].id);
    });
    // console.log("##3", result.current.Todos);
    expect(result.current.Todos.length).toBe(3);
  });

  it("should delete all completed todos", () => {
    const { result } = renderHook(() => useTodos());

    act(() => {
      result.current.addTodo("Todo 1");
      // result.current.addTodo("Todo 2");
    });
    act(() => {
      // result.current.addTodo("Todo 1");
      result.current.addTodo("Todo 2");
    });
    console.log(result.current.Todos);

    act(() => {
      result.current.setTodoCompleted(result.current.Todos[0].id, true);
      // result.current.deleteAllCompleted();
    });
    act(() => {
      // result.current.setTodoCompleted(result.current.Todos[0].id, true);
      result.current.deleteAllCompleted();
    });

    expect(result.current.Todos.length).toBe(4);
    expect(result.current.Todos[0].title).toBe("Todo 1");
  });
});
