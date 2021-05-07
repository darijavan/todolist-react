import { useState } from "react";
import "./App.css";
import { useLocalStorage } from "./hooks";

function Todo({ todo, toggleTodo, deleteTodo }) {
  return (
    <li
      className={"Todo" + (todo.finished ? " Finished" : "")}
      onClick={toggleTodo}
    >
      <span>{todo.todo}</span>
      <button
        className="Delete"
        onClick={(e) => {
          e.stopPropagation();
          deleteTodo();
        }}
      >
        Supprimer
      </button>
    </li>
  );
}

function App() {
  const [todos, setTodos] = useLocalStorage("todos", []);
  const [todo, setTodo] = useState("");

  const addTodo = (e) => {
    e.preventDefault();
    if (todo.length) {
      setTodos((todos) => [...todos, { todo, finished: false }]);
      setTodo("");
    }
  };

  const toggleTodo = (index) => {
    todos[index].finished = !todos[index].finished;
    setTodos((todos) => [...todos]);
  };

  const deleteTodo = (index) => {
    setTodos((todos) => [...todos.slice(0, index), ...todos.slice(index + 1)]);
  };

  return (
    <div className="App">
      <main className="Container">
        <h1 className="Title">Todolist App</h1>
        <div className="ListContainer">
          {todos.length ? (
            <ul>
              {todos.map((todo, i) => (
                <Todo
                  todo={todo}
                  toggleTodo={() => toggleTodo(i)}
                  deleteTodo={() => deleteTodo(i)}
                />
              ))}
            </ul>
          ) : (
            <p className="EmptyList">Aucune tâche pour l'instant</p>
          )}
        </div>
        <form className="Input-Section" onSubmit={addTodo}>
          <input
            type="text"
            id="Todo-Input"
            value={todo}
            onChange={({ target: { value } }) => setTodo(value)}
          />
          <button type="submit" className="Button-Primary">
            Ajouter un todolist
          </button>
        </form>
      </main>
    </div>
  );
}

export default App;
