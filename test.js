import React, { useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  const addTodo = () => {
    if (!input.trim()) return;
    setTodos([...todos, input]);
    setInput("");
  };

  const deleteTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  return (
    <div className="App" style={styles.container}>
      <h1 style={styles.title}>📝 To-Do List</h1>

      <div style={styles.inputContainer}>
        <input
          type="text"
          placeholder="할 일을 입력하세요"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={styles.input}
        />
        <button onClick={addTodo} style={styles.addButton}>
          추가
        </button>
      </div>

      <ul style={styles.todoList}>
        {todos.map((todo, index) => (
          <li key={index} style={styles.todoItem}>
            {todo}
            <button onClick={() => deleteTodo(index)} style={styles.deleteButton}>
              삭제
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  container: { textAlign: "center", marginTop: "60px", fontFamily: "sans-serif" },
  title: { fontSize: "2rem", marginBottom: "20px" },
  inputContainer: { display: "flex", justifyContent: "center", gap: "10px" },
  input: { padding: "10px", fontSize: "16px", width: "200px" },
  addButton: { padding: "10px 15px", fontSize: "16px", cursor: "pointer" },
  todoList: { listStyle: "none", padding: 0, marginTop: "30px" },
  todoItem: {
    background: "#f5f5f5",
    margin: "10px auto",
    padding: "10px 15px",
    borderRadius: "10px",
    width: "300px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  deleteButton: {
    background: "#ff6b6b",
    color: "white",
    border: "none",
    padding: "5px 10px",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default App;
